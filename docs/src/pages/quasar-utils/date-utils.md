---
title: 日期工具
desc: 一组用于操作JS日期对象的 Quasar 方法，而无需专用库的高附加成本。
keys: formatDate,buildDate,isValid,addToDate,subtractFromDate,adjustDate,getMinDate,getMaxDate,isBetweenDates,getBetweenDates,isSameDate,getDateDiff,getWeekOfYear,getDayOfYear,getDayOfWeek,daysInMonth,startOfDate,endOfDate,inferDateFormat,clone,extractDate
---

 Quasar 提供了一系列有用的函数，可以在大多数情况下轻松地操作JS日期，而不需要像Momentjs 这样集成专用库的高附加成本。

大多数 Quasar 日期函数以 Unix 时间戳或代表日期的字符串为参数，需要通过本地JS [Date构造器](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) 进行解析。一些示例。`1497159857411`, `Sun Jun 11 2017 08:44:42 GMT+0300`, `2017-06-16`.

返回的值都是JS日期。

熟悉 JS 原生的 Date 类，它非常强大，记住你不需要像 Momentjs 这样的解决方案，它会在你的包中添加数百个小型化的 KB。

::: tip
Quasar 日期包括摇树(tree shaking)，除了 UMD 版本。
:::

你会注意到所有的示例都从 Quasar 导入了`date`对象。然而，如果你只需要其中的一个方法，那么你可以使用ES6解构来帮助 Tree Shaking 只嵌入该方法而不是所有的`date`方法。

以`addToDate()`为例：

```js
// 我们导入所有的 `date`。
import { date } from 'quasar'
// 解构，只保留需要的东西
const { addToDate } = date

const newDate = addToDate(new Date(), { days: 7, months: 1 })
```

