---
layout:     post
title:      "自动化导出c++各个平台库"
date:       2018-03-01 12:00:00
author:     "Huailiang"
tags:
    - Unity
---


> 在上面一节，我们学习了c++和c#混合编程，主要是针对windows平台。接下来我们会讲下在其他平台c++库在Unity中使用的方法。unity可以使用的ios静态库（.a） android 静态库（.so） mac下的bundle库。上面的库导出以后，放在Unity Plugins目录下，Unity在编译包或者在编辑器里运行的时候会自动对应相应的库。

unity 使用 在 Plugins 目录最终层级结构如下图所示：

![](/img/post-cpp/cpp14.png)


## Android 生成so

Android平台下，c++代码生成.so库，我们这里主要是使用ndk的方法。 NDK 是在SDK前面又加上了“原生”二字，即Native Development Kit，因此又被Google称为NDK。  随着Android的蓬勃发展, CPU的架构也越来越多. 早期只支持ARMv5, 截至目前, 支持的架构已达三类七种: ARM(ARMv5，ARMv7 (从2010年起)，ARMv8), x86(x86 (从2011年起),x86_64 (从2014年起)) ,MIPS(MIPS (从2012年起),MIPS64). 众多架构使用的指令集不尽相同, 与相应的ABI关联: armeabi, armeabi-v7a, arm64-v8a, x86, x86_64, mips, mips64. 所以, NDK编译不同架构的库要选择不同的ABI。 不过Unity5之后，导出的包只会有ARMv7和x86两种架构了，我们在配置的时候，也就只需考虑这两种结构就可以了。 而大红大紫的《王者荣耀》就更过分了，我们解开他们的apk之后，发现他们只有arm-v7这一种so,说明不常用的x86手机已经被他们无情的抛弃了。

![](/img/post-cpp/cpp13.jpg)

你可以到[官网下载NDK][i1], 下载完成之后需要设置一些环境变量：

{% highlight bash %}
export NDK_HOME=/home/echosea/Desktop/Android/android-ndk-r12
export PATH=$NDK_HOME:$PATH
{% endhighlight %}

创建Application.mk和Android.mk文件
Application.mk文件，可以用来配置编译平台相关内容，它用来指定我们需要基于哪些CPU架构的.so文件，当然你可以配置多个平台：

{% highlight bash %}
APP_ABI          := armeabi armeabi-v7a x86
APP_OPTIM         := release
APP_PLATFORM      := android-8

# GNU STL implements most C++11 features. Use either gnustl_static or gnustl_shared
# Without this your C++ code will not be able to access headers like <thread>, <mutex>
#APP_STL      := stlport_static
#APP_CPPFLAGS := -std=c++11 -frtti -fexceptions
APP_STL       := gnustl_static
APP_CPPFLAGS  := -std=gnu++11 -pthread -frtti -fexceptions
#-NDEBUG -mfpu=neon -fomit-frame-pointer
 -DNDEBUG  
{% endhighlight %}

配置Android.mk文件，用来指定源码编译的配置信息，例如工作目录，编译模块的名称，参与编译的文件等，大致内容如下：
{% highlight bash %}
# Copyright (C)
# Author: huailiang.peng
# Date:	  2017-11-25
# Function:	make c++ code to so
#

LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)

#so 文件名
LOCAL_MODULE   := GameCore

#  c++目录的相对路径
MY_FILES_PATH  :=  $(LOCAL_PATH)/../../XCPP/GameCore

#$(warning $(MY_FILES_PATH))

# c++后缀
MY_FILES_SUFFIX := %.cpp %.c

