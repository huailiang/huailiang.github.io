---
layout:     post
title:      "TensorFlow-神经网络"
date:       2018-03-09 06:00:00
author:     "Huailiang"
tags:
    - Python
    - 人工智能
    - Tensorflow
---


> 人工神经网络是由大量处理单元互联组成的非线性、自适应信息处理系统。它是在现代神经科学研究成果的基础上提出的，试图通过模拟大脑神经网络处理、记忆信息的方式进行信息处理。

上来先说一个例子。城里正在举办一年一度的游戏动漫展览，小明拿不定主意，周末要不要去参观。

他决定考虑三个因素。
- 天气：周末是否晴天？
- 同伴：能否找到人一起去？
- 价格：门票是否可承受？

![](/img/post-tf/tf20.jpg)

现实中，各种因素很少具有同等重要性：某些因素是决定性因素，另一些因素是次要因素。因此，可以给这些因素指定权重（W），代表它们不同的重要性。

权重（W）和阈值(b)
现实中，各种因素很少具有同等重要性：某些因素是决定性因素，另一些因素是次要因素。因此，可以给这些因素指定权重（weight），代表它们不同的重要性。

- 天气：权重为8
- 同伴：权重为4
- 价格：权重为4

这时，还需要指定一个阈值（threshold）。如果总和大于阈值，感知器输出1，否则输出0。假定阈值为8，那么 12 > 8，小明决定去参观。阈值的高低代表了意愿的强烈，阈值越低就表示越想去，越高就越不想去.

### 决策模型

单个的感知器构成了一个简单的决策模型，已经可以拿来用了。真实世界中，实际的决策模型则要复杂得多，是由多个感知器组成的多层网络。

外部因素 x1、x2、x3 写成矢量 <x1, x2, x3>，简写为 x

权重 w1、w2、w3 也写成矢量 (w1, w2, w3)，简写为 w

定义运算 w⋅x = ∑ wx，即 w 和 x 的点运算，等于因素与权重的乘积之和
定义 b 等于负的阈值 b = -threshold

感知器模型就变成了下面这样:

![](/img/post-tf/tf21.png)

### 神经网络的运作过程

一个神经网络的搭建，需要满足三个条件。

- 输入和输出
- 权重（w）和阈值（b）
- 多层感知器的结构

![](/img/post-tf/timg.jpeg)

其中，最困难的部分就是确定权重（w）和阈值（b）。目前为止，这两个值都是主观给出的，但现实中很难估计它们的值，必需有一种方法，可以找出答案。
这种方法就是试错法。其他参数都不变，w（或b）的微小变动，记作Δw（或Δb），然后观察输出有什么变化。不断重复这个过程，直至得到对应最精确输出的那组w和b，就是我们要的值。这个过程称为模型的训练。

### Tensorflow

关于 TensorFlow 的基础知识的学习，读者可以参考上一节：[https://huailiang.github.io/2018/03/08/tensor/][i1]

<b>求权重和阈值</b>


当然 Google 给了我们一套 api，通过大量的计算，能够得出正确的值。

- 梯度下降算法

  梯度下降算法是用的最普遍的优化算法，不过梯度下降算法需要用到全部的样本，训练速度比较慢，但是迭代到一定次数最终能够找到最优解。

  tf.train.GradientDescentOptimizer（0.01）

  这个类是实现梯度下降算法的优化器，参数learning_rate是要使用的学习率 。详细点击官方[API][I2]。

- 选择 optimizer 使 loss 达到最小

  optimizer.minimize(loss)


我们定义 train 训练模型使损失降到最低，如此反复的训练，求得 权重（w）和阈值(b)的最优解。

就不过多解释了，代码贴出来了：

{% highlight python %}
# -*- coding:utf-8 -*-
import tensorflow as tf
import numpy as np
from board import Board


# 变量
W = tf.Variable([1.1],tf.float32)
b = tf.Variable([-2.1],tf.float32)
# placeholder
x=tf.placeholder(tf.float32)
y=tf.placeholder(tf.float32)

x_train = [1,2,3,4,5,6.1]
y_train = [1,3,5,7,9,11]
feed_dict={x:x_train,y:y_train}

linear_mode=W*x+b
square_details = tf.square(linear_mode - y)
loss = tf.reduce_sum(square_details)

optimizer=tf.train.GradientDescentOptimizer(0.01)
train = optimizer.minimize(loss)

tf.summary.scalar("loss",loss)
merged = tf.summary.merge_all()

with tf.Session() as sess:
   summary_writer = tf.summary.FileWriter( "output/",sess.graph)
   init = tf.global_variables_initializer()
   sess.run(init)

   print("real vale: {}".format(sess.run(linear_mode,feed_dict)))
   print("curr loss: {}".format(sess.run(loss,feed_dict)))

   for i in range(1000):
       sess.run(train,feed_dict)
       if i % 100 == 0:
           cc,res= sess.run([loss,merged],feed_dict)
           summary_writer.add_summary(res,i)
           print "train step(%s) loss:%s"%(i,cc)

   # Evaluate training accuracy
   curr_W,curr_b,currr_loss = sess.run([W,b,loss],feed_dict)
   print("W: %s,b: %s,loss: %s"%(curr_W,curr_b,currr_loss))
   print(sess.run([W,b]))
{% endhighlight %}


经过1000次训练，我们可以从下图的运行结果可以发现 loss 越来越小了，说明我们的模型值越来越精准。准确率接近100%
最终我们训练出来的模型 W:2.0000005, b:-1.0000029 loss:1.3187673e-11
从 loss 看，训练出来的模型这已经很精准了。

其实作者给出的值(x_train = [1,2,3,4,5,6], y_train = [1,3,5,7,9,11]
 )的设定函数就是 y=2x-1 (w=2,b=-1)

 对我们程序开始给的初始化的值 w=1.1 b=-2.1，是非常不靠谱的，我们看到 loss 尽然是122这么高。通过1000次训练，得到了相当大的矫正。

我想训练出来的模型准确率之所以这么高，一是因为我们给的训练数据比较少，而是因为训练数据给的很理想。
现实生活中的数据可比这复杂多了，当然我们也有更好的模型来训练它，这是后话了。



{% highlight bash %}
运行结果：
real vale: [-0.9999999   0.10000014  1.2000003   2.3000002   3.4         4.61      ]
curr loss: 121.132095337
train step(0) loss:107.545296
train step(100) loss:0.0296359
train step(200) loss:0.01862564
train step(300) loss:0.018511334
train step(400) loss:0.018509919
train step(500) loss:0.018509876
train step(600) loss:0.018509895
train step(700) loss:0.018509895
train step(800) loss:0.018509895
train step(900) loss:0.018509895
W: [1.97131],b: [-0.93244034],loss: 0.018509895
[array([1.97131], dtype=float32), array([-0.93244034], dtype=float32)]

{% endhighlight %}


从 tensorboard 上来看，loss 矫正的速度还是挺快的，大概在第200步之后，模型就稳定了。

![](/img/post-tf/tf22.png)



通过上面的案例，我们再回到文章开篇提出的问题。加入我们知道小明数次选择，假使小明我们的考虑的因素是固定不变的而且外部环境没有发生变化，下次要不要出门，我们就能求出概率啦。哈哈。。。


[i1]:https://huailiang.github.io/2018/03/08/tensor/
[i2]:https://tensorflow.google.cn/api_docs/python/tf/train/GradientDescentOptimizer
