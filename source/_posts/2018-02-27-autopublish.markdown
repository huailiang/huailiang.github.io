---
layout:     post
title:      "项目之自动化部署 CI"
date:       2018-02-27 12:00:00
author:     "Huailiang"
tags:
    - 工具
---


> 大家如何是如何管理自己项目的打包、打补丁流程了。还需要手动给 QA、策划或者运营出包吗？出包还需要使用 Unity 吗？你的项目是如何持续集成的，下面我们来一步步从头说起。


## 使用 Jenkins 出包 

Jenkins是一个开源软件项目，是基于Java开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。

### Jenkins功能包括：
- 持续的软件版本发布/测试项目。
- 监控外部调用执行的工作。

### 安装 Jenkins
你可以<a href="https://jenkins.io">点击这里，</a>在官网下载最新的 Jenkins 版本部署在本地。Jenkins默认安装路径：/Applications/Jenkins/jenkins.war。安装完成之后，会自动启动jenkins，打开浏览器，进入网页 localhost:8080。

``` sh
# 设置开机自启动
sudo launchctl load -w /Library/LaunchDaemons/org.jenkins-ci.plist
# 取消开机自启动
sudo launchctl unload -w /Library/LaunchDaemons/org.jenkins-ci.plist
# 手动启动
Java -jar jenkins.war
# 后台启动(默认端口)
nohup java -jar jenkins.war &
# 后台启动(指定端口)
nohup java -jar jenkins.war -httpPort=88 &
# 后台启动(HTTPS)
nohup java -jar jenkins.war -httpsPort=88 &
```

![](/img/post-publish/post-jenkins.jpg)

安装完成之后， 在当前用户主目录生成一个隐藏的目录（.jenkins）, 如果你懂得js的话， 可以进去根据自己项目的需求，修改源码定制自己的页面。

``` sh
cd ~/.jenkins
open .
```

如下图所示， jobs是Jenkins配置的所有的项目， users是数据库里记录的所有的用户信息，网站使用的所有的图片都存在war/images文件夹下：

![](/img/post-publish/post-home.jpg)


### Jenkins 的使用

现在打包前很多有条件需要选着，比如打包的分支、渠道等，在主界面点进去我们自己的 job，然后再界面左侧选择 Build with Parameter,在主界面你就可以根据自己的需求，选择好之后，点击 Build 按钮就可以打包了。

![](/img/post-publish/post-jenkins3.jpg)

Jenkins 蓝色节点表示 job 执行完成，红色表示执行过程中失败，发生异常。Jenkins 最近 job完成情况，如果是一个太阳的图标，表示最近 几次job 执行都比较稳定，没有出现异常。Build 之后，你也可以选中当前节点，浏览日志。

![](/img/post-publish/post-jenkins4.jpg)

### Jenkins支持的脚本

这里我们使用了一款 jenkins 的动态语言管理插件Active Choice Plugin。之前是用来 Dynamic parameter Plugin，貌似现在由于安全原因已经不支持了。

Jenkins 使用的是Groovy Script，Groovy是一种基于JVM（Java虚拟机）的敏捷开发语言，它结合了Python、Ruby和Smalltalk的许多强大的特性，Groovy 代码能够与 Java 代码很好地结合，也能用于扩展现有代码。由于其运行在 JVM 上的特性，Groovy 可以使用其他 Java 语言编写的库。你可以了解更多关于脚本的东西，请[点击这里][i2]*

###### 下面贴出一些常用的相关的脚本：

比如说获取时间戳作为 job id:

``` groovy 
new Date().format("yyyyMMddHHmmss")
```

获取所有的分支：

``` groovy 
def cmd = 'git ls-remote --heads git@git.intra.123u.com:dragon_nest/dragon-nest.git'
def proc = cmd.execute()
proc.waitFor()

if ( proc.exitValue() != 0 ) {
 println "Error, ${proc.err.text}"
 return
}

def text = proc.text

def match = /refs\/heads\/(.+)$/
def tags = []

text.eachLine {
if ((m = it =~ /refs\/heads\/(.+?)$/)) {
  //println m.group(1)
  tags.push(m.group(1))
}
}

tags.unique()
return tags
```

## Jenkins 与外部交互

通常情况下，我们使用 Shell脚本作为桥梁来连接我们的 web 页面和工程，Jenkins 调用 shell 设置可通过在Jenkins配置选项Build(构建)一栏增加构建步骤选择 Execute Shell 。脚本可以参照下面，
``` sh
#!/bin/bash

pwd
> /tmp/dn.log

#source ~/.bash_profile >/dev/null 2>1
echo "start build android, kind:"${channel}"branch:"${branch}
if [ $channel = "test" ];then
 bash /var/Shells/android_test.sh
elif [ $channel = "publish" ];then
 bash /var/Shells/android_publish.sh
elif [ $channel = "release" ]; then
 bash /var/Shells/android_release.sh
elif [ $channel = "debug" ]; then
 bash /var/Shells/android_debug.sh
else
 echo "There is no such argument"
fi
```

这样我们再打包机上写相关的 shell脚本，比如说调用 git ，unity, xcodebuild、ant、ftp 相关的命令行，来完成项目对应的流程。当然了，不一定适用 shell 脚本，我们也可以适用 web 表单.下面列出了支持的脚本，相当的丰富。

