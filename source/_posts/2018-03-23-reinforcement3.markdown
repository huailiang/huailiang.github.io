---
layout:     post
title:      "强化学习-游戏AI Trainning (三)"
date:       2018-03-23 03:00:00
author:     "Huailiang"
tags:
    - 人工智能
    - Unity
---


> 前两节我们学会了利用q_learning来做游戏强化学习，并能提取出来再外部训练，下面一节我们继续深入学习使用DQN神经网络来训练我们的模型。


完成本节内容，你需要本地有如下环境：
- Python
- Pandas
- Numpy
- matplotlib（可选）
- Tensorflow
- Jupyter notebook(可选)

### DeepQNetwork

Deep Q Network 的简称叫 DQN, 是将 Q learning 的优势 和 Neural networks 结合了. 如果我们使用 tabular Q learning, 对于每一个 state, action 我们都需要存放在一张 q_table 的表中. 如果像显示生活中, 情况可就比那个迷宫的状况复杂多了, 我们有千千万万个 state, 如果将这千万个 state 的值都放在表中, 受限于我们计算机硬件, 这样从表中获取数据, 更新数据是没有效率的. 这就是 DQN 产生的原因了. 我们可以使用神经网络来 估算 这个 state 的值, 这样就不需要一张表了。

为了使用 Tensorflow 来实现 DQN, 比较推荐的方式是搭建两个神经网络, target_net 用于预测 q_target 值, 他不会及时更新参数. eval_net 用于预测 q_eval, 这个神经网络拥有最新的神经网络参数. 不过这两个神经网络结构是完全一样的, 只是里面的参数不一样。最终运行的Graph在tensorboard上可视化的结果如下图所示：

![](/img/post-reinforcement/re12.jpg)


### 项目设置

本节所有的代码都上传到[github][i1],需要联系的同学可以到github下载到本地练习。


训练的时候你需要将Unity导出mac或者windows的安装包，注意安装包需导出到Python目录之下。

Python的main.py需要做如下设置, from的模块选择的是dqn_environment，而不是environment：

![](/img/post-reinforcement/re13.jpg)


如果你安装了jupyter notebook的话，在terminal,cd到python所在的目录,，然后输入：

{% highlight bash %}
jupyter notebook
{% endhighlight %}
之后你可以在notebook里选择main.ipynb，进入主页：

![](/img/post-reinforcement/re14.jpg)

选择cell,Run就可以了。


eval_net用来训练模型，他的输入端是agent的状态值（state),输出的是得来的action对应的不同状态的数组，我们根据最大的q值选取相应的action

{% highlight python %}
def choose_action(self, observation):
    # print observation
    observation = observation[np.newaxis]

    if np.random.uniform() < self.epsilon:
        # forward feed the observation and get q value for every actions
        actions_value = self.sess.run(self.q_eval, feed_dict={self.s: observation})
        action = np.argmax(actions_value)
    else:
        action = np.random.randint(0, self.n_actions)

{% endhighlight %}

更新memory，在learn的过程中，我们每步我们都会在q_eval的memory储存信息，只是五步同步一次到q_target。实际运行的时候，在替换q_target之后，小鸟的智能明显提高了。


{% highlight python %}
def _to_learn(self,j):
     state_ = j["state_"]
     state  = j["state"]
     action = j["action"]
     rewd = j["rewd"]

     if action == True:
         action = 0 #"pad"
     else:
         action = 1 # "stay"

     state=self.TransBrainState(state)
     state_=self.TransBrainState(state_)
     self.RL.store_transition(state,action,rewd,state_)
     if self.step > 20 and self.step % 5 == 0 :
         self.RL.learn()
     self.step=self.step+1
{% endhighlight %}

而在q_target神经网络的输入端，就是之前跟q_learning一样，包含如下信息：

- state   当前agent的状态
- state_  下一步agent的状态
- reward  当前agent采取动作获的奖励
- action  当前agent采取的动作

我们使用的神经网络输出得到的实际值和预估值做平方差再求均值来计算损失函数。

{% highlight python %}
说明：
tf.squared_difference(x,y,name=None)

功能：计算(x-y)(x-y)。
输入：x为张量，可以为`half`,`float32`, `float64`类型。
{% endhighlight %}


{% highlight python %}

# 计算损失函数  
with tf.variable_scope('loss'):
    self.loss = tf.reduce_mean(tf.squared_difference(self.q_target, self.q_eval))

# 根据损失函数训练模型  
with tf.variable_scope('train'):
    self._train_op = tf.train.RMSPropOptimizer(self.lr).minimize(self.loss)

{% endhighlight %}

我们可以在若干步之后，打印出loss的变化，实现如下：

{% highlight python %}
def plot_cost(self):
     import matplotlib.pyplot as plt
     plt.plot(np.arange(len(self.cost_his)), self.cost_his)
     plt.ylabel('Cost')
     plt.xlabel('training steps')
     plt.show()
{% endhighlight %}


### 结果

我们在tensorboard里观察数据的变化：

在terminal中cd 到对应的python目录，如果游戏已经运行了一段时间了，你可以看到本地多了一个logs的目录，这个本地生成对应的tensorboard的日志文件。
然后在终端界面输入：
{% highlight bash %}
tensorboard --logdir=logs/
{% endhighlight %}

接着在浏览器里输入http://localhost:6006/ 就可以看到我们设置的变量和一些值得变化了：

如传入nn的一些参数可以在Text一栏可以观察到：

![](/img/post-reinforcement/re15.jpg)

比如loss损失函数的变化：

![](/img/post-reinforcement/re16.jpg)



[i1]:https://github.com/huailiang/bird
[i2]:https://huailiang.github.io/2018/03/19/reinforcement/
[i3]:https://github.com/huailiang/ConnectPy
