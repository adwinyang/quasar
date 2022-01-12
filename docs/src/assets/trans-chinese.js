/**
 * 关键字转为中文。 目前用于 api 帮助文档的表格中显示
 * @since 2022/01/09
 */
export const CHINESE_DICT = {
  props: '属性',
  events: '事件',
  methods: '方法',
  slots: '插槽',
  behavior: '行为',
  style: '样式',
  content: '内容',
  general: '通用',
  model: '模型',
  state: '状态',
  navigation: '导航',
  position: '位置',
  transition: '过渡',
  options: '选项',
  selection: '选择',
  'virtual-scroll': '虚拟滚动',
  label: '标签',
  header: '头部',
  column: '列',
  expansion: '展开',
  filter: '筛选',
  pagination: '分页',
  sorting: '排序',
  upload: '上传'
}

export default function translateChinese (key) {
  key = key ?? ''
  return CHINESE_DICT[ key ] ?? CHINESE_DICT[ key.toUpperCase() ] ?? CHINESE_DICT[ key.toLowerCase() ] ?? key
}
