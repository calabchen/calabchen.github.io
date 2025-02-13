---
title: 在Windows中配置深度学习环境
published: 2025-02-02
description: '在Windows中配置深度学习环境'
tags:
  - Windows
  - DeepLearning
category: Ai
draft: false
---

# 流程
```mermaid
flowchart TD
    A[开始] --> B{使用 PowerShell 或 CMD}
    B --> C[安装 CUDA 11.3]
    C --> D[安装 Anaconda]
    D --> E[安装 VSCode]
    E --> F[配置 Python 虚拟环境]
    F --> G[安装 PyTorch (CUDA 11.3 版本)]
    G --> H[完成]
    style A fill:#f96,stroke:#333,stroke-width:2px
    style H fill:#f96,stroke:#333,stroke-width:2px
```

# 使用 PowerShell 或 CMD
 Windows 11默认的终端是 PowerShell，当然使用最简单的CMD也很好
 
# 安装 CUDA 11.3
如果你的电脑使用Nvidia的显卡，先在终端中查看CUDA版本
```shell
nvcc --version
```
如果返回如下：
```shell
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2021 NVIDIA Corporation
Built on Mon_May__3_19:41:42_Pacific_Daylight_Time_2021
Cuda compilation tools, release 11.3, V11.3.109
Build cuda_11.3.r11.3/compiler.29920130_0
```
那么就不用安装了，反之，在网上寻找文章学习怎么安装。

# 安装 Anaconda
对于 Anaconda，到[官网](https://www.anaconda.com/download/success)下载Windows版。
文章推荐：
[文章一](https://blog.csdn.net/qq_44000789/article/details/142214660)
[文章二](https://blog.csdn.net/Natsuago/article/details/143081283)

安装好后输入`conda -V`查看得`conda 24.9.2`，只要有版本号就是对的。

然后换源，因为不在国外，使用官方默认的源可能会有不好的网络下载体验，所以要换成国内的镜像加速源，比如清华源。

默认源：
```shell
conda config --show channels
channels:
  - https://repo.anaconda.com/pkgs/main
  - https://repo.anaconda.com/pkgs/r
```
添加清华源：
```shell
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
conda config --set show_channel_urls yes
```
会得到：
```shell
conda config --show channels
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
  - defaults
  - https://repo.anaconda.com/pkgs/main
  - https://repo.anaconda.com/pkgs/r
  - https://repo.anaconda.com/pkgs/msys2
```

# 安装VSCode
到[官网](https://code.visualstudio.com)下载适用于Windows版本的。

安装完后记得下载适用于python的插件：
```shell
Chinese (Simplified) # 简体中文
Python # 包含Python、Pylance、Python Debugger的整合包
autopep8 # 用来格式化python代码
```

# 配置 Python 虚拟环境

比如在我在vscode中创建了一个名字为`torch_cuda113_py310`的虚拟环境：
```shell
conda create --name torch_cuda113_py310 python=3.10
```
然后我在右下角的选择python解释器中选择它，重新打开一个终端，它就被激活了。

默认包：
```python
pip list
Package    Version
---------- -------
pip        25.0
setuptools 75.8.0
wheel      0.45.1
```
默认源：
```python
pip config list
```
默认返回空，换源🙏 指令如下：
```python
pip config set global.index-url='https://mirrors.aliyun.com/pypi/simple/'
```

更新一下`pip`：`pip install --upgrade pip` 或者 `python -m pip install --upgrade pip`(权限不够使用这个)

# 安装 PyTorch (CUDA 11.3 版本)
去到[官网](https://pytorch.org/get-started/locally/)
选择Stable->Mac->Pip->Python->Default，复制命令并在vscode终端激活的`torch_cuda113_py310`环境中运行：
```python
pip install torch==1.12.1+cu113 torchvision==0.13.1+cu113 torchaudio==0.12.1 --extra-index-url https://download.pytorch.org/whl/cu113
```

安装完后大概有这些包：
```shell
Package            Version
------------------ ------------
certifi            2025.1.31
charset-normalizer 3.4.1
idna               3.10
numpy              2.2.2
pillow             11.1.0
pip                25.0.1
requests           2.32.3
setuptools         75.8.0
torch              1.12.1+cu113
torchaudio         0.12.1+cu113
torchvision        0.13.1+cu113
typing_extensions  4.12.2
urllib3            2.3.0
wheel              0.45.1
```

## 测试是否成功安装
```python
import torch

# 打印 PyTorch 版本
print(f"PyTorch version: {torch.__version__}")

# 检查 CUDA 是否可用
cuda_available = torch.cuda.is_available()
print(f"CUDA available: {cuda_available}")

if cuda_available:
    # 打印 CUDA 版本
    print(f"CUDA version: {torch.version.cuda}")

    # 获取当前系统中所有可用的 GPU 数量
    num_gpus = torch.cuda.device_count()
    print(f"Number of GPUs available: {num_gpus}")

    # 获取当前默认的 CUDA 设备名称
    current_gpu_name = torch.cuda.get_device_name(0) if num_gpus > 0 else 'N/A'
    print(f"Current GPU name: {current_gpu_name}")
else:
    print("No CUDA device found.")
```
返回类似下面的是正确的
```python
PyTorch version: 1.12.1+cu113
CUDA available: True
CUDA version: 11.3
Number of GPUs available: 1
Current GPU name: NVIDIA GeForce RTX 3050 Ti Laptop GPU
```


# 附录
## 硬件配置

| 硬件组件   | 配置详情                                      |
| ------ | ---------------------------------------- |
| 设备型号   | Asus Zenbook Pro 16 2022                      |
| 芯片     | 12th Gen Intel(R) Core(TM) i7-12700H @ 2.30 GHz |
| 内存     | 16.0 GB                        |
| 存储空间   | 512 GB                                       |
| 显卡芯片   | NVIDIA GeForce RTX 3050 Ti                    |
| 显存容量   | 4 GB                                         |
| 操作系统版本 | Windows 11 专业版, 21H2, 版本号 22000.2538       |

## 对于conda的选择
请参考[这篇文章](https://docs.anaconda.net.cn/distro-or-miniconda/)