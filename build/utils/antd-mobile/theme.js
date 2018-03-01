const hd = 2

module.exports = {
  hd: `${hd}px`,
  // 色彩
  // ---
  // 文字色
  'color-text-base': '#000', // 基本
  'color-text-base-inverse': '#fff', // 基本 - 反色
  'color-text-secondary': '#a4a9b0', // 辅助色
  'color-text-placeholder': '#bbb', // 文本框提示
  'color-text-disabled': '#bbb', // 失效
  'color-text-caption': '#888', // 辅助描述
  'color-text-paragraph': '#333', // 段落
  'color-link': '#108ee9', // 链接

  // 背景色
  'fill-base': '#fff', // 组件默认背景
  'fill-body': '#f5f5f9', // 页面背景
  'fill-tap': '#ddd', // 组件默认背景 - 按下
  'fill-disabled': '#ddd', // 通用失效背景
  'fill-mask': 'rgba(0, 0, 0, 0.4)', // 遮罩背景
  'color-icon-base': '#ccc', // 许多小图标的背景，比如一些小圆点，加减号
  'fill-grey': '#f7f7f7',

  // 透明度
  'opacity-disabled': 0.3, // switch checkbox radio 等组件禁用的透明度

  // 全局/品牌色
  'brand-primary': '#108ee9',
  'brand-primary-tap': '#0e80d2',
  'brand-success': '#6abf47',
  'brand-warning': '#ffc600',
  'brand-error': '#f4333c',
  'brand-important': '#ff5b05', // 用于小红点
  'brand-wait': '#108ee9',

  // 边框色
  'border-color-base': '#ddd',

  // 字体尺寸
  // ---
  'font-size-icontext': `${10 * hd}px`,
  'font-size-caption-sm': `${12 * hd}px`,
  'font-size-base': `${14 * hd}px`,
  'font-size-subhead': `${15 * hd}px`,
  'font-size-caption': `${16 * hd}px`,
  'font-size-heading': `${17 * hd}px`,

  // 圆角
  // ---
  'radius-xs': `${2 * hd}px`,
  'radius-sm': `${3 * hd}px`,
  'radius-md': `${5 * hd}px`,
  'radius-lg': `${7 * hd}px`,
  'radius-circle': '50%',

  // 边框尺寸
  // ---
  'border-width-sm': '1px',
  'border-width-md': '1px',
  'border-width-lg': `${2 * hd}px`,

  // 间距
  // ---
  // 水平间距
  'h-spacing-sm': `${5 * hd}px`,
  'h-spacing-md': `${8 * hd}px`,
  'h-spacing-lg': `${15 * hd}px`,

  // 垂直间距
  'v-spacing-xs': `${3 * hd}px`,
  'v-spacing-sm': `${6 * hd}px`,
  'v-spacing-md': `${9 * hd}px`,
  'v-spacing-lg': `${15 * hd}px`,
  'v-spacing-xl': `${21 * hd}px`,

  // 高度
  // ---
  'line-height-base': 1, // 单行行高
  'line-height-paragraph': 1.5, // 多行行高

  // 图标尺寸
  // ---
  'icon-size-xxs': `${15 * hd}px`,
  'icon-size-xs': `${18 * hd}px`,
  'icon-size-sm': `${21 * hd}px`,
  'icon-size-md': `${22 * hd}px`, // 导航条上的图标、grid的图标大小
  'icon-size-lg': `${36 * hd}px`,

  // 动画缓动
  // ---
  'ease-in-out-quint': 'cubic-bezier(.86, 0, .07, 1)',

  // 组件变量
  // ---

  'actionsheet-item-height': `${50 * hd}px`,
  'actionsheet-item-font-size': `${18 * hd}px`,

  // button
  'button-height': `${47 * hd}px`,
  'button-font-size': `${18 * hd}px`,

  'button-height-sm': `${30 * hd}px`,
  'button-font-size-sm': `${13 * hd}px`,

  'primary-button-fill': '#108ee9',
  'primary-button-fill-tap': '#0e80d2',

  'ghost-button-color': '#108ee9', // 同时应用于背景、文字颜色、边框色
  // 'ghost-button-fill-tap': 'fade(brand-primary, 60%)',

  'warning-button-fill': '#e94f4f',
  'warning-button-fill-tap': '#d24747',

  'link-button-fill-tap': '#ddd',
  'link-button-font-size': `${16 * hd}px`,

  // modal
  'modal-font-size-heading': `${18 * hd}px`,
  'modal-button-font-size': `${18 * hd}px`, // 按钮字号
  'modal-button-height': `${50 * hd}px`, // 按钮高度

  // list
  'list-title-height': `${30 * hd}px`,
  'list-item-height-sm': `${35 * hd}px`,
  'list-item-height': `${44 * hd}px`,

  // input
  'input-label-width': `${17 * hd}px`, // InputItem、TextareaItem 文字长度基础值
  'input-font-size': `${17 * hd}px`,
  'input-color-icon': '#ccc', // input clear icon 的背景色
  'input-color-icon-tap': '#108ee9',

  // tabs
  'tabs-color': '#108ee9',
  'tabs-height': `${43.5 * hd}px`,
  'tabs-font-size-heading': `${15 * hd}px`,
  'tabs-ink-bar-height': `${2 * hd}px`,

  // segmented-control
  'segmented-control-color': '#108ee9', // 同时应用于背景、文字颜色、边框色
  'segmented-control-height': `${27 * hd}px`,
  // 'segmented-control-fill-tap': 'fade(brand-primary, 0.1)',

  // tab-bar
  'tab-bar-fill': '#ebeeef',
  'tab-bar-height': `${50 * hd}px`,

  // toast
  'toast-fill': 'rgba(58, 58, 58, 0.9)', // toast, activity-indicator 的背景颜色

  // search-bar
  'search-bar-fill': '#efeff4',
  'search-bar-height': `${44 * hd}px`,
  'search-bar-input-height': `${28 * hd}px`,
  'search-bar-font-size': `${15 * hd}px`,
  'search-color-icon': '#bbb', // input search icon 的背景色

  // notice-bar
  'notice-bar-fill': '#fefcec',
  'notice-bar-height': `${36 * hd}px`,
  'notice-bar-color': '#f76a24',

  // switch
  'switch-fill': '#4dd865',
  'switch-fill-android': '#108ee9',

  // tag
  'tag-height': `${25 * hd}px`,
  'tag-height-sm': `${15 * hd}px`,
  'tag-color': '#108ee9',

  // keyboard
  'keyboard-confirm-color': '#108ee9',
  'keyboard-confirm-tap-color': '#0e80d2',

  // picker
  'option-height': `${42 * hd}px`, // picker 标题的高度

  // z-index
  'progress-zindex': 2000,
  'popover-zindex': 1999,
  'toast-zindex': 1999,
  'action-sheet-zindex': 1000, // actonsheet 会放到 popup / modal 中
  'picker-zindex': 1000,
  'popup-zindex': 999,
  'modal-zindex': 999, // modal.alert 应该最大，其他应该较小
  'tabs-pagination-zindex': 999
}
