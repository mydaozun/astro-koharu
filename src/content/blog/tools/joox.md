---
title: unblockneteasemusic设置教程
link: joox
catalog: true
date: 2026-02-12 09:55:00
math: true
quiz: true
description: 
tags:
  - unblockneteasemusic
  - 教程
categories:
  - 工具
---
# unblockneteasemusic设置教程

## 如何在中国大陆享受 JOOX 音乐服务
![X-Forwarded-For](https://tc.52cbg.cn/file/AgACAgUAAyEGAASgd9z5AAID_GmNMG4-czKaAv_WO9JpoM2YU0ohAAISDmsbm-JoVHygHzBp-7ckAQADAgADdwADOgQ.png)

X-Forwarded-For 是一个 HTTP 扩展头部，主要是为了让 Web 服务器获取访问用户的真实 IP 地址（其实这个真实未必是真实的，后面会说到）。那为什么 Web 服务器只有通过 X-Forwarded-For 头才能获取真实的 IP？这里用 PHP 语言来说明，不明白原理的开发者为了获取客户 IP，会使用 $_SERVER[‘REMOTE_ADDR’] 变量，这个服务器变量表示和 Web 服务器握手的 IP 是什么（这个不能伪造）。但是很多用户都通过代理来访问服务器的，那么假如使用该全局变量，PHP获取到的 IP 就是代理服务器的 IP（不是用户的）。可能很多人看的晕乎乎的，那么看看一个请求可能经过的路径：客户端=>（正向代理=>透明代理=>服务器反向代理=>）Web服务器。其中正向代理、透明代理、服务器反向代理这三个环节并不一定存在。什么是正向代理呢，很多企业会在自己的出口网关上设置代理（主要是为了加速和节省流量）。透明代理可能是用户自己设置的代理（比如为了FQ，这样也绕开了公司的正向代理）。服务器反向代理是部署在 Web 服务器前面的，主要原因是为了负载均衡和安全考虑。现在假设几种情况：假如客户端直接连接 Web 服务器（假设 Web 服务器有公网地址），则 $_SERVER[‘REMOTE_ADDR’] 获取到的是客户端的真实 IP 。假设 Web 服务器前部署了反向代理（比如 Nginx），则 $_SERVER[‘REMOTE_ADDR’] 获取到的是反向代理设备的 IP（Nginx）。假设客户端通过正向代理直接连接 Web 服务器（假设 Web 服务器有公网地址），则 $_SERVER[‘REMOTE_ADDR’] 获取到的正向代理设备的 IP 。其实这里的知识点很多，记住一点就行了，$_SERVER[‘REMOTE_ADDR’] 获取到的 IP 是 Web 服务器 TCP 连接的 IP（这个不能伪造，一般 Web 服务器也不会修改这个头）。这个方法也能用于一些国外其他网站，但对于要求比较严格的，大家只能老老实实使用代理咯，好了。
登录[joox](http://joox.com/hk)，点击“登录”，输入手机号和验证码，登录成功后，即可享受 JOOX 音乐服务。
打开浏览器开发者工具（F12），选择“网络”选项卡，刷新页面，在网络请求中搜索“song”，点击该请求，在“标头”中找到“Cookie”字段，复制该字段的值，即可获取到joox的cookie。
![JOOX cookie](https://tc.52cbg.cn/file/AgACAgUAAyEGAASgd9z5AAID_mmNOksOi4vDzsJrpNSx7ZrhtgTvAAIVDmsbm-JoVBvd7_07UMarAQADAgADdwADOgQ.png)

[中国香港IP](https://www.hyhdt.com/countryip_view.aspx?coun=%E4%B8%AD%E5%9B%BD%E9%A6%99%E6%B8%AF&type=1)
[google cloud](https://docs.cloud.google.com/datastream/docs/ip-allowlists-and-regions?hl=zh-cn)

## 如何查找qq音乐的cookie
访问[qq音乐](https://music.qq.com/)，打开浏览器开发者工具（F12），选择“网络”选项卡，刷新页面，在网络请求中搜索“song”，点击该请求，在“标头”中找到“Cookie”字段，复制该字段的值，即可获取到qq音乐的cookie。
![QQ音乐cookie](https://tc.52cbg.cn/file/AgACAgUAAyEGAASgd9z5AAID_WmNNwQAARad_yXiR78c1-NsdQ3D8wACEw5rG5viaFS-HE6_rvgJPAEAAwIAA3cAAzoE.png)