::: tip
关于UMD构建的用法，见[这里](/start/umd#quasar-global-object) 。
:::

## 显示格式

它接收一串标记，并将其替换为相应的日期值：

```js
import { date } from 'quasar'

const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
```

对于i18n，你可以使用第三个参数：

```js
const formattedString = date.formatDate(timeStamp, 'MMMM - dddd', {
  days: ['Duminica', 'Luni', /* 以及其他所有的日期 -- 记得从星期天开始 */],
  daysShort: ['Dum', 'Lun', /* 以及其他所有的日期 -- 记得从星期天开始 */],
  months: ['Ianuarie', 'Februarie', /* 以及剩下的几个月 */
  monthsShort: ['Ian', 'Feb', /* 以及剩下的几个月 */]
})
```

可用的格式标记：

| 单位 | 可用格式 |
| --- | --- |
| 年份 | <ul> <li> **YY**: 70 71 ... 29 30 </li> <li> **YYYY**: 1970 1971 ... 2029 2030 </li> </ul> |
| 月份 | <ul> <li> **M**: 1 2 ... 11 12 </li> <li> **MM**: 01 02 ... 11 12 </li> <li> **MMM**: 1 月 2 月 ... 11 月 12 月 </li> <li> **MMMM**: 1 月 2 月 ... 11 月 12 月 </li> </ul> |
| 季度 | <ul> <li> **Q**: 季度数 1 2 3 4 </li> <li> **Qo**: 季度数 1st 2nd 3rd 4th </li> </ul> |
| 一月中的某天 | <ul> <li> **D**: 1 2 ... 30 31 </li> <li> **Do**: 1st 2nd ... 30th 31st </li> <li> **DD**: 01 02 ... 30 31 </li> </ul> |
| 一年中的某天 | <ul> <li> **DDD**: 1 2 ... 364 365 </li> <li> **DDDD**: 001 002 ... 364 365 </li> </ul> |
| 星期几 | <ul> <li> **d**: 0 1 ... 5 6 </li> <li> **dd**: Su Mo ... Fr Sa </li> <li> **ddd**: 周日周一 ...周五周六 </li> <li> **dddd**: 周日周一 ...周五周六 </li> </ul> |
| 星期几 (ISO) | <ul> <li> **E**: 1 2 ... 6 7 </li> </ul> |
| 一年中的某周 | <ul> <li> **w**: 1 2 ... 52 53 </li> <li> **ww**: 01 02 ... 52 53 </li> </ul> |
| 小时 | <ul> <li> **H**: 0 1 ... 22 23 </li> <li> **HH**: 00 01 ... 22 23 </li> <li> **h**: 0 ... 11 12 </li> <li> **hh**: 01 02 ... 11 12 </li> </ul> |
| 分钟 | <ul> <li> **m**: 0 1 ... 58 59 </li> <li> **mm**: 00 01 ... 58 59 </li> </ul> |
| 秒钟 | <ul> <li> **s**: 0 1 ... 58 59 </li> <li> **ss**: 00 01 ... 58 59 </li> </ul> |
| 分数秒 | <ul> <li> **S**: 0 1 ... 8 9 </li> <li> **SS**: 00 01 ... 98 99 </li> <li> **SSS**: 000 001 ... 998 999 </li> </ul> |
| 时区偏移 | <ul> <li> **Z**: -07: 00 -06: 00 ... +06: 00 +07: 00 </li> <li> **ZZ**: -0700 -0600 .. . +0600 +0700 </li> </ul> |
| 上午/下午 | <ul> <li> **A**：上午，下午 </li> <li> **a**：上午，下午 </li> <li> **aa**：上午，下午 </li > </ul> |
| Unix 时间戳 | <ul> <li> **X**: 1360013296 </li> <li> **x** (ms): 1360013296123 </li> </ul> |

## 操作日期

### 创建
**尝试使用原生 JS Date 类创建日期** 例如：

```js
const date = new Date();
```

下面的方法只是一个包装器，在你只需要当前时间，但需要不同的年份、月份或秒数等情况下，可以帮助你。

```js
import { date } from 'quasar'

const newDate = date.buildDate({ year: 2010, date: 5, hours: 15, milliseconds: 123 })
```

你可以传递第二个参数(一个布尔值)来设置UTC时间(真)而不是本地时间。

提供的对象字面可以包含以下键(所有都是可选的)。

| 关键 | 描述 |
| --- | --- |
| `milliseconds` | 用于日期/时间的毫秒部分 |
| `seconds` | 用于日期/时间中的秒数部分 |
| `minutes` | 表示日期/时间中的分钟部分 |
| `hours` | 用于日期/时间的小时部分 |
| `date` | 表示日期/时间中的日部分 |
| `month`| 表示日期/时间的月份部分 |
| `year` | 用于日期/时间的年份部分 |

### 验证
要检查一个日期字符串是否有效，请使用：

```js
import { date } from 'quasar'

const dateString = 'Wed, 09 Aug 1995 00:00:00 GMT'

if (date.isValid(dateString)) {
  // 对日期字符串做一些处理
}
```

### 加/减
要在一个日期中增加/减去一些时间，请使用：

```js
import { date } from 'quasar'

let newDate = new Date(2017, 2, 7)

newDate = date.addToDate(newDate, { days: 7, months: 1 })
// `newDate`现在是2017-3-14 00:00:00

newDate = date.subtractFromDate(newDate, { hours: 24, milliseconds: 10000 })
// `newDate`现在是2017-3-12 23:59:50
```

所提供的对象字面可以包含以下键值(都是可选的)：

| 关键 | 描述 |
| --- | --- |
| `milliseconds` | 表示以毫秒为单位的持续时间 |
| `seconds` | 表示以秒为单位的持续时间 |
| `minutes` | 以分钟为单位的持续时间 |
| `hours` | 以小时为单位的持续时间 |
| `days` | 以天为单位的持续时间 |
| `months` | 以月为单位的持续时间 |
| `years' | 以年为单位的持续时间 |

### 设置日期/时间
设置一个指定的日期/时间单位。

```js
import { date } from 'quasar'

const newDate = new Date(2017, 10, 2)
const adjustedDate = date.adjustDate(newDate, { year: 2010, month: 2 })
// `adjustedDate` 是 2010-2-2
```

你可以传递第三个参数(一个布尔值)来设置UTC时间(`true`)而不是本地时间。

提供的对象字面可以包含以下键(都是可选的)。

| 关键 | 描述 |
| --- | --- |
| `milliseconds` | 用于日期/时间的毫秒部分 |
| `seconds` | 用于日期/时间中的秒数部分 |
| `minutes` | 表示日期/时间中的分钟部分 |
| `hours` | 用于日期/时间的小时部分 |
| `date` | 表示日期/时间中的日部分 |
| `month` | 表示日期/时间的月份部分 |
| `year` | 用于日期/时间的年份部分 |

## 查询日期

### 最小/最大
要获得一个日期集(即数组)的最小/最大日期，可以使用：

```js
import { date } from 'quasar'

let min = date.getMinDate(new Date(2017, 6, 24), new Date(2017, 5, 20), new Date(2017, 6, 26))
// `min` 是 2017-5-20
let max = date.getMaxDate(new Date(2017, 6, 24), new Date(2017, 5, 20), new Date(2017, 6, 26))
// `max` 是 2017-6-26

// 或者使用一个数组。
const dates = [ new Date(2017, 6, 24), new Date(2017, 5, 20), new Date(2017, 6, 26) ]
let min = date.getMinDate(...dates) // `min` is 2017-5-20
let max = date.getMaxDate(...dates) // `max` is 2017-6-26
```

请注意，返回值是一个时间戳：

```js
console.log(max) // 1497906000000
console.log(new Date(max)) // Wed Jul 26 2017 00:00:00 GMT+0300 (Eastern European Summer Time)
```

### 时间范围
要检查一个日期是否在一个给定的日期/时间范围内，请使用。

```js
import { date } from 'quasar'

const dateTarget = new Date()
const dateFrom = new Date()
const dateTo = new Date()

// **strictly** (即排他性范围)
if (date.isBetweenDates(dateTarget, dateFrom, dateTo)) {
  // 对dateTarget做一些事情
}

// 包括你想要哪种保证金
if (date.isBetweenDates(dateTarget, dateFrom, dateTo, { inclusiveFrom: true, inclusiveTo: true })) {
  // 对dateTarget做一些事情
}

// 如果你只关心比较日期(年/月/日，不考虑时间)。
// 那么你可以向isBetweenDates()提示一下，这样它就能发挥出最佳效果。
if (date.isBetweenDates(dateTarget, dateFrom, dateTo, { onlyDate: true })) {
  // 对dateTarget做一些事情
}
```

要在一个给定的日期/时间范围内对一个日期进行标准化处理，请使用。

```js
import { date } from 'quasar'

const newDate = new Date()
const dateMin = new Date(2010, 2, 23)
const dateMax = new Date(2012, 4, 12)
const dateNormalized = date.getDateBetween(newDate, dateMin, dateMax)
// 如果在2010-2-23和2012-4-12之间，返回 `newDate`；如果较小，返回 `dateMin`；如果较大，返回 `dateMax`。
```

### 相等性
要检查两个日期的单位是否**相等**，请使用：

```js
import { date } from 'quasar'

const date1 = new Date(2017, 2, 5)
const date2 = new Date(2017, 3, 8)
const unit = 'year'

if (date.isSameDate(date1, date2, /* optional */ unit)) {
  // true 因为date1和date2的年份相同
}
```

单位参数可以省略，在这种情况下，将进行完整的日期/时间比较，否则，它允许进行部分比较：

| 单位 | 说明 |
| --- | --- |
| `second` - 测试是否相同的秒数 |
| `minute` | 测试是否只有相同的分钟 |
| `hour` | 测试是否只有相同的小时 |
| `day` | 测试是否只有同一天 |
| `month` | 测试是否相同的月份 |
| `year` | 测试是否相同的年份 |

### 差值
要计算两个日期之间的差异，请使用。

```js
import { date } from 'quasar'

const date1 = new Date(2017, 4, 12)
const date2 = new Date(2017, 3, 8)
const unit = 'days'

const diff = date.getDateDiff(date1, date2, unit)
// `diff`是34(天)。
```

单位参数表示测量单位，如果没有指定，则默认为`days`：

| 单位 | 说明 |
| --- | --- |
| `seconds` | 以秒为单位的距离(不考虑毫秒) |
| `minutes` - 以分钟为单位的距离(不考虑秒，...) |
| `hours` | 以小时为单位的距离(不考虑分、秒、...) |
| `days` | 以日历日为单位的距离 |
| `months` | 以日历月为单位的距离 |
| `years` | 以日历年为单位的距离 |

### 日历
要获得给定日期对象的[ISO年内周数](https://en.wikipedia.org/wiki/ISO_week_date) ，请使用：

```js
import { date } from 'quasar'

const newDate = new Date(2017, 0, 4)
const week = date.getWeekOfYear(newDate) // `week` is 1
```

要获得一个给定日期对象的年份中的天数，请使用：

```js
import { date } from 'quasar'

const newDate = new Date(2017, 1, 4)
const day = date.getDayOfYear(newDate) // `day` is 35
```

要获得一个给定的日期对象在一周内的天数，请使用：

```js
import { date } from 'quasar'

const newDate = new Date(2017, 1, 9)
const day = date.getDayOfWeek(newDate) // `day` is 4
```

获取指定日期的一个月的天数：

```js
import { date } from 'quasar'

const newDate = new Date()
const days = date.daysInMonth(newDate) // e.g. 30
```

### 时间的开始/结束
要通过将原始日期对象设置为一个时间单位的开始来改变它，请使用。

```js
import { date } from 'quasar'

let newDate = new Date(2000)
// 设置为2000年年初(2000年1月1日，00:00:00.000)。
newDate = date.startOfDate(newDate, 'year')
// 设置为2000年底(2000年12月31日，23:59:59.999)。
newDate = date.endOfDate(newDate, 'year')
```

第二个参数表示要重置的单位(它的开始或结束)。

| 单位 | 说明 |
| --- | --- |
| `second` | 重置秒数 |
| `minute` | 重置分钟 |
| `hour` | 重置小时 |
| `day` | 重置天 |
| `month` | 重置月 |
| `year` | 重置年 |

## 其他

### 获取格式

```js
import { date } from 'quasar'

date.inferDateFormat(new Date()) // 'date'
date.inferDateFormat(35346363) // 'number'
date.inferDateFormat('Mon Feb 05 2018 23:05:29') // string
```

### 克隆日期

```js
import { date } from 'quasar'

const newDate = new Date()
const clonedDate = date.clone(newDate)

date.addToDate(newDate, { days: 1 })

console.log(newDate.getDate() === clonedDate.getDate()) // false
```

### 提取日期

使用当前 Quasar 语言包设置的locale，这允许你根据传递的格式将任何字符串解析成一个日期对象。

```js
import { date } from 'quasar'

// 例1
const date = date.extractDate('2019-10-29 --- 23:12', 'YYYY-MM-DD --- HH:mm')
// date是一个新的Date()对象

// 例2
const date = date.extractDate('21/03/1985', 'DD/MM/YYYY')
// date是一个新的Date()对象
```

具有可选择的自定义区域设置。

```js
import { date } from 'quasar'

const obj = date.extractDate('Month: Feb, Day: 11th, Year: 2018', '[Month: ]MMM[, Day: ]Do[, Year: ]YYYY', {
  days: ['Duminica', 'Luni', /* and all the rest of days - remember starting with Sunday */],
  daysShort: ['Dum', 'Lun', /* and all the rest of days - remember starting with Sunday */],
  months: ['Ianuarie', 'Februarie', /* and all the rest of months */],
  monthsShort: ['Ian', 'Feb', /* and all the rest of months */]
})
// date是一个新的Date()对象
```
