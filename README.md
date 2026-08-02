# Blog · 博客

<https://axiomofchoice-hjt.github.io/>

English: <https://axiomofchoice-hjt.github.io/en/>

[English](#english) | [中文](#中文)

---

## English

Personal blog built with VuePress + Vdoing theme.

Topics: C++, HPC, Algorithm.

### Dev

```bash
yarn dev      # Dev server on port 8089
yarn build    # Static build → docs/.vuepress/dist
yarn lint     # Lint all Markdown files
```

Note: build requires legacy OpenSSL provider:

```bash
NODE_OPTIONS="--openssl-legacy-provider" yarn build
```

---

## 中文

使用 VuePress + Vdoing 主题搭建的个人博客。

主要分享 C++、HPC、Algorithm 知识。

### 本地开发

```bash
yarn dev      # 开发服务器，端口 8089
yarn build    # 静态构建 → docs/.vuepress/dist
yarn lint     # 检查所有 Markdown 文件
```

注意：构建需要 legacy OpenSSL provider：

```bash
NODE_OPTIONS="--openssl-legacy-provider" yarn build
```
