---
layout:     post
title:      "球谐光照"
date:       2019-07-04 03:00:00
author:     "Huailiang"
tags:
    - Unity
    - 引擎
---



> 游戏中的光照可以被简单分为两个部分，直接光和间接光。直接光中我们研究各种不同的BRDF材质，甚至BSDF，BSSSRDF等等。这些模型据有很不错的表现力，足够我们区分金属，皮肤，木头等等不同物体的着色表现。但这并不能满足我们，因为光并不是那么简单，光会被反射，会被折射，会被透射，会被吸收，所以物体的受光情况同时又由这个场景的其他物体决定，这部分光照同时拥有着更加富强的表现力，被我们称作间接光。用来做这部分光照的算法也有很多，如raytracing，photonmap。这些算法很复杂也很有趣，不过这些并非我们讨论的重点。


球谐光照是实时渲染技术中的一种，属于Precompute Radiance Transfer(PRT)的范畴。经过预处理并存储相应的信息之后，它可以产生高质量的渲染及阴影效果。球谐光照需要使用新的光照方程来代替通常的光照方程，并将该方程中的相关信息使用球谐基函数来投影到频度空间，并用系数进行表示（该变换与信号处理中的Fourier变换同样的道理）以一定的方式存储。在渲染的过程中就结合球谐变换的特性以及这些预先存储的系数信息来对原始的光照方程进行还原并对场景进行着色。

## 球谐函数


球谐光照实际上是一种对光照的简化，对于空间上的一点，受到的光照在各个方向上是不同的，也即各向异性，所以空间上一点如果要完全还原光照情况，那就需要记录周围球面上所有方向的光照。注意这里考虑的周围环境往往是复杂的情况，而不是几个简单的光源，如果是那样的话，直接用光源的光照模型求和就可以了。

如果环境光照可以用简单函数表示，那自然直接求点周围球面上的积分就可以了。但是通常光照不会那么简单，并且用函数表示光照也不方便，所以经常用的方法是使用环境光贴图,比如cubemap. 关于cubemap处理间接光，可以参照作者博客前面几篇使用ibl渲染环境光。


考虑一个简单场景中有个点，他周围的各个方向上的环境光照就是上面的cubemap呈现的，假如我想知道这个点各个方向的光照情况，那么就必须在cubemap对应的各个方向进行采样。对于一个大的场景来说，每个位置点的环境光都有可能不同，如果把每个点的环境光贴图储存起来，并且每次获取光照都从相应的贴图里面采样，可想而知这样的方法是非常昂贵的。

利用球谐函数就可以很好的解决这个问题，球谐函数的主要作用就是用简单的系数表示复杂的球面函数。球谐光照实际上就是将周围的环境光采样成几个系数，然后渲染的时候用这几个系数来对光照进行还原，这种过程可以看做是对周围环境光的简化，从而简化计算过程。



球谐函数的表达式定义如下：


$$
\int f(x) \,{\rm dx} = \sum_{l=0}^n \sum_{m={-l}}^l c_l^m y_l^m, \quad c_l^m = \int_S f(s)y_l^m(s) \,{\rm ds} 
$$

而 $$y_l^m$$ 是一个阶数(l,m)和角度（法线n）相关的定量，称作球谐基，$$c_l^m$$ 是对应球谐基方向上的系数。  其中 $$y_l^m$$ 定义如下：

$$
Y_l^m=
\begin{cases}
{\sqrt{2}}  K_l^mcos(m\phi)P_l^m(cos\theta)& \text{(m>0)}\\
{\sqrt{2}}  K_l^{m}sin(-m\phi)P_l^{-m}(cos\theta)& \text{(m<0)}\\
K_l^0P_l^0(cos\theta)& \text{(m=0)}
\end{cases}
$$

K为SH球谐函数的缩放因子，其公式表述如下：

$$
K_l^m = \sqrt{ \frac{2l+1}{4\pi} \frac{ (l-|m|)! }{ (l+|m|)! } }
$$


其中的P为伴随勒让德多项式定义如下:

$$
P_l^m(x) = (-1)^m(1-x^2)^{m/2}\frac{ d^m }{ dx^m }P_l(x)
$$

而勒让德多项式定义:

$$
P_l(x) =  \frac{(1)^m}{2^ll!} \frac{d^l}{dx^l} (x^2 - 1)^l
$$

伴随勒让德多项式Pl为上面的勒让德多项式，替换之，得到：