# 递归遍历目录下的所有的文件
rwildcard=$(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

# 获取相应的源文件
MY_ALL_FILES := $(foreach src_path,$(MY_FILES_PATH), $(call rwildcard,$(src_path),*.*) )
MY_ALL_FILES := $(MY_ALL_FILES:$(MY_CPP_PATH)/./%=$(MY_CPP_PATH)%)
MY_SRC_LIST  := $(filter $(MY_FILES_SUFFIX),$(MY_ALL_FILES))
MY_SRC_LIST  := $(MY_SRC_LIST:$(LOCAL_PATH)/%=%)

# 去除字串的重复单词
define uniq =
  $(eval seen :=)
  $(foreach _,$1,$(if $(filter $_,${seen}),,$(eval seen += $_)))
  ${seen}
endef

# 递归遍历获取所有目录
MY_ALL_DIRS := $(dir $(foreach src_path,$(MY_FILES_PATH), $(call rwildcard,$(src_path),*/) ) )
MY_ALL_DIRS := $(call uniq,$(MY_ALL_DIRS))

# 赋值给NDK编译系统
LOCAL_SRC_FILES  := $(MY_SRC_LIST)
LOCAL_C_INCLUDES := $(MY_ALL_DIRS)

#在这里设置宏
LOCAL_CFLAGS := -D__ANDROID__

# Add additional include directories
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../
#LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../../Eigen-3.2.2   
#必须从Android.mk配置文件中拿掉对Eigen的直接包含，放到程序代码中用相对路径包含：
# #include "../../Eigen-3.2.2/Eigen"
# using namespace Eigen;

#$(warning $(LOCAL_SRC_FILES))
#$(warning $(LOCAL_C_INCLUDES))

# use log system in NDK
LOCAL_LDLIBS += -llog

include $(BUILD_SHARED_LIBRARY)

{% endhighlight %}

其中
LOCAL_MODULE表示模块名称
LOCAL_SRC_FILES表示需要参与编译的源文件
除了这两个，其他照搬即可

#### NDK-build
android ndk构建系统依赖于GUN make工具对模块进行构建，默认情况下，GUN make工具一次执行一条构建命令，等这一句执行完了以后再执行下一句，如果我们使用-j参数，GUN make就可以并行执行构建命令。
cd 到jni的上一级目录，使用命令ndk-build, 自动生成了，libs目录
![](/img/post-cpp/cpp18.png)

不过 build 之前，最好 clean一下，保证环境的纯净。

{% highlight bash %}
$ ndk-build clean
$ ndk-build
{% endhighlight %}

### Mac下生成Bundle

创建 mac支持的 c++库，我们新建一个 xcode 工程，选择 macOS一栏，选择 Bunlde 一侧. 如下图所示：
![](/img/post-cpp/cpp15.png)

创建好之后，我们把 windows 中vs 里使用的 c++代码拖到 xcode 工程中,这里使用引用就可以了，没有必要 copy 一份新的到 xcode

![](/img/post-cpp/cpp19.png)

设置好自己使用的Architecture,如果顺利的话，你就可以编译到bundle 库了

![](/img/post-cpp/cpp16.png)

在 products 目录下右键*.bundle 在 Show in Finder ,将生成的 bundle 复制到 unity 项目 plugins 目录下，就大工告成了。

### 生成IOS .a静态库

创建 ios支持的 c++库，我们新建一个 xcode 工程，选择 iOS一栏，选择 .a 一侧. 注意，ios 我们这里使用的是静态库，而非像其他平台是动态链接库。如下图所示：
![](/img/post-cpp/cpp20.png)
其他的操作跟 macos 相同。编译成功之后我们可以看到 products 目录多出了 gamecore.a
![](/img/post-cpp/cpp22.png)

下面借助一段Shell脚本就可以导出和合并生成.a 并且 copy 到 Plugins目录下：

{% highlight bash %}
#
#	i386｜x86_64 是Mac处理器的指令集，i386是针对intel通用微处理器32架构的。x86_64是针对x86架构的64位处理器 这两个是ios模拟器使用
#	standard architectures (including 64-bit)(armv7,arm64)
#	Build Active Architecture Only  指定是否只对当前连接设备所支持的指令集编译. 当其值设置为YES，这个属性设置为yes，是为了debug的时候编译速度更快，它只编译当前的architecture版本，而设置为no时，会编译所有的版本
#	编译出的版本是向下兼容的，连接的设备的指令集匹配是由高到低（arm64 > armv7s > armv7）依次匹配的
#

# !/bin/sh

path=/Users/huailiang.peng/Documents/unity/dn_asset

cd ${path}

cd tools_proj/IOS/GameCore

echo "xcode clean "

rm -r libGameCore.a

xcodebuild clean

echo "xcode build"

echo "start build for iphoneos"

#编译 release 版本的.a
xcodebuild -configuration "Release" -target GameCore -sdk iphoneos clean build

eho "start build for simulator"

#编译 release 版本的.a
xcodebuild -configuration "Release" -target GameCore -sdk iphonesimulator clean build

echo "build success"

echo "merge diff start library"

lipo -create build/Release-iphoneos/libGameCore.a build/Release-iphonesimulator/libGameCore.a -output libGameCore.a

lipo -info libGameCore.a

echo "make libGameCore.a success"

echo "start mv to unity Plugins dir"

mv -f libGameCore.a ${path}/Assets/Plugins/iOS/libGameCore.a

echo "done, bye!"

{% endhighlight %}

macos 和 ios 的库都是在xcode 中手动生成的，不符合我们自动化的流程，我们生成版本时，如果中间每次都是手动操作的话，也很容易出错。那有没有一套自动化的流程，既省时，又能保证版本质量呢，答案是肯定的。

### cmake交差编译
CMake是一个跨平台的安装（编译）工具，可以用简单的语句来描述所有平台的安装(编译过程)。他能够输出各种各样的makefile或者project文件，能测试编译器所支持的C++特性,类似UNIX下的automake。只是 CMake 的组态档取名为 CMakeLists.txt。这里使用的是CMake，官网地址为：[https://cmake.org/][i3]


MAC默认是没有cmake指令的。要测试你的MAC是否已经装过cmake，可以这样做：打开Terminal，输入cmake --version，如果已经安装，则会显示具体的版本号；否则就是没安装或者没配置成功。

以 OSX平台为例，下面展示:

CMakeLists.txt：

{% highlight bash %}
cmake_minimum_required(VERSION 3.0.2)
#project(GameCore)

include_directories(${CMAKE_CURRENT_SOURCE_DIR})

file(GLOB_RECURSE source_cpp_files "${CMAKE_CURRENT_SOURCE_DIR}/../XCPP/GameCore/*.cpp")
file(GLOB_RECURSE source_c_files "${CMAKE_CURRENT_SOURCE_DIR}/../XCPP/GameCore/*.c")

# 设置使用 C++11 标准
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)


# 编译 Debug 模式还是 Release 模式
set(CMAKE_BUILD_TYPE Release)

# 根据 OSX、Android、iOS 等不同平台，分别设置不同的配置
if (OSX)
    message("is building osx platform")

    include(CheckCXXCompilerFlag)  
    CHECK_CXX_COMPILER_FLAG("-std=c++11" COMPILER_SUPPORTS_CXX11)  
    CHECK_CXX_COMPILER_FLAG("-std=c++0x" COMPILER_SUPPORTS_CXX0X)  
    if(COMPILER_SUPPORTS_CXX11)  
            set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")  
    elseif(COMPILER_SUPPORTS_CXX0X)  
            set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++0x")  
    else()  
         message(STATUS "The compiler ${CMAKE_CXX_COMPILER} has no C++11 support. Please use a different C++ compiler.")  
    endif()  

    add_library(GameCore MODULE ${source_cpp_files} ${source_c_files})

    # OSX 下面的 Unity 插件要是 GameCore.bundle 格式的
    set_target_properties(GameCore PROPERTIES BUNDLE TRUE)

    # 设置代码库的输出路径
    set(OUT_PATH ${CMAKE_CURRENT_SOURCE_DIR}/out/OSX/)

    # 添加编译使用的宏
    ADD_DEFINITIONS(-D__MACH__)

elseif(IOS)
    message("is building ios platform")

	add_library(GameCore STATIC ${source_cpp_files} ${source_c_files})

    # 设置编译器, 由于 iOS 和 OSX 使用的是相同的编译器，所以此处设置为 Mac 上的Clang 的路径
    # 但是对于 Android 来讲，交叉编译的环境为 NDK 的编译器环境，所以需要对 Android 设置为 NDK 下面的编译器路径。
    set(CMAKE_C_COMPILER clang)
    set(CMAKE_CXX_COMPILER clang++)
    # bitcode 设置为 NO
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fembed-bitcode")
    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -fembed-bitcode")

    # 最低支持的 iOS 版本
    set(CMAKE_XCODE_ATTRIBUTE_IPHONEOS_DEPLOYMENT_TARGET "7.1")

    # 支持的指令架构
    set(CMAKE_OSX_ARCHITECTURES "armv7 armv7s arm64")

    # 使用哪个 iOS SDK 进行打包，这里需要注意是对 iPhone 真机打包还是 iPhone 模拟器打包，二者的 SDK 是不同的。
    # 我们这里使用的是 iPhone 真机的 SDK。
    set(CMAKE_OSX_SYSROOT /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS.sdk)

    # 设置代码库的输出路径
    set(OUT_PATH ${CMAKE_CURRENT_SOURCE_DIR}/out/iOS/)

    # 添加编译使用的宏
    ADD_DEFINITIONS(-D__iOS__)

elseif(ANDROID)
    message("is building android platform")

    add_library(GameCore SHARED ${source_cpp_files} ${source_c_files})

    # 由于 Unity 在 Android 下面对 C++ 只支持 .so 的动态库格式，
    # 而如果你用 Mac 机编译时，默认的动态库格式为 .dylib,
    # 所以我们需要显示的使用 .so 后缀。
    set_target_properties(GameCore PROPERTIES SUFFIX ".so")

    # 设置代码库的输出路径
    set(OUT_PATH ${CMAKE_CURRENT_SOURCE_DIR}/out/Android/${ANDROID_ABI}/)

    # 添加编译使用的宏
    ADD_DEFINITIONS(-D__ANDROID__)

else()
    message("warn: unknown platform")
    message(${CMAKE_SYSTEM})
    add_library(GameCore STATIC ${source_cpp_files} ${source_c_files})
    set(OUT_PATH ${CMAKE_CURRENT_SOURCE_DIR}/out/else/)
endif()


# 设置代码库的输出路径, 对 Debug 和 Release 模式都设置成同一个路径
set_target_properties(GameCore PROPERTIES
        LIBRARY_OUTPUT_DIRECTORY ${OUT_PATH}
        ARCHIVE_OUTPUT_DIRECTORY ${OUT_PATH}
        LIBRARY_OUTPUT_DIRECTORY_RELEASE ${OUT_PATH}
        ARCHIVE_OUTPUT_DIRECTORY_RELEASE ${OUT_PATH}
        LIBRARY_OUTPUT_DIRECTORY_DEBUG ${OUT_PATH}
        ARCHIVE_OUTPUT_DIRECTORY_DEBUG ${OUT_PATH}
        LIBRARY_OUTPUT_DIRECTORY_RELEASE ${OUT_PATH}
        ARCHIVE_OUTPUT_DIRECTORY_RELEASE ${OUT_PATH}
        )

{% endhighlight %}


生成 ios 静态库，还需要配置一个 toolchain文件,你可以在这里[点击下载][i2]。然后使用如下命令，生成 ios 工程：

{% highlight bash %}
#generate ios project
cmake -DCMAKE_TOOLCHAIN_FILE=toolchains/ios.toolchain.cmake -DIOS_PLATFORM=iPhoneOS -DCMAKE_OSX_ARCHITECTURES='armv7 armv7s arm64' -GXcode

{% endhighlight %}

好了，到这里就结束了，拿到 xcode 工程，之后使用xcodebuild编译出库，所有的流程都是Shell 在后台帮我们完成了，我们需要做的就是喝咖啡等待最终的结果了。

[i1]: https://developer.android.com/ndk/downloads/index.html

[i2]:https://github.com/zilongshanren/Box2D-cocos2d-x/blob/master/Box2D/toolchain/

[i3]:https://cmake.org/
