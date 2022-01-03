---
title: Quasar JSON API模式
desc: 用来描述组件应用扩展的JSON API。
---

本页描述了用于组件应用扩展的JSON API 架构。

## 使用 JSON API 的好处

  1. 描述你现有的数据格式(format(s))
  2. 提供清晰的人机可读的文档
  3. 验证对以下方面有用的数据：
    - 自动测试
    - 确保提交数据的质量

## JSON数据结构
在其核心部分，JSON是建立在以下数据结构之上的：

object(对象):

```json
{ "key1": "value1", "key2": "value2" }
```

array(数组):

```json
["first", "second", "third" ]
```

number(数字):

```json
42
3.1415926
```

string(字符串):

```json
"这是一个字符串"
```

boolean(布尔值):

```json
true
false
```

null(空值):

```json
null
```

## Quasar JSON API

未填充的架构通常如下所示：

```json
{
  "props": {
  },
  "events": {
  },
  "slots": {
  },
  "methods": {
  }
}
```

### 常用

定义的第一部分是实际的项目名称本身。

::: tip
如果在 "props" 部分，则应为前向名称。即，如果所描述的项目是用 camelCase，那么前面的项目名称就是用 kebab-case。
例如：`myProp` 变成了`my-prop`
:::

其余的定义可以是以下的一种。

| 名称  | 说明  |
|:----|:------------|
| 类型  | 除了 `props` 以外，其他都是可选的。可以是一个单项或数组项目。值是: `["Array", "Boolean", "Function", "Number", "Object", "String", "Null", "Any"]`     |
| 描述  | 描述所描述项目的字符串 |
| 必须  | [true,false] |
| 值   | 一个受限值的数组。例如：`[0, 0.5, 1.0, 1.5, 2.0]` |
| 定义  | 描述一个对象的定义。这是一个基本符合基础对象的对象。它可以包含 `"type"`, `"desc"`, `"required"`, `"examples"`, `"values"` and `"definition"`(递归)|
| 参数  | 通常用于描述一个函数的参数。这需要一个或多个参数作为一个对象的关键，这个对象基本符合基础对象的要求。它可以包含`"type"、`"desc"、`"required"、`"examples"、`"values"和`"definition"(递归) |
| 返回值 | 返回值(对于方法或函数)|
| 类别  | 用于分组 |

所有的项目都是可选的，但至少你应该提供一个描述。

### Props 的示例

```json
  "props": {
    "value": {
      "type": "Boolean",
      "desc": "组件的模型，定义它是否向用户显示或隐藏；要么使用这个属性(与'input'事件的监听器一起)，要么使用v-model指令"。
      "default": true。
      "examples": [
        "v-model=\"footerState\""
      ],
      "category": "model"
    },
    "locale": {
      "type": "Object",
      "desc": "locale格式化选项"。
      "examples": [ ":locale=\"{ monthsShort: ['Ian', 'Feb', 'Mar', '...'] }\"" ],
      "definition": {
        "days": {
          "type": "Array",
          "desc": "全日名称(DDDD)的列表，从星期日开始"。
          "examples": ["['Duminica', 'Luni', 'Marti', '...']" ]
        },
        "dayShort": {
          "type": "Array",
          "desc": "短日名称(DDD)的列表，从星期日开始"。
          "examples": ["['Dum', 'Lun', 'Mar', '...']" ]
        },
        "months": {
          "type": "Array",
          "desc": "完整的月份名称(MMMM)列表，从一月开始"。
          "examples": [ "['Ianuarie', 'Februarie', 'Martie', '...']" ]
        },
        "monthShort": {
          "type": "Array",
          "desc": "简短的月份名称(MMM)列表，从一月开始"。
          "examples": [ "['Ian', 'Feb', 'Mar', '...']" ]
        }
      },
      "category": "model"
    },
    "options": {
      "type": "功能",
      "desc": "可选择配置允许用户设置的时间；如果设置了'小时-选项'、'分钟-选项'和'秒-选项'，则被这些选项覆盖"。
      "params": {
        "hr": {
          "type": "Number",
          "desc": "小时"。
          "examples": [ 15 ]
        },
        "min": {
          "type": "Number",
          "desc": "分钟",
          "examples": [ 38 ]
        },
        "sec": {
          "type": "Number",
          "desc": "Seconds",
          "examples": [ 12 ]
        }
      },
      "returns": null,
      "examples": [
        ":options=\"(hr, min, sec) => hr <= 6\""
      ],
      "category": "behavior"
    },
    "events": {
      "type": [ "Array", "Function" ],
      "desc": "在日历上突出显示的事件列表；如果使用一个函数，它接收的日期为一个字符串，并且必须返回一个布尔值(匹配或不匹配)"。
      "examples": [
        ":events=\"['2018/11/05', '2018/11/06', '2018/11/09', '2018/11/23']\"",
        ":events=\"date => date[9] % 3 === 0\""
      ],
      "category":"model"
    }
  }
```