$$
P_l^m(x) =  \frac{(-1)^m}{2^ll!} (1-x^2)^{m/2}\frac{ d^{l+m} }{ dx^{l+m} }(x^2 - 1)^l
$$

由了上述参数化的表示之后即可以求得蒙特卡洛采样后的球面空间上的球谐函数，其可视化之后的形状一般如下图所示:

![](/img/post-engine/tex19.jpg)


绿色表示球谐函数的值为正值，而红色表示球谐函数的值为负值；矢径越大球谐函数值的绝对值越大，反之矢径越小球谐函数值的绝对值越小。


实际上render过程中， 我们只近似取前几阶来构建球谐函数。前3阶的球谐基函数如下：

#### l=0:

$$  
Y_0^0 = \frac{1}{2}\sqrt{\frac{1}{\pi}}  \tag{m = 0}
$$


#### l=1:

$$  
Y_1^{-1} = \sqrt{\frac{3}{4\pi}}\frac{y}{r}\ \tag{m =-1}
$$

$$  
Y_1^0 = \sqrt{\frac{3}{4\pi}}\frac{z}{r}\ \tag{m = 0}
$$

$$  
Y_1^1 = \sqrt{\frac{3}{4\pi}}\frac{x}{r}\ \tag{m = 1}
$$


#### l=2:

$$  
Y_2^{-2} = \frac{1}{2}\sqrt{\frac{15}{\pi}}\frac{xz}{r^2}\ \tag{m =-2}
$$

$$  
Y_2^{-1} = \frac{1}{2}\sqrt{\frac{15}{\pi}}\frac{yz}{r^2}\ \tag{m =-1}
$$

$$  
Y_2^{-1} = \frac{1}{4}\sqrt{\frac{15}{\pi}}\frac{-x^2-z^2+2y^2}{r^2}\ \tag{m = 0}
$$

$$  
Y_2^1 = \frac{1}{2}\sqrt{\frac{15}{\pi}}\frac{xy}{r^2}\ \tag{m = 1}
$$

$$  
Y_2^2 = \frac{1}{4}\sqrt{\frac{15}{\pi}}\frac{x^2-z^2}{r^2}\ \tag{m = 2}
$$



由于球谐基函数阶数是无限的，所以只能取前面几组基来近似，一般在光照中大都取3阶，也即9个球谐系数。对于每个球谐波，我们将其值绘制在球体表面上，然后绘制在极性中。通过改变前一个球体的半径简单地获得极坐标图。

<center>
    <img src="/img/post-engine/tex20.jpg" />
</center>><br><br>

这里面每个曲面都是用球坐标系表示的，球谐基都是定义在球坐标系上的函数，r（也就是离中心的距离）表示的就是这个球谐基在这个方向分量的重要程度。我是用类比傅里叶变换的方法来理解的，其实球谐函数本身就是拉普拉斯变换在球坐标系下的表示，这里的每个球谐基可以类比成傅里叶变换中频域的各个离散的频率，各个球谐基乘以对应的系数就可以还原出原来的球面函数。一个复杂的波形可以用简单的谐波和相应系数表示，同样的，一个复杂的球面上的函数也可以用简单的球谐基和相应的系数表示。

## 球面均匀采样

先给一下球面坐标的弧度表达式(r表示球的半径):

