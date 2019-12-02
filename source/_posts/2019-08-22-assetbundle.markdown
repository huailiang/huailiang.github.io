---
layout:     post
title:      "Assetbundle 加密"
date:       2019-08-22 03:00:00
author:     "Huailiang"
tags:
    - Unity
---


> AssetBundle加密的主要目的是防止如AssetStudio(UnityStudio)，DevXUnityUnpacker，AssetBundleExtractor等等常用的Unity资源破解工具直接对天鹅座的资源进行破解和提取
主要方法是通过修改源代码对AB的文件头的读写进行修改，让工具无法得到有效信息

## AssetBundle格式

AssetBundle文件的layout为：header [ blocks directory ] [ data ]
其中Header格式为：（每个Unity版本格式可能不同）

![](/img/post-unity/ab1.png)


二进制解析下来，如下表所示:

<table border="1" style="font-size:12px">
 <tr>
    <th width="9%">类型</th>
    <th>标记</th>
    <th>HEAD</th>
    <th width="20%">二进制</th>
    <th  width="11%">字符串</th>
</tr>
<tr>
    <td>string</td>
    <td>signature</td>
    <td>AB文件头标识</td>
    <td>556e 6974 7946 5300</td>
    <td>UnityFS</td>
</tr>            
<tr>
    <td>unt32</td>
    <td>version</td>
    <td>Archive version</td>
    <td>0000 0006</td>
    <td>6</td>
</tr>   
<tr>
    <td>string</td>
    <td>bundleVersion</td>
    <td>bundleVersion</td>
    <td>352e 782e 7800</td>
    <td>5.x.x</td>
</tr>   
<tr>
    <td>string</td>
    <td>minimumRevision</td>
    <td>AB所需最低版本</td>
    <td>352e 362e 3570 3400</td>
    <td>5.6.5p4</td>
</tr>   
<tr>
    <td>uint64</td>
    <td>size</td>
    <td>整个AB的大小</td>
    <td>0000 0000 0000 0790</td>
    <td>1936</td>
</tr>   
<tr>
    <td>uint32</td>
    <td>compressedBlocksInfoSize</td>
    <td>压缩后的BlockInfo大小</td>
    <td>0000 0041</td>
    <td>65</td>
</tr>   
<tr>
    <td>uint32</td>
    <td>uncompressedBlocksInfoSize</td>
    <td>压缩前的BlockInfo大小 </td>
    <td>0000 005B</td>
    <td>91</td>
</tr>   
<tr>
    <td>uint32 </td>
    <td>flag</td>
    <td>AB生成的一些标记</td>
    <td>00000043</td>
    <td></td>
</tr>   
</table>



后面则是compressedBlockInfoSize大小的Block和DirectoryInfo，


其中BlockInfo为Archive中数据块的信息列表，包括每个数据块的大小、压缩方式、压缩后的大小等，

DirectoryInfo则是文件系统相关的信息，如文件名、在整个Archive中的offset等信息，

这两个部分在Build时会放在一起，做一次Lz4HC压缩后放到header的后面。
 
针对这个格式，在做加密时，考虑在不影响AB读取效率的情况下只对header和Block&DirectoryInfo做了简单的混淆，包括：

· 修改header中的标识
· 修改header中字段的顺序
· 对size等字段做位操作，交换不同位的数据
· 对压缩过的Block和DirectoryInfo数据块做一些异或操作等
· 其他破坏可读性的方法自由发挥

通过这些方法，基本上可以让破解工具没办法读取破解所需要的信息，达到简单加密的效果。


### 运行加载

Unity5.3之后， 大致了提供2种方式读取AB的方式， 即LoadFromMemory和LoadFromFile， 区分同步和异步两种方式。

针对上述处理方式， 可以使用IO读取bytes到内存中， 解密之后然后使用AssetBundle.LoadFromMemory(bytes)即可拿到Bundle文件了。

