---
title: 向公众开放你的开发服务器
desc: 如何向互联网上的任何人提供对你的开发服务器的临时访问。
---
在某些时候，你可能想向别人展示你所做的项目。幸运的是，有几个很好的工具可以完成这个任务，[localhost.run](https://localhost.run/)和[Ngrok](https://ngrok.com/)。两者都创建了一个通往你的开发服务器的隧道，并且(默认情况下)在各自的服务器上自动生成一个互联网地址，以提供给你的客户或任何你想展示你的作品的人。

::: warning
向公众开放你的开发服务器会带来安全风险。在使用这样的工具时要绝对谨慎。

当你完成了你的演示或测试，确保停止 localhost.run 或 ngrok。这将防止通过它们对你的计算机进行任何不必要的访问。
:::

## 使用localhost.run(最简单的)。

1. 假设你有一个SSH shell，你只需要发出以下命令(替换你的详细资料)。
```bash
$ ssh -R 80:localhost:8080 ssh.localhost.run
# In case your development server doesn't run on port 8080 you need to change the number to the correct port
```

2. 就这样，你现在将有一个基于你当前系统用户名的随机子域，像这样分配给你。
```bash
$ ssh -R 80:localhost:8080 ssh.localhost.run
Connect to http://fakeusername-random4chars.localhost.run or https://fakeusername-random4chars.localhost.run
Press ctrl-c to quit.
```

目前不可能申请你自己的子域。

## 使用Ngrok

1. 下载并安装ngrok [here](https://ngrok.com/download)。
(请注意，ngrok的可执行文件不需要放在或从你的cordova文件夹内运行。当在mac上时，最好把ngrok执行文件放在`/usr/local/bin`内，以便能够全局运行)。

2. 启动你的开发服务器
```bash
$ quasar dev
```

3. 创建你的ngrok连接
```bash
$ ngrok http 8080
# In case your development server doesn't run on port 8080 you need to change the number to the correct port
```

4.ngrok启动时在命令行中显示网址。
```bash
Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://92832de0.ngrok.io -> localhost:8080
Forwarding                    https://92832de0.ngrok.io -> localhost:8080

Connections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```
请小心，因为 "转发 "的URL将被任何人访问，直到这个连接再次被关闭。

### 检查流量

当运行ngrok时，访问`http://localhost:4040`以检查流量。

这个工具允许自定义域名、密码保护和更多。如果你需要进一步的帮助，请参考[ngrok docs](https://ngrok.com/docs)获取更多信息。