$$ 
\left\{
\begin{aligned}
x & = r\cos\theta\cos\phi \\
y & = r\sin\theta\cos\phi \\
z & = r\cos\phi
\end{aligned}
\right.
$$

<center>
    <img src="/img/post-engine/tex28.jpg"/>
</center>><br><br>


在球面上均匀采样的映射的表达式, 并不是均匀的变化球面参数$$\theta$$ 和 $$\phi$$， 或者说如果我们直接给 [公式] 赋两个标准随机变量的话：


$$ 
\left\{
\begin{aligned}
\theta & = \xi_x \\
\phi & = \xi_y
\end{aligned}
\right.
$$


产生的采样不会是均匀分布在球面上的，而是在两个极点处比较密集：

![](/img/post-engine/tex22.jpg)

但是如果在$$\theta-\phi$$坐标系是均匀分布的：

![](/img/post-engine/tex23.png)

基于此， 我们在自己的[引擎][i1]中我们采用了基于正太分布的采样（中间稠密， 两边稀疏），来近似实现均匀采样。但还不是严格的球面均匀采样的。

若要严格的均匀采样，可以参考这篇[论文][i3]。直接给出论文里的公式:


$$ 
\left\{
\begin{aligned}
\theta & = 2arccos(\sqrt{1-\xi_x}) \\
\phi & = 2\pi\xi_y
\end{aligned}
\right.
$$

![](/img/post-engine/tex29.jpeg)

 在引擎中， 我们使用了tools/sample.sh 生成SAMPLE_NUM=1000000个采样点，采样点使用正太分布的随机数，DEGREE=3 四阶(m = DEGREE+1)的球谐面来生成对应球谐基的因子。

使用球鞋函数还原的间接光照效果如下图所示:


<center>
    <img src="/img/post-engine/tex23.jpg" height="250"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/img/post-engine/tex25.jpg" height="250"/>
</center>


## 球谐投影与重建

根据蒙特卡罗尔积分:


假设一个原始的分布于球面空间上的函数为，其用球谐基函数表示后的形式为，可知, 而近似函数和球谐系数分别为：

$$
\int f(x) \,{\rm dx} = \sum_{l=0}^n \sum_{m={-l}}^l c_l^m y_l^m, \quad c_l^m = \int_S f(s)y_l^m(s) \,{\rm ds} \tag{1}
$$


再来解释一下l,m两项，这里l,m对应着不同的球谐基函数，通常l被称为带，而我们定义第i个球谐基函数为第l*(l+1)+m个。将l,m索引化为i=l(l+1)+m后可得：

$$ f(s) = \sum_{i=0}^{n^2} c_iy_i(s), \quad c_i = \int_S f(s)y_i(s) \,{\rm ds} \tag{2}$$

其中ci的过程又被称为投影， 再对ci中的积分式用上述蒙特卡洛方法离散化后即可得

$$  c_i = \int_S f(s)y_i(s) \,{\rm ds} ≈ \frac{1}{N} \sum_{j=1}^{N}f(s_j)\omega(s_j)y_i(s_j)  $$ 


$$  c_i = \frac{4\pi}{N}\sum_{j=1}^{N}f(s_j)y_i(s_j)  \tag{3}$$ 

有了上述[2]和[3]之后我们就可以对一个球面空间上的函数进行球谐投影并还原，这是下一步进行预处理与渲染计算的基础。下图给出了使用球谐变换对某球面函数进行投影与重建的情形。

![](/img/post-engine/tex21.jpg)

从图中可以看出随着变换波段的不断增大，对原始函数的投影与重建质量就越高，但相应的球谐因子也就不断增多。

此外，球谐变换还有一个非常重要的特性[特性1]，即两个函数的乘积在球面空间上的积分值与它们的球谐系数向量组的点积相同。

$$

\int_S f1(s)f2(s)ds = \vec{c1}  \cdot \vec{c2} = \sum_{i=0}^{N}\vec{c1_i} \cdot \vec{c2_i}

$$

我们在glsl中重建球谐函数如下：

``` glsl
void main(void)
{
    float basis[16];
    
    float x = normal.x;
    float y = normal.y;
    float z = normal.z;
    float x2 = x*x;
    float y2 = y*y;
    float z2 = z*z;
    
    basis[0]  = 1.f / 2.f * sqrt(1.f / PI);
    basis[1]  = sqrt(3.f / (4.f*PI))*z;
    basis[2]  = sqrt(3.f / (4.f*PI))*y;
    basis[3]  = sqrt(3.f / (4.f*PI))*x;
    basis[4]  = 1.f / 2.f * sqrt(15.f / PI) * x * z;
    basis[5]  = 1.f / 2.f * sqrt(15.f / PI) * z * y;
    basis[6]  = 1.f / 4.f * sqrt(5.f / PI) * (-x*x - z*z + 2 * y*y);
    basis[7]  = 1.f / 2.f * sqrt(15.f / PI) * y * x;
    basis[8]  = 1.f / 4.f * sqrt(15.f / PI) * (x*x - z*z);
    basis[9]  = 1.f / 4.f * sqrt(35.f / (2.f*PI))*(3 * x2 - z2)*z;
    basis[10] = 1.f / 2.f * sqrt(105.f / PI)*x*z*y;
    basis[11] = 1.f / 4.f * sqrt(21.f / (2.f*PI))*z*(4 * y2 - x2 - z2);
    basis[12] = 1.f / 4.f * sqrt(7.f / PI)*y*(2 * y2 - 3 * x2 - 3 * z2);
    basis[13] = 1.f / 4.f * sqrt(21.f / (2.f*PI))*x*(4 * y2 - x2 - z2);
    basis[14] = 1.f / 4.f * sqrt(105.f / PI)*(x2 - z2)*y;
    basis[15] = 1.f / 4.f * sqrt(35.f / (2 * PI))*(x2 - 3 * z2)*x;
    
    vec3 c = vec3(0,0,0);
    for (int i = 0; i < 16; i++)
    {
        c += coef[i] * basis[i];
    }
    
    FragColor = vec4(c, 1);
}
```

在[引擎][i1]里运行的效果如下图:

![](/img/post-engine/tex24.jpg)

## Unity中的球谐光照应用

unity中至少在光照探头和前向渲染的大量顶点光照这两个地方上使用了球谐光照的技术。

#### 光照探头：
unity的光照探头在烘焙的时候为每个探头点附近采样光照值，然后计算每个点的球谐函数基底系数，用于运行时对于动态物体计算当前点的烘焙时的全局光照。

![](/img/post-engine/tex.jpg)

#### 前向渲染中的实时的顶点光照：
前向渲染中光源数量太多，会降低运行效率。unity的正向渲染严格控制了光照的运算数量，具体的规则是，最亮的那盏直线光一定是像素光，其他标记了important的光源在数量不超过settimng里面pixel count的情况下是像素光，否则是顶点光，unity对于第一盏最亮的直线光在第一个bass pass 计算，并计算阴影，然后选择4盏顶点光在也在第一个pass同时计算，对于其他的像素光每个多加一个额外的add pass，对于再剩下的那些顶点光则按照球谐光照的方式在一个bass pass计算。这里面可以认为超过了一定限制的光最后都变成了球谐光照 。可以认为只要你设置了pixel count的限制，你打再多的光也不会把性能拖垮，因为最终他们会转变为球谐光照来伪实现实时光照。这里面的球谐光照的做法可以认为是当场景光源每次变化时将重新在场景上采样一个大的球面，然后计算球谐基底系数，因为这时候采样已经完全忽略了光源的位置，所以在unity中过多的实时的位置光将失去位置信息。

#### unity中参数的表示

在我们的算法中，全部的L0-L2的三组共9个系数，其中每组系数需要3个参数，这样全部的sh9就需要27 个参数。 unity以自己的方式来包装这里的参数，将其封装在7个rgba的color中传到shader里，这7个rgba在unity的shade中分别用unity_SHAr unity_SHAg unity_SHAb unity_SHBr unity_SHBg unity_SHBb unity_SHC来表示：

``` glsl
// SH lighting environment
half4 unity_SHAr;
half4 unity_SHAg;
half4 unity_SHAb;
half4 unity_SHBr;
half4 unity_SHBg;
half4 unity_SHBb;
half4 unity_SHC;
```

上面七组变量内置于UnityShaderVariables.cginc中， 而还原每个球谐基方向上的间接光信息， 使用下面的方法:

``` glsl
// normal should be normalized, w=1.0
half3 SHEvalLinearL0L1 (half4 normal) {
    half3 x;

    // Linear (L1) + constant (L0) polynomial terms
    x.r = dot(unity_SHAr,normal);
    x.g = dot(unity_SHAg,normal);
    x.b = dot(unity_SHAb,normal);

    return x;
}

// normal should be normalized, w=1.0
half3 SHEvalLinearL2 (half4 normal) {
    half3 x1, x2;
    // 4 of the quadratic (L2) polynomials
    half4 vB = normal.xyzz * normal.yzzx;
    x1.r = dot(unity_SHBr,vB);
    x1.g = dot(unity_SHBg,vB);
    x1.b = dot(unity_SHBb,vB);

    // Final (5th) quadratic (L2) polynomial
    half vC = normal.x * normal.x - normal.y * normal.y;
    x2 = unity_SHC.rgb * vC;

    return x1 + x2;
}

// normal should be normalized, w=1.0
// output in active color space
half3 ShadeSH9 (half4 normal) {
    // Linear + constant polynomial terms
    half3 res = SHEvalLinearL0L1(normal);

    // Quadratic polynomials
    res += SHEvalLinearL2(normal);

    if (IsGammaSpace())
        res = LinearToGammaSpace(res);

    return res;
}
```

上面的代码内置于UnityCG.cginc中， 其中还原L0和L1用到了unity_SHAr, unity_SHAg, unity_SHAb, 还原L2使用到了unity_SHBr，unity_SHBg, unity_SHBb, unity_SHC。 7组half4一共28个参数， 通过unity给出的算法可以看到unity_SHC中的a是没有用到的， 参数规模和我们的是一致的。 

如果想获取某个像素周围的间接光信息，直接通过ShadeSH9来获取就可以了。通过unity的c#接口LightProbes.GetInterpolatedProbe即可以拿到场景某处的这组9x3的L0-L2的基底系数，他是一个结构体[SphericalHarmonicsL2][i12]，访问它的3x9的数组可以把他封装成7个rgba的color。



## 题后闲聊

#### 话题一：

 在5月12日Unity主办的Unite Shanghai2019开发者大会上，腾讯天美工作室技术副总监郭智先生以《使命召唤手游，引擎技术升级与演化》为主题分享了《使命召唤手游》在技术方面的开发历程和经验。

![](/img/post-engine/tex27.jpg)

分享提到游戏中间接光用cubemamp做GI Specular，用SH probe做GI diffuse。 不过让我产生疑问的是， 既然使用了SH 球谐面了， 就没必要在去生成cubemap了。 因为使用SH函数，完全就可以还原物体周围的环境辐射图了。 而且他这个cubemap肯定不包含近景的间接光信息， 否则的话实时生成间接光就太耗了， 可能是是只有远景的间接光信息， 在一个场景里只会对应这样一个cubemap。 这完全就我自己猜测的，具体的原因只有他本人知道了。

![](/img/post-engine/tex26.jpg)


#### 话题二：

球谐函数不仅在图形领域有着广泛的应用， 在其他领域也有颇多的应用，比如说人脸识别。为实现任意视点下三维人脸模型绘制,针对极其稀疏和分散的人脸数据,提出基于球谐函数的人脸模型表面光场构建方法。该方法首先利用球谐函数为线性组合表示表面光场对应的辐射度函数,然后使用添加稳定能量项的无约束最小二乘法,实现对人脸模型表面光场的鲁棒性拟合,最后采用仿真技术对任意视点下的人脸模型进行渲染。在极其稀疏的6个视点下的人脸图像上实验,结果验证了该方法的有效性。与插值法比较,验证了该方法更具鲁棒性。

![](/img/post-engine/tex28.jpeg)

#### 话题三：

屏幕空间环境光遮蔽(Screen-Space Ambient Occlusion, SSAO)，一种间接光照的模拟的近似实现方法。SSAO背后的原理很简单：对于铺屏四边形(Screen-filled Quad)上的每一个片段，我们都会根据周边深度值计算一个遮蔽因子(Occlusion Factor)。这个遮蔽因子之后会被用来减少或者抵消片段的环境光照分量。遮蔽因子是通过采集片段周围球型核心(Kernel)的多个深度样本，并和当前片段深度值对比而得到的。高于片段深度值样本的个数就是我们想要的遮蔽因子。

![](/img/post-engine/tex.png)



## 学习资料
*  [球谐函数及其作图 - python ][i13]
*  [Spherical Harmonic Lighting Program][i6]
*  [Spherical Harmonics][i7]  
*  [Precomputed Radiance Transfer:Theory and Practice][i8]
*  [Spherical Harmonics Lighting][i4]
*  [Generating uniformly distributed numbers on a sphere][i3]
*  [Analytic Spherical Harmonic Coefficients for Polygonal Area Lights][i10]
*  [UnityShader——球谐光照][i11]
*  [unity SphericalHarmonicsL2][i12]


[i1]: https://github.com/huailiang/OpenGLEngine
[i2]: https://zhuanlan.zhihu.com/p/49746076
[i3]: http://corysimon.github.io/articles/uniformdistn-on-sphere/
[i4]: http://docs.enthought.com/mayavi/mayavi/auto/example_spherical_harmonics.html
[i5]: http://vip.hbsti.ac.cn/article/read.aspx?id=673092394
[i6]: http://www.yasrt.org/shlighting/
[i7]: http://www.paulsprojects.net/opengl/sh/sh.html
[i8]: https://www.researchgate.net/publication/234765403_Precomputed_radiance_transfer
[i9]: https://lianera.github.io/lianera.github.io/post/2016/sh-lighting-exp/
[i10]: http://cseweb.ucsd.edu/~viscomp/projects/ash/
[i11]: https://blog.csdn.net/NotMz/article/details/78339913
[i12]: https://docs.unity3d.com/ScriptReference/Rendering.SphericalHarmonicsL2.html
[i13]: http://smellysheep.com/2018/03/%E7%90%83%E8%B0%90%E5%87%BD%E6%95%B0%E5%8F%8A%E5%85%B6%E4%BD%9C%E5%9B%BE/