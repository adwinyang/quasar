---
title: 上传者
desc: QUploader Vue组件是一种让用户向后端服务器上传文件的方式。
keys: QUploader
related:
  - /vue-components/file-picker
---

 Quasar 为你提供了一种通过QUploader组件上传文件的方法。

::: tip
如果你想要的只是一个输入文件，你可以考虑使用[QFile](/vue-components/file-picker)拾取器组件来代替。
:::

## QUploader API

<doc-api file="QUploader" />

## 使用方法

::: warning
QUploader需要一个后端服务器来接收文件。下面的示例将不会实际上传。
:::

::: tip
QUploader符合 "拖放 "原则。
:::

::: warning
当使用vee-validate时，你必须重新命名vee-validate的 "fieldBagName "配置，以便q-uploader能够工作。
:::

### 设计

<doc-example title="基本" file="QUploader/Basic" />

<doc-example title="黑暗" file="QUploader/Dark" />

### 上传多个文件

默认情况下，多个文件将被单独上传(每个文件一个线程)。如果你想在一个线程中上传所有文件，请使用`batch'属性(下面示例中的第二个QUploader)。

<doc-example title="多个" file="QUploader/Multiple" />

### 限制上传

<doc-example title="基本限制" file="QUploader/RestrictionBasic" />

::: tip
在上面的示例中，我们使用`accept`属性。它的值必须是一个逗号分隔的唯一文件类型指定器的列表。映射到本地输入type=file元素的'accept'属性。[更多信息](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)。
:::

::: warning
建议 "接受 "属性的格式为"<媒介型>/<扩展型>"。例如："image/png", "image/png". QUploader在后台使用`<input type="file">`，它完全依赖主机浏览器来触发文件选择器。如果`accept`属性(被应用于输入)不正确，屏幕上将不会出现文件选取器，或者它将出现，但它将接受所有文件类型。
:::

你也可以应用自定义过滤器(在用户挑选文件后执行)。

<doc-example title="过滤器" file="QUploader/RestrictionFilter" />

### 添加头文件

使用`headers`来设置额外的XHR头信息，以便在上传请求中发送。如果你需要嵌入额外的字段，也可以检查API中的`form-fields`属性。

<doc-example title="头信息" file="QUploader/Headers" />

::: tip
这两个属性(`headers`和`form-fields`)也可以作为一个函数使用(`(files) => Array`)，允许你根据要上传的文件动态地设置它们。
:::

还有一个`with-credentials'属性，它在上传过程使用的XHR上将`withCredentials'设置为`true'。

### 处理上传

<doc-example title="文件选择时自动上传" file="QUploader/UploadAuto" />

<doc-example title="自定义上传URL" file="QUploader/UploadURL" />

::: tip
你也可以通过`headers`和`method`属性来定制HTTP头和HTTP方法。查看QUploader API部分。
:::

### 工厂函数
有一个你可以使用的`factory`属性，它必须是一个函数。这个函数可以返回一个对象或者一个用对象解析的承诺(如果承诺失败，就会发出`@factory-failed`事件)。

上述对象可以覆盖以下QUploader属性：`url', `method', `headers', `formFields', `fieldName', `withCredentials', `sendRaw')。这个对象的属性也可以是函数(形式是`(file[s]) => value`)。

<doc-example title="基于承诺的工厂函数" file="QUploader/FactoryPromise" />

你也可以使用`factory`函数属性并立即返回同一个对象。如果你想同时设置多个属性(如上所述)，这很有用。

<doc-example title="立即返回工厂函数" file="QUploader/FactoryImmediate" />

### 槽位

在下面的示例中，我们展示的是相当于默认的头。还注意到一些你可以使用的布尔范围属性。`scope.canAddFiles`, `scope.canUpload`, `scope.isUploading`。

::: warning
注意，你必须再安装和使用一个组件(QUploaderAddTrigger)，以便能够将文件添加到队列中。这个组件需要放在一个具有`position: relative`的DOM节点下(提示：QBtn已经有了)，当用户点击它的父节点时将自动注入必要的事件(不要手动添加`@click="scope.pickFiles"`)。如果触发器不工作，检查你是否有一个元素渲染在它上面，并相应改变QUploaderAddTrigger的zIndex。
:::

