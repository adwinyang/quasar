---
title: Cordova 插件
desc: 如何在 Quasar 应用程序中使用 Cordova 插件。
---
你可以通过使用[Cordova Plugins](https://cordova.apache.org/docs/en/latest/#plugin-apis) 来连接本地设备API。

## Cordova Plugins
此类插件的几个示例：

* 电池状态
* 相机
* 联系方式
* 设备
* 设备运动
* 地理定位
* 媒体
* 媒体捕捉
* 网络信息
* 启动画面
* 震动
* 状态栏

## 设备就绪事件
你会注意到，有些 Cordova 插件只有在 `deviceready`(设备就绪) 事件被触发后才能使用。我们不需要太担心这个问题。Quasar会监听这个事件，并在这个事件被触发**后**我们的根Vue组件进行安装。但是如果你需要一些插件自己的变量，并且在 `deviceready` 之后被初始化，你可以按照下面的示例来使用插件设备

### 注意事项
让我们以一个vue文件为例：
```html
<template>
  ... 我们确定 “deviceready” 已在此处触发 ...
</template>

<script>
// 除 default export 之外,
// 我们需要自己监听这个事件。
document.addEventListener('deviceready', () => {
  // 直到现在我们才确定该事件已被触发

}, false)

export default {
  // 我们确信，这里已经触发了 "设备就绪"(deviceready)。
}
</script>
```

原因很简单。Quasar监听事件，然后挂载根Vue组件。但在这之前，Vue文件被导入到`/src/router/routes.js`文件中，所以默认导出的代码会被执行。

## 使用一个 Cordova 插件
让我们通过一些示例来学习，假设你已经在 Quasar 项目中加入了 Cordova 模式，并且已经安装了一个平台(android, ios, ...)。

### 示例：电池状态
第一步是阅读我们要使用的 Cordova 插件的文档。我们看一下[Cordova 插件列表](https://cordova.apache.org/docs/en/latest/#plugin-apis) ，然后点击[电池状态文档页](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-battery-status/index.html) 。

我们看到关于如何安装这个插件的说明。这总是一个 Cordova 命令。**所以我们 "cd "到`/src-cordova`**(这是一个 Cordova 生成的文件夹)**并在那里发出安装命令表单**。

```bash
# from /src-cordova:
$ cordova plugin add cordova-plugin-battery-status
```

现在让我们把这个插件好好利用一下。在你的 Quasar 项目的一个页面/布局/组件Vue文件中：

```html
// 一些Vue文件
// 请记住，这只是一个示例。
// 只看我们如何使用该插件页面中描述的API。
// 其余的事情在这里并不重要

<template>
  <div>
    Battery status is: <strong>{{ batteryStatus }}</strong>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'

export default {
  setup () {
    const batteryStatus = ref('determining...')

    function updateBatteryStatus (status) {
      batteryStatus.value = `Level: ${status.level}, plugged: ${status.isPlugged}`
    }

    // 我们像在插件的文档页上一样注册事件
    window.addEventListener('batterystatus', updateBatteryStatus, false)

    onBeforeUnmount(() => {
      // 我们做一些清理工作。
      // 我们需要删除事件监听器
      window.removeEventListener('batterystatus', updateBatteryStatus, false)
    })

    return {
      batteryStatus
    }
  }
}
</script>
```

### 示例：相机
第一步是阅读我们要使用的 Cordova 插件的文档。我们看一下[Cordova 插件列表 ](https://cordova.apache.org/docs/en/latest/#plugin-apis) ，然后点击[Camera doc page](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html) 。

那里提到了`deviceready`(设备就绪)事件。但是我们已经从前面的章节中知道了如何处理它。

我们阅读了如何安装这个插件的说明。这总是一个 Cordova 命令。**所以我们 "cd "到`/src-cordova`**(这是一个 Cordova 生成的文件夹)，**在那里发出安装命令的形式。

```bash
# from /src-cordova:
$ cordova plugin add cordova-plugin-camera
```

现在让我们把这个插件好好利用一下。在你的 Quasar 项目的一个页面/布局/组件Vue文件中：

```html
// 一些Vue文件
// 请记住，这只是一个示例。
// 只看我们如何使用该插件页面中描述的API。
// 其余的事情在这里并不重要

<template>
  <div>
    <q-btn color="primary" label="Get Picture" @click="captureImage" />

    <img :src="imageSrc">
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()
    const imageSrc = ref('')

    function captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          imageSrc.value = `data:image/jpeg;base64,${data}`
        },
        () => { // on fail
          $q.notify('Could not access device camera.')
        },
        {
          // 相机选项
        }
      )
    }

    return {
      imageSrc,
      captureImage
    }
  }
}
</script>
```

### 示例：设备
第一步是阅读我们要使用的 Cordova 插件的文档。看一下[Cordova 插件列表](https://cordova.apache.org/docs/en/latest/#plugin-apis) ，然后点击[设备文档页](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html) 。

这个插件初始化了一个名为`device`的全局变量，描述了设备的硬件和软件。所以它可以用`window.device`来访问。

请阅读其cordova doc页面上关于如何安装这个插件的说明。它总是一个 Cordova 命令。**所以我们 "cd "到`/src-cordova` **(这是一个 Cordova 生成的文件夹)** ，从那里发出安装命令。

```bash
# from /src-cordova:
$ cordova plugin add cordova-plugin-device
```

现在让我们把这个插件用在一些好的地方。如果你需要你的设备在启动应用程序时的信息，你将不得不捕获创建的事件。在你的 Quasar 项目的一个页面/布局/组件Vue文件中：

```html
// 一些Vue文件
// 请记住，这只是一个示例;
// 只看我们如何使用该插件页面中描述的API;
// 其余的事情在这里并不重要

<template>
  <div>
    <q-page class="flex flex-center">
      <div>IMEI: {{ imei }}</div>
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const imei = ref(
      window.device === void 0
        ? 'Run this on a mobile/tablet device'
        : window.device
    )

    return {
      imei
    }
  }
}
</script>
```