从官方的解释中，我们可以看到AssetBundle.LoadFromMemory(Async)的使用成本非常高昂，不被推荐是自然而然的事情。但是，有没有更高效便捷的方式去对AssetBundle进行加密处理，防止被小白用户利用AssetStudio之类的工具轻易地提取到AssetBundle的资源呢？



在查看Unity API的时候发现LoadFromFile末尾有一个offset参数，那么这个参数有什么用呢？是否可以起到防止AssetBundle资源直接被AssetStudio提取呢？先看官方文档的接口说明：

```csharp
public static AssetBundle LoadFromFile(string path, uint crc, long offset);

Parameters

path: Path of the file on disk.
crc:  An optional CRC-32 checksum of the uncompressed content. If this is non-zero, then the content will be compared against the checksum before loading it, and give an error if it does not match.
offset:	An optional byte offset. This value specifies where to start reading the AssetBundle from.


Returns
AssetBundle Loaded AssetBundle object or null if failed.

Description
Synchronously loads an AssetBundle from a file on disk.

The function supports bundles of any compression type. In case of lzma compression, the data will be decompressed to the memory. Uncompressed and chunk-compressed bundles can be read directly from disk.
Compared to LoadFromFileAsync, this version is synchronous and will not return until it is done creating the AssetBundle object.
This is the fastest way to load an AssetBundle.
```

首先，我们需将XAsset生成好的AssetBundle文件内容进行偏移处理，待Unity打包完成后遍历所有AssetBundle文件，并对文件添加offset后进行覆盖，代码如下：

```cs
foreach (string bundleName in bundleNames)
{
    string filepath = outputPath + "/" + bundleName;
    // 利用 hashcode 做偏移 
    string hashcode = manifest.GetAssetBundleHash(bundleName).ToString();
    ulong offset = Utility.GetOffset(hashcode);
    if ( offset > 0)
    {
        byte[] filedata = File.ReadAllBytes(filepath);
        int filelen = ((int)offset + filedata.Length);
        byte[] buffer = new byte[filelen];
        copyHead(filedata, buffer, (uint)offset);
        copyTo(filedata, buffer, (uint)offset);
        FileStream fs = File.OpenWrite(filepath);
        fs.Write(buffer, 0, filelen);
        fs.Close();
        offsets  += filepath + " offset:" + offset + "\n";
    }
    WriteItem(stream, bundleName, filepath, hashcode);
}
```
然后，我们再进行加载测试，我们分别使用offset参数加载AssetBundle，和模拟解密文件后从内存中加载AssetBundle然后读取其中的一个Texture用于显示.

使用offset参数加载之前:

![使用offset参数加载之前](/img/post-unity/ab2.jpeg)


使用offset参数加载之后:

![使用offset参数加载之后](/img/post-unity/ab3.jpeg)


由于我们对AssetBundle的资源进行了偏移，势必在理论上，AssetStudio无法直接解析出我们Unity工程中的AssetBundle，接下来我们再来看下，我们的理论是否经得起实践的考验。

经测试，没加offset的时候可以轻易地用AssetStudio预览AssetBundle中的资源，请参考下图（因为用的是公司项目的资源所以需要打码处理）

![](/img/post-unity/ab4.jpeg)


带offset的资源，发现和我们的理论推测结果一致，请参考：

![](/img/post-unity/ab5.jpeg)


在测试过程中发现，有些老版本的AssetStudio，在解析带offest的资源的时候甚至会直接奔溃。

如果针对单个bundle的话，偏移值不建议设置的过大，因为偏移有对应的内存开销。 可以将多个资源组合打到一个bundle中去，再在之基础上定义一个header, header里记录资源个数和每个资源的偏移信息，这样获取单个资源就通过偏移值来就可以了， 同时也打破既有的bundle编码格式，别人也不好破解了。 

其实，对于资源加密，我们大多数时候能做到的是防小白不防专家，不管你是采用简单的或者复杂的，在反编译高手手里都有点苍白，我亲眼所见一个大佬用IDA把人家的通信加密算法反出来了，所以这里就不做更深入的分析了。