<doc-example title="自定义头文件" file="QUploader/SlotHeader" />

<doc-example title="自定义文件列表" file="QUploader/SlotList" />

## 服务器端点示例

QUploader默认使用HTTP(S)协议来上传文件(但它并不局限于此，你将在后面的章节中看到)。

::: tip
这绝不是要求像下面这样使用Nodejs服务器或Spring或ASP.NET -- 你可以随心所欲地处理文件上传，只要你使用的方法符合HTTP协议。使用[PHP](https://secure.php.net/manual/en/features.file-upload.php)的示例。
:::

### Nodejs

下面是一个用Nodejs编写的基本服务器示例。除了接收文件外，它什么都不做，所以可以把它作为一个起点。

```js
const
  express = require('express'),
  app = express(),
  formidable = require('formidable'),
  path = require('path'),
  fs = require('fs'),
  throttle = require('express-throttle-bandwidth')

const
  port = process.env.PORT || 4444,
  folder = path.join(__dirname, 'files')

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}

app.set('port', port)
app.use(throttle(1024 * 128)) // throttling bandwidth

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm()

  form.uploadDir = folder
  form.parse(req, (_, fields, files) => {
    console.log('\n-----------')
    console.log('Fields', fields)
    console.log('Received:', Object.keys(files))
    console.log()
    res.send('Thank you')
  })
})

app.listen(port, () => {
  console.log('\nUpload server running on http://localhost:' + port)
})
```

### ASP.NET MVC/Core
QUploader与微软ASP.NET MVC/Core 2.x Web API后端无缝集成。
在你的Vue文件中，用所需的Web API端点配置QUploader组件。

```html
<q-uploader
  url="http://localhost:4444/fileuploader/upload"
  label="Upload"
  style="max-width: 300px"
/>
```

如果你的服务器需要认证，如JWT令牌，请使用QUploader的工厂函数来指定将被QUploader使用的xhr头。例如：

```html
<template>
  <q-uploader
    label="Upload"
    :factory="factoryFn"
    style="max-width: 300px"
  />
</template>

<script>
export default {
  methods: {
    factoryFn (file) {
      return new Promise((resolve, reject) => {
        // 从你的商店检索JWT令牌。
        const token = "myToken";
        resolve({
          url: 'http://localhost:4444/fileuploader/upload',
          method: 'POST',
          headers: [
            { name: 'Authorization', value: `Bearer ${token}` }
          ]
        })
      })
    }
  }
}
</script>
```

QUploader的文件有效载荷将是一个正确形成的``IFormFileCollection``对象，你可以通过ASP.NET Web API控制器的``.Request``属性读取。
ASP.NET Core 2.2控制器。

```
[Route("api/[controller]")]
[ApiController]
public class FileUploaderController : ControllerBase
{
    [HttpPost]
    public async Task upload()
    {
        // 请求的.Form.Files属性将
        // 包含QUploader的文件。
        var files = this.Request.Form.Files;
        foreach (var file in files)
        {
            if (file == null || file.Length == 0)
                continue;

            // 对文件做一些处理。
            var fileName = file.FileName;
            var fileSize = file.Length;
            // 保存到服务器...
            // ...
        }
    }
}
```

### Spring

下面是一个[Spring](https://spring.io/guides/gs/uploading-files/)的示例。属性`fieldName="file"`与`@RequestPart(value = "file")`进行了映射。

```
// 爪哇
@RestController
public class UploadRest {
	@PostMapping("/upload")
	public void handleFileUpload(@RequestPart(value = "file") final MultipartFile uploadfile) throws IOException {
		saveUploadedFiles(uploadfile);
	}

	private String saveUploadedFiles(final MultipartFile file) throws IOException {
		final byte[] bytes = file.getBytes();
		final Path path = Paths.get("YOUR_ABSOLUTE_PATH" + file.getOriginalFilename());
		Files.write(path, bytes);
	}
}

// 语境
<q-uploader field-name="file" url="YOUR_URL_BACK/upload" with-credentials />
```

### Python/Flask

```
// 蟒蛇
from flask import Flask, request
from werkzeug import secure_filename
from flask_cors import CORS
import os

app = Flask(__name__)

# This is necessary because QUploader uses an AJAX request
# to send the file
cors = CORS()
cors.init_app(app, resource={r"/api/*": {"origins": "*"}})

@app.route('/upload', methods=['POST'])
def upload():
    for fname in request.files:
        f = request.files.get(fname)
        print(f)
        f.save('./uploads/%s' % secure_filename(fname))

    return 'Okay!'

if __name__ == '__main__':
    if not os.path.exists('./uploads'):
        os.mkdir('./uploads')
    app.run(debug=True)
```


### 朱莉娅/吉尼

```
# Julia Genie

using Genie, Genie.Requests, Genie.Renderer

Genie.config.cors_headers["Access-Control-Allow-Origin"]  =  "*"
Genie.config.cors_headers["Access-Control-Allow-Headers"] = "Content-Type"
Genie.config.cors_headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
Genie.config.cors_allowed_origins = ["*"]

#== server ==#

route("/") do
  "File Upload"
end

route("/upload", method = POST) do
  if infilespayload(:img)                 # :img is file-name
    @info filename(filespayload(:img))    # file-name="img"
    @info filespayload(:img).data

    open("upload/file.jpg", "w") do io
      write(io, filespayload(:img).data)
    end
  else
    @info "No image uploaded"
  end

  Genie.Renderer.redirect(:get)
end

isrunning(:webserver) || up()
```

## 支持其他服务
QUploader目前支持通过HTTP(S)协议进行上传。但你也可以扩展该组件以支持其他服务。比如说Firebase。下面是你如何做到的。

::: warning Help appreciated
我们也非常乐意接受支持其他上传服务的PR，以便其他人能够受益。请点击本页底部的 "在浏览器中编辑本页 "链接或本页顶部的铅笔图标。
:::

下面是一个示例，你需要向`createUploaderComponent()` Quasar util提供API。这将创建一个Vue组件，你可以在你的应用程序中导入。

```js
// MyUploader.js
import { createUploaderComponent } from 'quasar'
import { computed } from 'vue'

// 输出一个Vue组件
export default createUploaderComponent({
  // 在此定义QUploader插件

  name: 'MyUploader', // your component's name

  props: {
    // ...你的定制属性
  },

  emits: [
    // ...您自定义的事件名称列表
  ],

  injectPlugin ({ props, emit, helpers }) {
    // 可以在这里调用任何其他的可合成物
    // 因为这个函数将在组件的setup()中运行。

    // [必须的！]
    // 我们正在努力上传文件
    const isUploading = computed(() => {
      // 返回<Boolean>。
    })

    // [可选]
    // 显示覆盖在顶部的
    // 上传者示意其正在等待
    // 的东西上(阻止所有的控制)。
    const isBusy = computed(() => {
      // 返回<Boolean>。
    })

    // [必须的！]
    // 中止和清理任何进程
    // 正在进行中的
    function abort () {
      // ...
    }

    // [必须的！]
    // 开始上传过程
    function upload () {
      // ...
    }

    return {
      isUploading,
      isBusy,

      abort,
      upload
    }
  }
})
```

::: tip TIPS
* 对于这种插件形式的默认XHR实现，请查看[源代码](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/uploader/xhr-uploader-plugin.js)。
* 对于UMD版本，使用`Quasar.createUploaderComponent({ ... })`。
:::

然后你向Vue全局注册这个组件，或者你导入它并把它添加到你的Vue组件中的 "component。{}"中，然后将其添加到你的Vue组件中。

```js
// 在启动文件中全面注册你的组件
import MyUploader from '../../path/to/MyUploader' // the file from above

export default ({ app }) {
  app.component('MyUploader', MyUploader)
}

// 或在一个.vue文件中声明它
import MyUploader from '../../path/to/MyUploader' // the file from above
export default {
  // ...
  components: {
    // ...
    MyUploader
  }
}
```
