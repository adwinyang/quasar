---
title:  Capacitor API
desc: 如何在 Quasar 应用程序中使用 Capacitor 插件。
---
你可以通过使用 [Capacitor APIs](https://capacitor.ionicframework.com/docs/apis) 来连接本地设备的API。

## Capacitor APIs
这类API的几个示例：

* 后台任务
* 相机
* 控制台
* 设备
* 文件系统
* 地理定位
* 运动
* 网络
* 推送通知
* 分享
* 启动画面
* 状态栏

## 使用 Capacitor API
假设你已经在你的 Quasar 项目中加入了Capacitor模式，让我们通过一些示例来学习。

### 示例：地理定位
第一步是阅读我们想要使用的Capacitor API的文档。我们看一下Capacitor的[Geolocation API](https://capacitor.ionicframework.com/docs/apis/geolocation) 。

现在让我们把这个插件好好利用一下。在你的 Quasar项目的一个页面/布局/组件Vue文件中：

```html
// 一些Vue文件
// 请记住，这只是一个示例;
// 只看我们如何使用该插件页面中描述的API。
// 其余的事情在这里并不重要

<template>
  <div>
    GPS position: <strong>{{ position }}</strong>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Geolocation } from '@capacitor/geolocation'

export default {
  setup () {
    const position = ref('determining...')

    function getCurrentPosition() {
      Geolocation.getCurrentPosition().then(newPosition => {
        console.log('Current', newPosition)
        position.value = newPosition
      })
    }

    let geoId

    onMounted(() => {
      getCurrentPosition()

      // 我们开始倾听
      geoId = Geolocation.watchPosition({}, (newPosition, err) => {
        console.log('New GPS position')
        position.value = newPosition
      })
    })

    onBeforeUnmount(() => {
      // 我们做清理工作
      Geolocation.clearWatch(geoId)
    })

    return {
      position
    }
  }
}
</script>
```

### 示例：相机
第一步是阅读我们要使用的Capacitor API的文档。我们看一下Capacitor的[Camera API](https://capacitor.ionicframework.com/docs/apis/camera) 。

现在让我们把这个API好好利用一下。在你的 Quasar 项目的一个页面/布局/组件Vue文件中，我们写道。

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
import { ref } from 'vue'
import { Camera, CameraResultType } from '@capacitor/camera'

export default {
  setup () {
    const imageSrc = ref('')

    async function captureImage () {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      })

      // 其结果将根据resultType选项的值而变化。
      // CameraResultType.Uri - 从image.webPath获取结果。
      // CameraResultType.Base64 - 从图像.base64String获取结果。
      // CameraResultType.DataUrl - 从image.dataUrl获取结果。
      imageSrc.value = image.webPath
    }

    return {
      imageSrc,
      captureImage
    }
  }
}
</script>
```

一些Capacitor插件，如Camera，有一个基于网络的用户界面，当不是原生运行而是在一个标准的网络浏览器中运行时，可以使用。要启用这些控件，请在你的项目中加入@ionic/pwa-elements。

```bash
$ npm install @ionic/pwa-elements
```

然后创建一个启动文件来初始化它们，例如`src/boot/capacitor.js`：

```js
import { defineCustomElements } from '@ionic/pwa-elements/loader'

export default () => {
  defineCustomElements(window)
}
```

不要忘记在`quasar.conf.js`中调用启动脚本

```js
boot: ['capacitor']
```

现在，你不仅可以在原生的Android或iOS中使用相机API，还可以在基于Web的项目中使用，如SPA或PWA。


### 示例：设备
第一步是阅读我们要使用的Capacitor API的文档。看一下Capacitor的[设备API](https://capacitor.ionicframework.com/docs/apis/device) 。

现在让我们把这个API好好利用一下。在你的 Quasar 项目的一个页面/布局/组件Vue文件中：

```html
// 一些Vue文件
// 请记住，这只是一个示例。
// 只看我们如何使用该插件页面中描述的API。
// 其余的事情在这里并不重要

<template>
  <div>
    <div>Model: {{ model }}</div>
    <div>Manufacturer: {{ manufacturer }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Device } from '@capacitor/device'

export default {
  setup () {
    const model = ref('Please wait...')
    const manufacturer = ref('Please wait...')

    onMounted(() => {
      Device.getInfo().then(info => {
        model.value = info.model
        manufacturer.value = info.manufacturer
      })
    })

    return {
      model,
      manufacturer
    }
  }
}
</script>
```
