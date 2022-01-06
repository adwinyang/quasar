---
title: 部署一个SPA
desc: 如何发布由Quasar CLI构建的单页应用程序。
---

存在许多允许轻松部署应用程序的服务。
要列出所有这些服务是不可能的，所以我们将专注于一般的部署过程和一些常见服务的具体细节。

如果你最喜欢的部署工具不见了，请随时在GitHub上创建一个拉动请求，将其添加到列表中。

## 一般部署

部署Quasar SPA的第一步总是建立一个生产就绪的文件捆绑包，它摆脱了开发声明并减少了你的源代码。

使用Quasar CLI的以下命令来生成这样一个构建。

```bash
$ quasar build
```

这个命令将在SPA模式下构建你的项目，并将你的生产准备包输出到一个新创建的文件夹`/dist/spa`。

为了提供你的生产文件，*必须*使用一个Web服务器，所以要通过http(s)://协议提供服务。简单地从你的浏览器中打开`index.html`文件是不行的，因为它使用的是file://协议。

常用的网络服务器有[nginx](https://www.nginx.com/)、[Caddy](https://caddyserver.com/)、[Apache](https://httpd.apache.org/)、[Express](https://expressjs.com/)；但你应该能够使用任何你想要的网络服务器。

网络服务器不需要特别的设置(除非你在`quasar.conf.js`中用Vue Router的 "历史 "模式构建)。主要的要求是能够为目录中的静态文件提供服务，所以请查阅你的网络服务器的文档，了解如何设置静态文件服务。

nginx的配置示例可能是这样的。

```
server {
    listen 80 http2;
    server_name quasar.myapp.com;

    root /home/user/quasar.myapp.com/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/quasar.myapp.com-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## 重要的主机配置

重要的是，你不允许浏览器缓存`index.html`文件。因为不然的话，这个文件或你的应用程序的更新可能会被那些从缓存中加载index.html的浏览器漏掉。

这就是为什么你必须始终确保添加`"Cache-Control": "no-cache"`到`index.html`文件的标题中。

以Google Firebase为例，你可以在`firebase.json`配置中添加以下内容。

```json
{
  "hosting": {
    "headers": [
      {
        "source": "/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|js|css|eot|otf|ttf|ttc|woff|woff2|font.css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=604800"
          }
        ]
      }
    ]
  }
}
```

## 使用Vercel进行部署
使用[Vercel](https://vercel.com/)部署你的Quasar应用程序真的很容易。
你所要做的就是下载[vercel-cli](https://vercel.com/download#now-cli)并通过运行登录。
```bash
$ vercel login
```

然后使用 "一般部署 "部分描述的步骤，继续构建你的Quasar应用程序。

构建完成后，改变目录到你的部署根目录(例如：`/dist/spa`)并运行。
```bash
# from /dist/spa (or your distDir)
$ vercel
```

Vercel CLI现在应该显示有关你的部署的信息，如URL。就这样了。你就完成了。

### Vercel配置提示
你应该考虑向你的项目添加一些额外的配置。

* 由于Vercel希望定义_build_脚本，你可以在`package.json`中添加以下脚本。
```json
  {
    ..
    "scripts": {
      ...
      "build": "quasar build",
      "deploy": "vercel"
    }
  }
```

* 由于Vercel期望构建结果在`/public`目录下，而_Quasar_默认将其放在`/dist/spa`目录下。
考虑相应地更新`quasar.conf.js`。
```js
module.exports = function (ctx) {
  return {
    ...
    build: {
      ...
      distDir: ctx.mode.spa ? 'public' : null,
    }
```

* 为了在部署的应用程序中支持SPA路由，考虑在你的根文件夹中添加`vercel.json`文件。
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```
## 使用Heroku进行部署

不幸的是，Heroku并不支持开箱即用的静态网站。但是不用担心，我们只需要在我们的项目中添加一个HTTP服务器，这样Heroku就可以为我们的Quasar应用提供服务。

在这个示例中，我们将使用[Express](https://expressjs.com/)来创建一个Heroku可以使用的最小服务器。

首先，我们需要为我们的项目安装必要的依赖项。
```bash
$ yarn add express serve-static connect-history-api-fallback
```

现在我们已经安装了所需的依赖项，我们可以添加我们的服务器。在你项目的根目录下创建一个名为`server.js`的文件。
```js
const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000

const app = express()

app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))
app.listen(port)
```

Heroku假定有一组npm脚本可用，所以我们必须改变我们的`package.json`，在`script`部分添加以下内容。

```js
"build": "quasar build",
"start": "node server.js",
"heroku-postbuild": "yarn && yarn build"
```

现在是时候通过运行Heroku创建一个应用程序了。

```bash
$ heroku create
```

并通过以下方式部署到Heroku。

```bash
$ git init
$ heroku git:remote -a <heroku app name>

$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

对于现有的Git仓库，只需添加heroku远程。

```bash
$ heroku git:remote -a <heroku app name>
```

## 使用Surge进行部署

[Surge](https://surge.sh/)是一个流行的工具，用于托管和部署静态网站。

如果你想用Surge部署你的应用程序，你首先需要安装Surge CLI工具。

```bash
$ npm install -g surge
```

接下来，我们将使用Quasar CLI来构建我们的应用程序。

```bash
$ quasar build
```

现在我们可以通过调用Surge来部署我们的应用程序了。

```bash
$ surge dist/spa
```

现在，你的应用程序应该使用Surge成功部署。你应该能够将本指南适用于任何其他静态网站部署工具。

## 在GitHub页面上进行部署

要将Quasar应用程序部署到GitHub页面，第一步是在GitHub上创建一个特殊的仓库，名为`<用户名>.github.io`。克隆这个仓库到你的本地机器上。

接下来，你需要按照 "一般部署部分 "中的描述构建你的Quasar应用程序。这将产生一个`/dist/spa`目录。把这个文件夹的内容复制到你的克隆版本库中。

最后一步是在你的仓库中添加一个提交，并推送到GitHub。一段时间后，你应该可以在`https://<username>.github.io/`访问你的Quasar应用程序。

### 为GitHub页面添加自定义域名

请参阅[GitHub页面指南](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)，深入了解如何设置自定义域名。

### 使用push-dir自动部署到GitHub页面

手动复制所有文件到GitHub页面仓库是一项繁琐的工作。这个步骤可以通过使用 [push-dir](https://github.com/L33T-KR3W/push-dir) 包来实现自动化。

首先，用以下方式安装该软件包。

```js
$ yarn add --dev push-dir
```

然后在你的`package.json`中添加一个`deploy`脚本命令。

```json
"scripts": {
  "deploy": "push-dir --dir=dist/spa --remote=gh-pages --branch=master"
}
```

将你的GitHub Pages仓库添加为一个名为`gh-pages`的远程仓库。

```bash
$ git remote add gh-pages git@github.com:<username>/<username>.github.io.git
```

现在，你可以使用以下方法构建和部署你的应用程序。

```bash
$ quasar build
$ yarn deploy
```

这将把构建目录的内容推送到 GitHub Pages 仓库的主干分支。
