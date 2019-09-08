---
layout:     post
title:      "Unity c#与c++混合编程"
date:       2018-02-28 12:00:00
author:     "Huailiang"
tags:
    - Unity
---


> 首先，Unity是基于Mono也就是.Net的运行环境的，所以它肯定支持C#；然后，Unity团队自行开发了一种Boo的语言；后面可能考虑到用户的接受程度的问题，又开发了类似JS的一种语言，但那绝对不是JS，勉强可以称之为UnityScript。这三种语言的代码最后都会被编译执行，而且可以互相访问。

在Unity游戏的开发当中，我们的游戏项目变得越来越复杂，以至于有些项目功能必须通过依赖库来进行实现。

比如，我们在手游开发中用到的GVoice、FMOD或者是其他的插件，都是通过调用Native dll（C/C++）来实现一些复杂的功能。《王者荣耀》核心代码libGameCore.so 也是用c++完成的。

那么我们应该如何使用C#来对C++进行调用呢。

了解C#的人都知道，C#是运行在CLR之上被托管的，而C++则并没有被托管。

目前.Net平台中托管环境调用非托管环境有三种方法：

- P/Invoke
- C++ Interop
- COM Interop

这三种方法当中，C++ Interop是针对托管C++使用的方法（说实话C++/CLI感觉没啥前途），COM Interop则是针对Window软件开发而采用的方式。所以我们只剩下一种解决方案：也就是PInvoke来进行托管环境与非托管环境的互操作。不过由于PInvoke本身内容也并不少，所以在这里我也就简单介绍一下其使用的方式，更详细的内容可以去查看官方文档，或者是下一个《精通.Net互操作》的pdf来阅读就可以了。

### 新手入门
如何做到c# 能调用到c++代码呢，下面我们通过一个小的Demo展示。

- 在Unity 新建一个c# 代码，里面内容如下：

``` csharp 
public class TestCPP : MonoBehaviour {

#if UNITY_IPHONE || UNITY_XBOX360
    [DllImport("__Internal")]
#else
    [DllImport("GameCore")]
#endif
    public static extern int iAdd(int x, int y);

    public void OnGUI()
    {
        GUILayout.BeginVertical();
        if (GUILayout.Button("Cal-Add"))
        {
            int i = iAdd(8, 7);
            Debug.Log("8+7=" + i);
        }
        GUILayout.EndVertical();
    }
}
```

Testcpp.cs挂在当前场景随意一个gameobject下，然后在vs中设置新建一个c++ 空项目，属性设置如下图：

![](/img/post-cpp/cpp1.jpg)

配置类型：动态库（.dll）,平台设置为x64

c++代码的实现如下：

``` cpp
#ifndef __Test__
#define __Test__

extern "C"
{
    __declspec(dllexport) int iAdd(int a,int b)
    {
	    return a+b;
    }
};
#endif
```

导出dll,然后copy到unity项目Plugins/x86_x64目录下，点击unity运行按钮，点击GUI Add按钮，这时你可以看到一行log在console串口中，就证明你的c++调用成功了。类似下图：

![](/img/post-cpp/cpp2.jpg)

### 断点调试
在你的c++ 调试（D）->附加到进程（P)... ,在弹出的窗口作如下选择：

![](/img/post-cpp/cpp3.jpg)

点击附加，你就可以设置断点了。

![](/img/post-cpp/cpp4.jpg)


### 复杂的数据封送

#### 指针传递

``` cpp 
extern "C"
{
    __declspec(dllexport) int iSub(int* a, int* b)
    {
        return *a - *b;
    }
}
```

c#主要通过IntPtr去处理的

```csharp 
#if UNITY_IPHONE || UNITY_XBOX360
    [DllImport("__Internal")]
#else
    [DllImport("Core")]
#endif
    public static extern int iSub(IntPtr x, IntPtr y);

public void OnGUI
{
    if (GUI.Button(new Rect(20, 120, 100, 60), "Sub"))
     {
         int a = 8, b = 2;
         IntPtr p1 = Marshal.AllocCoTaskMem(Marshal.SizeOf(a));
         Marshal.StructureToPtr(a, p1, false);
         IntPtr p2 = Marshal.AllocCoTaskMem(Marshal.SizeOf(b));
         Marshal.StructureToPtr(b, p2, false);
         int rst = iSub(p1, p2);
         Debug.Log(a + "-" + b + "=" + rst);
     }
}
```


#### c++反调用c# 使用指针函数（c++）

```cpp
typedef bool(*SharpCALLBACK)(unsigned char,const char*);

__declspec(dllexport) void iInitCallbackCommand(SharpCALLBACK cb)
{
	callback = cb;
}
```

```csharp 
public delegate void CppDelegate(byte type, IntPtr p);

#if UNITY_IPHONE || UNITY_XBOX360
    [DllImport("__Internal")]
#else
    [DllImport("GameCore")]
#endif
    public static extern void iInitCallbackCommand(CppDelegate cb);

    public static void Init()
    {
        iInitCallbackCommand(OnInitCallback);
    }

    [MonoPInvokeCallback(typeof(CppDelegate))]
    static void OnInitCallback(byte t, IntPtr ptr)
    {
        string command = Marshal.PtrToStringAnsi(ptr);
        XDebug.CLog(command);
    }
```

#### 传送结构体

```cpp 
struct Row
{
    uint itemid;
    char itemname[MaxStringSize];
    int equippos;
    int profession;
};

extern "C"
{
    __declspec(dllexport) void iGetFashionListRow(Row* row);
}
```