### Events 示例

```json
  "events": {
    "show": {
      "desc": "组件触发show()后发出的",
      "params": {
        "evt": {
          "type": "Object",
          "desc": "JS事件对象",
          "required": true
        }
      }
    },
    "input": {
      "params": {
        "value": {
          "type": "String"
        },
        "reason": {
          "type": "String",
          "desc": "用户交互的原因(被选中的内容)"。
          "value": ["年", "月", "日", "今天", "地区", "mask" ]
        },
        "details": {
          "type": "Object",
          "desc": "新模型上的属性对象",
          "definition": {
            "year": {
              "type": "Number"
            },
            "month": {
              "type": "Number"
            },
            "day": {
              "type": "Number"
            }
          }
        }
      }
    }



```

### Slots 示例

```json
  "slots": {
    "default": {
      "desc": "这是横幅内容的位置"
    },

    "avatar": {
      "desc": "用于显示头像的槽(建议：QIcon, QAvatar)"
    },

    "selected-item": {
      "desc": "覆盖默认的选择槽；建议。QChip"。
      "scope": {
        "index": {
          "type": "Number",
          "desc": "选择指数"。
          "examples": [ 0 ]
        },
        "opt": {
          "type": "any",
          "desc": "选定的选项 -- 其值来自模型"
        },
        "selected": {
          "type": "Boolean",
          "desc": "总是 True -- 作为 Prop 传递给 QItem(当使用 QItem 时)"
        },
        "removeAtIndex": {
          "type": "Function",
          "desc": "移除位于特定索引的选定选项"。
          "params": {
            "index": {
              "type": "Number",
              "required": true,
              "desc": "删除选择的索引"。
              "examples": [ 0 ]
            }
          },
          "return": null
        },
        "toggleOption": {
          "type": "Function",
          "desc": "从模型中添加/删除选项"。
          "params": {
            "opt": {
              "type": "any",
              "required": true,
              "desc": "添加到模型的选项"。
              "__exemption": [ "examples" ]
            }
          },
          "return": null
        },
        "tabindex": {
          "type": "Number",
          "desc": "与各选项相关的Tabindex HTML属性值"。
          "values": [ 0, -1 ]
        }
      }
    }
  },
```

### 方法示例

```json
  "methods": {
    "focus": {
      "desc": "焦点定位到表单中第一个可定位的元素/组件"
    },

    "validate": {
      "desc": "触发对所有适用的内部 Quasar 组件的验证"。
      "params": {
        "shouldFocus": {
          "type": "Boolean",
          "desc": "在提交表单时，告诉它是否应该关注有错误的组件；如果指定的话，覆盖'no-focus-error'道具"
        }
      },
      "return"。{
        "type": "Promise<boolean>"。
        "desc": "承诺总是被履行，并收到结果(true -> 验证是成功的，false -> 检测到无效的模型)"。
        "examples": [
          "validate().then( outcome => { ... })"
        ]
      }
    }
  }
```

