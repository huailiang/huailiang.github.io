---
layout:     post
title:      "ShaderToy"
date:       2021-04-08 02:00:00
author:     "huailiang"
tags:
    - 引擎
---


如果你还没听过[ShaderToy][i1]，那你就真的错过了一个很好的shader学习网站。我是在群里有一次听到小伙伴们提到这个网站的。点进去就会发现里面有很多很绚丽的shader展示。

说简单点，这个网站是专门让人们分享和编写GLSL的pixel shaders的。 换句话说，里面那些绚丽的效果仅仅依靠pixel shaders就可以完成了（当然还有纹理的配合），是不是很强大？里面的强人很多，就像头脑风暴一样，让你一次次发出惊叹，原来还可以这样做！但是，这里面也蕴含了很多数学和算法知识，所以你可能会经常发现自己脑袋不够用，跟不上作者的思路。。。不过，脑袋都是靠锻炼的嘛，没有捷径可走，多看多写总是没错的~

强烈建议大家先去逛一逛，有很多很好玩的东西，例如这个人写了一个莫比乌斯带，而[这个人][i3]写了一个耀眼的小太阳！一开始你很难相信这些完全都是用shader计算出来的。


很多人都在好奇那些绚丽的效果是怎么来的，比如iq刚写的[这个效果][i2]：


<!-- ![](/img/post-unity/toy.jpg) -->

<iframe width="640" height="360" frameborder="0" src="https://www.shadertoy.com/embed/ld3Gz2?gui=true&t=10&paused=true&muted=false" allowfullscreen></iframe>

这个效果用了什么Maya或3ds Max做出的模型吗？答案其实是没有的，没有任何外部的模型输入，纹理和模型都是由程序生成的。当你打开它的界面时，其实所有的输入和程序都一目了然：

![](/img/post-unity/toy2.jpg)


Shadertoy的特点就是大家使用程序来产生各种模型、纹理、动画，所以让人惊叹！一个pixel shader+几张固定的简单的纹理，就能得到这么绚丽的结果！iq的这个新效果更是展示了这种方法能做到的程度——照片级的效果。

那么，他们到底是怎么做到的呢？这里简单提到一下，这种看似有建模效果的画面大部分都使用了raymarching的方法，[iq的博客][i4]里有很多文章，大家可以去学习下。



### 特点

之前说了，这个网上的所有shader都是GLSL的pixel shaders。和 glsl相比，语法一致，只是入口有了些许变化。main函数->mainImage函数。 并且这里内置了一些固定的辅助输入， 比如说获取时间iGlobalTime，来做一些动态的效果。 那么什么是pixel shader呢？如果我们需要渲染一个刚好铺盖整个屏幕的全屏的方形平板，那么这个方形的fragment shader就是一个pixel shader。这是因为此时，每一个fragment对应了屏幕上的一个pixel。也因此，pixel shader的很多输入都是相同的。在ShaderToy的每个shader上方，你都可以看到一个Shader Input：


```glsl
uniform vec3      iResolution;           // 窗口分辨率，单位像素
uniform float     iGlobalTime;           // 程序运行的时间，单位秒
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // 鼠标像素位置. xy: current (if MLB down), zw: click
uniform samplerXX iChannel0..3;          // 输入纹理. 在代码区下面可以选择
uniform vec4      iDate;                 // 日期（年，月，日，时）
uniform float     iSampleRate;           // 帧率
```


这些就是ShaderToy提供的公共变量，我们可以直接访问。例如，iResolution存储了屏幕分辨率，iGlobalTime提供了shader运行时间，iMouse提供了鼠标点击位置等等。

![](/img/post-unity/toy3.jpg)

由于ShaderToy针对的是pixel shaders，这也意味着它们的vertex shaders都是一样的，只需要计算基本的顶点位置和屏幕位置即可。

除了void mainImage( out vec4 fragColor, in vec2 fragCoord ) 这样的入口函数， ShaderToy 还提供了专门针对 VR 应用的入口函数：

```c
void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 ro, in vec3 rd )
```

专门针对 GPU Audio 的入口函数：

```c
vec2 mainSound( in int samp,float time)
```

Audio 的声音 ShaderToy 上的 [Planet Shadertoy][i9]：


### VSCode

如果直接在网页上编写， 似乎效率不高， 编译还需有手动点一下。 vscode 有个插件关于 ShaderToy挺好用的, 能做高亮显示， 编译错误也能搞出提示。而且内置了 ShaderToy 里的一些变量， 比如说iResolution, iGlobalTime (also as iTime), iTimeDelta, iFrame, iMouse, iMouseButton, iDate, iSampleRate, iChannelN


![](/img/post-unity/toy4.jpg)

如果想通过iChannelN给 shader 输入纹理的话， 可以在 shader 开始的地方指定：

```glsl
#iChannel0 "file://carrot.jpeg"

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec4 color = texture(iChannel0,uv);
    fragColor=color;
}
```

上面纹理使用的本地的文件， 还可以使用 web 连接的方式， 在后面配置一个 http 地址就可以了。当然也可以指定采样器的采样方式和图片的环绕方式, 类似下面的代码

```glsl
#iChannel0::MinFilter "NearestMipMapNearest"
#iChannel0::MagFilter "Nearest"
#iChannel0::WrapMode "Repeat"
```

分享一个我实现的画国民党旗的 [Demo][i7], 还是挺有意思的。