![](/img/post-publish/post-jenkins2.jpg)


### 参数化构建

网页里定义变量，打包脚本(shell)里获取变量

我们在当前Job里config 增加一个参数uid，类似下图所示：
![](/img/post-publish/post-jenkins8.jpg)


保存之后，我们在自己的shell的脚本里这样取uid的参数值：

``` sh
#!/bin/bash

echo "打包参数 channel is:"${uid}

```


这里强调一件事，如果你的jenkins执行shell的时候，提示没有权限，可能是安装的方式不对，不妨参考网络上这篇文章：[mac下Jenkins 主目录导致的权限问题][i3]

目前Jenkins上的插件（Plugin）很多, 且质量参差不齐。比如说git、邮件、通知Notificatioin。作者这里认为都没有必要装，很多东西都是几行shell就搞定了，出了问题也好比较排查。

如果你需要每个平台打包相关的脚本，你可以点击[这里][i4]。


## Jenkins 分布式部署

Jenkins的分布式构建，在Jenkins的配置中叫做节点，分布式构建能够让同一套代码或项目在不同的环境(如：Windows7\winxp和Linux系统)中编译、部署等。

当我们使用多台服务器时，并且配置了tomcat或jboss集群服务，可通过jenkins的节点配置，将jenkins项目发布在不同服务器上（分布jenkins工作空间，部署项目到不同服务器的tomcat或jboss），这就形成了jenkins的分布式。节点服务器不需要安装jenkins（只需要运行一个slave节点服务），构建事件的分发由master端（jenkins主服务）来执行。

__注意：__ 如果节点主机上不存在JDK，Jenkins会去自动下载，但Oracle对程序自动下载做了限制，会导致下载失败，然后一直循环这个问题。

__建议：__ 所有Linux或者Windows机器的环境路径统一(如：JDK、Maven)，安装位置和jenkins所在服务器的JDK和maven必须一致，也就是说jenkins所在服务器和各个节点服务器中的JDK和Maven目录和文件名都是一样的。以便于管理、不容易出现问题。


#### 节点管理

##### １、新建节点

![](/img/post-publish/re1.png)

![](/img/post-publish/re3.png)

##### ２、配置

![](/img/post-publish/re2.png)

##### ３、下载 安装节点服务

![](/img/post-publish/re5.png)

--点击Launch，下载文件为slave-agent.jnlp

![](/img/post-publish/re10.png)

--将slave-agent.jnlp文件复制到远程服务器的远程工作目录D：\jenkins9下

--双击运行slave-agent.jnlp，如果如法运行，在cmd命令中输入Javaws D:\jenkins9\slave-agent.jnlp

--运行过程如下所示：

![](/img/post-publish/re4.png)

--点击运行：

![](/img/post-publish/re6.png)

--显示Connected，即表示此节点创建成功。

##### ４、将这个节点加入服务

　　上面的窗口关闭或者电脑重启后，这个节点也就关闭了，所以最好把这个节点加入window服务。    　点击窗口的file菜单，点击Install as a service,完成

![](/img/post-publish/re8.png)

成功示例：（红框所示）　

![](/img/post-publish/re9.png)


## 自制PHP站点,满足更加复杂的流程

由于 Jenkins 只有一次 Build对应一个 Job，很难满足其他复杂的任务环境，比如一次 Build不是连续的，在龙之谷手游打补丁流程中， 先要合线，计算本次变更的更新的文件列表，然后停下来等待相应的主管确认更新无误之后，继续执行第二步，生成相应的 ab文件，上传到测试服务器，job 再次停下来，先在测试服验证通过之后，在上传到正式服，提升版本号。可能我中间还需要回退操作，清理中间环境。

龙之谷使用 php 语言建立了一个内网 server。 用 mysql数据库记录每个人的操作记录和打包相关的日志。

主界面效果图如下：

![](/img/post-publish/post-jenkins5.jpg)

日志效果图如下：

![](/img/post-publish/post-jenkins6.jpg)

php 调用 shell_exec函数来调用 shell, 在实际部署的时候请记得保证用户的权限，php mac 下默认是以_www用户执行的。

![](/img/post-publish/post-jenkins7.jpg)

## 结语

使用 web 方式来打包是相当便利的。任何人员都能很快的上手，基本上不需要给运维人员培训，程序员也可以省下更多的精力，来做游戏本省的开发。而且web 的方式也不局限于平台的限制，Windows、Mac、手机上都可以随时随地的Do Job。


__参考:__

[Jenkins的分布式构建及部署——节点][i5]
[Jenkins 官方网站][i6]
[jenkins分布式配置方式][i7]


[i1]: http://appleinsider.com/articles/08/10/03/latest_iphone_software_supports_full_screen_web_apps.html
[i2]: http://docs.groovy-lang.org/latest/html/api/groovy/util/GroovyScriptEngine.html
[i3]: https://www.jianshu.com/p/dc6f3fea7aa9
[i4]: https://github.com/huailiang/batch_build
[i5]: https://www.linuxidc.com/Linux/2015-05/116903.htm
[i6]: https://jenkins.io
[i7]: https://www.cnblogs.com/benben-wu/p/11713295.html