```csharp
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
public struct RowData {
    uint itemid;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 64)]
    string itemname;
    int equippos;
    int profession;
}

#if UNITY_IPHONE || UNITY_XBOX360
[DllImport("__Internal")]
#else
[DllImport("GameCore")]
#endif
static extern void iGetFashionListRowByID(int idx, ref RowData row);
```


### 面向对象

通过上面测试我们可以看到出c#里都是静态函数，c++都写在extern c中，需要自己去获取对应的实例，这些都是面向过程的。而c++天然是面对对象的OO,那我们如何实现c#里去new一个c++对象，c# new的对象又是如何析构的呢？

C++互操作也有自动生成接口代码工具，这就是Swig。Swig可以根据不同的语言生成各个语言与C++交互的接口，包括C#、Java、Python、Ruby等等，你可以在[swig官网][i1]下载最新版本的swig.

![](/img/post-cpp/cpp5.jpg)


在c++项目里添加swig文件夹，添加Core.i ，类似图中所示：

![](/img/post-cpp/cpp7.jpg)

右击Core.i, 设置项类型为自定义生成工具

![](/img/post-cpp/cpp6.jpg)

点击右下角应用，刷新之后，在自定义工具设置命令行和输出，如图：

![](/img/post-cpp/cpp8.jpg)

命令行配置如下：
{% highlight bash %}
echo on
C:\swigwin-3.0.12\swig.exe -c++ -csharp -outdir $(SolutionDir)..\Assets/SwigTools %(FullPath)
echo off
{% endhighlight %}
这段代码的意思就是调用swig，-c++设置源语言为c++ -csharp代表输出语言为C#，最终的-outdir代表的是C#接口的输出目录，而最后的参数代表的是.cxx文件的输出目录。

然后我们对工程进行编译：

发现会生成C#文件以及.cxx文件，这个时候，我们将.cxx文件包含到工程当中, 如果没有包含到工程中，c#调用c++时候将会找不到方法，切记。

我们新建一个c++的类，其中实现代码如下：

```cpp
#include "Invork.h"

int Invork:: Mul(int a,int b)
{
    return a * b;
}

int Invork::Div(int a,int b)
{
    if( b == 0 )
    {
        return 0;
    }
    else
    {
        return a/b;
    }
}
```

编译生成之后会发现我们的c#目录会多出三个文件，如下图所示：

![](/img/post-cpp/cpp9.jpg)


在c#里我们这可这样调用c++的东西：
{% highlight csharp %}
if (GUI.Button(new Rect(20, 220, 100, 60), "Swig"))
{
    int c = Invork.Div(4, 2);
    Debug.Log("div val:" + c);
    Invork ins = new Invork();
    c = ins.Mul(3, 5);
    Debug.Log("mul val:" + c);
    ins.Dispose();
}
{% endhighlight %}

如果最终你得到如图所示的日志，恭喜你，所有的流程都跑通了。
![](/img/post-cpp/cpp10.jpg)

在c#里new c++里的对象，记得一定要Dispose(),否则的话，会造成内存泄漏，带来不必要的麻烦。上面的代码如果没有显示调用ins.Dispose() 可是可以的，ins在托管销毁的时候，swig已帮助我们在析构函数中调用Dispose(),但这样释放的不及时，并不是函数退出的时候就会释放。在生成的Invoik类的析构函数自动调用了Disposse()。最后说说swig的缺点，swig并不会帮助我们生成UNITY_IPHONE ios平台下外链调用，即DllImport 因为ios平台我们平常使用的都是静态库， 而不像Windows和Android平台一样是动态库。
![](/img/post-cpp/cpp11.jpg)

### Swig常用语法
详细的文档请参考官方文档，这里只做简单的一些介绍。

我在项目中写了一个简单的模板，用到了一些Swig的常用功能：

![](/img/post-cpp/cpp12.jpg)

module
module代表的是当前.i模板所在的模块，相对应的，该.i文件也会生成相应的接口文件，命名就与%module声明的一样。所以该语法一般用在模板的开头。

include
就像C/C++一样，include会将需要生成接口的文件进行生成。是必不可少的语法。

大括号帮助我们在.cxx中加入一些代码，例如我们最常用的#include，这样我们才可以让.cxx调用到相应的代码。

使用C++/STL
我们可以通过包含各种swig所包含的.i文件来帮助我们实现STL库。

例如%incude “std_string.i”、%include “std_vector.i”

{% highlight cpp %}
namespace std {

%template(BoolVector) vector<bool>;

}
{% endhighlight %}

使用这样的定义方式，Swig会为我们生成一个名为BoolVector的类型而不是未知类型。我们可以在目标语言中创建C++中的STL并且与C++中的Vector进行互操作。

需要注意的是，如果我们使用自定义类型而非基本类型或者使用指针作为模板类型，我们则需要事先导出自定义类型的定义，否则就会得到SWIGTYPE_p_类型名这样定义作为类型模板的Vector定义，这往往不是我们想要的。

使用指针
定义指针的方法如下：
{% highlight cpp %}
%pointer_class(bool, BoolPointer);
{% endhighlight %}
通过这个定义我们Swig会为我们生成指针相对应的类，Swig再会生成类似于SWIGTYPE_p_bool这样的未定义类型，而是直接使用BoolPointer，并且我们能够自己在目标语言中申请内存，并且自己对内存进行管理。

使用数组
定义数组的方法如下。
{% highlight cpp %}
%array_class(unsigned char, UnsignedCharArray);
{% endhighlight %}
通过这种方式我们可以导出相应的数组类型。我们可以在目标语言中创建C++中的数组，并且与C++中的数组进行互操作。

关于本节使用的代码都已上传到github，[欢迎下载][i2]


[i1]: http://www.swig.org/translations/chinese/index.html
[i2]: https://github.com/huailiang/swig
[i3]: http://www.slua.net/