<iframe width="640" height="360" frameborder="0" src="https://www.shadertoy.com/embed/sdS3Wy?gui=false&t=10&paused=false&muted=true" allowfullscreen></iframe>

### 在Unity中实践

Unity的出现的确给很多shader学习者一个方便的编译和展示平台，我们不再需要每次都用很多代码准备好顶点数据，每次都设置纹理，每次都设置MVP矩阵等等。Unity提供给我们更方便的可视化操作。

ShaderToy中很多shader都可以经过一点修改后在Unity中编译运行。当然，也有人这么干过了。例如[这位博主][i5]。

为了方便后面的编写，我们可以写一个针对ShaderToy的基本模板shader。在这之前，我们有必要弄清楚ShaderToy的Shaders长什么样。如果你仔细观察，其实ShaderToy中的所有shader只有一个必不可少的函数：

```glsl
void mainImage( out vec4 fragColor, in vec2 fragCoord )
```
它的输入是一个类型为vec2的fragCoord，对应输入的屏幕位置；输出一个vec4的fragColor，对应该pixel的颜色。很简单对不对！

那么现在我们就可以写出这个模板shader了。

```glsl
Shader "Shadertoy/Template" { 
    Properties{
        iMouse ("Mouse Pos", Vector) = (100, 100, 0, 0)
        iChannel0("iChannel0", 2D) = "white" {}  
        iChannelResolution0 ("iChannelResolution0", Vector) = (100, 100, 0, 0)
    }

    CGINCLUDE    
    #include "UnityCG.cginc"   
    #pragma target 3.0      

    #define vec2 float2
    #define vec3 float3
    #define vec4 float4
    #define mat2 float2x2
    #define mat3 float3x3
    #define mat4 float4x4
    #define iGlobalTime _Time.y
    #define mod fmod
    #define mix lerp
    #define fract frac
    #define texture2D tex2D
    #define iResolution _ScreenParams
    #define gl_FragCoord ((_iParam.scrPos.xy/_iParam.scrPos.w) * _ScreenParams.xy)

    #define PI2 6.28318530718
    #define pi 3.14159265358979
    #define halfpi (pi * 0.5)
    #define oneoverpi (1.0 / pi)

    fixed4 iMouse;
    sampler2D iChannel0;
    fixed4 iChannelResolution0;

    struct v2f {    
        float4 pos : SV_POSITION;    
        float4 scrPos : TEXCOORD0;   
    };              

    v2f vert(appdata_base v) {  
        v2f o;
        o.pos = mul (UNITY_MATRIX_MVP, v.vertex);
        o.scrPos = ComputeScreenPos(o.pos);
        return o;
    }  

    vec4 main(vec2 fragCoord) {
        return vec4(1, 1, 1, 1);
    }

    fixed4 frag(v2f _iParam) : COLOR0 { 
        vec2 fragCoord = gl_FragCoord;
        return main(gl_FragCoord);
    }  
    ENDCG    

    SubShader {    
        Pass {    
            CGPROGRAM    
            #pragma vertex vert    
            #pragma fragment frag    
            #pragma fragmentoption ARB_precision_hint_fastest     
            ENDCG    
        }    
    }     
    FallBack Off    
}
```
代码比较简单。主要是在开头定义了一系列宏来和ShaderToy中的GLSL衔接， 更多的两种 shader 语言之间的转换，可以参考我之前的一篇文章: [CG/hlsl 内置函数][i8]。其中main函数对应了之前的mainImage函数。在后面，我们只需要在CGINCLUDE中定义其他函数，并填充main函数即可。

为了可以响应鼠标操作，我们还可以写一个C#脚本，以便在鼠标进行拖拽时将鼠标位置传递给shader。
```csharp
using UnityEngine;

public class ShaderToyHelper : MonoBehaviour {
    private Material _material = null;
    private bool _isDragging = false;

    void Start () {
        Renderer render  = GetComponent<Renderer>();
        if (render != null) {
            _material = render.material;
        }
        _isDragging = false;
    }

    void Update () {
        Vector3 mousePosition = Vector3.zero;
        float z = _isDragging ? 1.0f : 0.0f;
        mousePosition = new Vector3(Input.mousePosition.x, Input.mousePosition.y, z);
        if (_material != null) {
            _material.SetVector("iMouse", mousePosition);
        }
    }

    void OnMouseDown() {
        _isDragging = true;
    }

    void OnMouseUp() {
        _isDragging = false;
    }
}
```

代码很简单，在有鼠标拖拽时，mousePositon的Z分量为1，否则为0。这跟ShaderToy中判断鼠标的方式一致。

使用时，只要把该脚本拖拽到材质所在的物体上，同时保证该物体上有绑定Collider即可。


### 写在最后

[ShaderToy][i1]绝大部分代码都是依靠强大的数学计算来完成的，因此真的是一次次头脑风暴。

当然，一些人会觉得它对于现在火爆的移动终端来说用处不大，因为支持不了呗~ 


[i1]: https://www.shadertoy.com
[i2]: https://www.shadertoy.com/view/ld3Gz2
[i3]: https://www.shadertoy.com/view/4slSD8
[i4]: http://www.iquilezles.org/www/index.htm
[i5]: http://blog.csdn.net/stalendp/article/category/1628145
[i6]: https://blog.csdn.net/candycat1992/article/details/44039077
[i7]: https://www.shadertoy.com/view/sdS3Wy
[i8]: https://huailiang.github.io/blog/2019/cg/
[i9]: https://www.shadertoy.com/view/4tjGRh