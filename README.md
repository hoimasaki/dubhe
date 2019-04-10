# Dubhe 前端框架文档

### 19.1.7更新说明
**增加全新的FontAwseome集成**
使用方法:

样例网站
https://fontawesome.com/icons?d=gallery


```html
  <font-awesome-icon class="fa m-r-5" icon="eraser" />
```
#### 集成websocket功能,使用方法见notify/index.vue
#### 集成实时弹幕功能,使用方法见notify/index.vue
#### 增加Dashboard-mng的认证
#### 增加CSS-ANIMATE功能，可以进行动画特效



### 测试方法
添加hosts
```bash
127.0.0.1 moni.ack.bilibili.com
```
访问 because.bilibili.com


------

为了更高效的开发和部署，方便组内沟通，我们有以下约定

------

## bash命令集合

### 安装依赖
npm install

### 启动开发环境(外网)
npm run dev

### 启动开发环(内网)
npm run dev:in

### 生产文件打包 (dist下生成UAT,PROD的文件)
npm run build

### 生产文件打包 (dist下内网生产文件)
npm run build:in

### 生产文件打包分析
npm run build --report

## 暂定前端开发流程

1 界面开发 npm run dev
2 数据联调
3 打包生产文件 npm run build
4 将dist文件夹交给发布人员
5 确认API已发布

## vue开发规范
### 1 单个.vue文件 style标签内使用scoped属性 防止各个css规则干扰
### 2 vue 方法放置顺序
  components
  props
  data
  created
  mounted
  activited
  update
  beforeRouteUpdate
  metods
  filter
  computed
  watch

### 3 method 自定义方法命名
动宾短语（good：jumpPage、openCarInfoDialog）（bad：go、nextPage、show、open、login）
ajax 方法以 get、post 开头，以 data 结尾（good：getListData、postFormData）（bad：takeData、confirmData、getList、postForm）
事件方法以 on 开头（onTypeChange、onUsernameInput）
init、refresh 单词除外
尽量使用常用单词开头（set、get、open、close、jump）
驼峰命名（good: getListData）（bad: get_list_data、getlistData）

### 4 views 下的 vue 文件命名
  views 下面的 vue 文件代表着页面的名字
  放在模块文件夹之下
  常用单词有（detail、edit、list、info、report）

### 5 推荐将API封装后使用，在API文件夹下新建模块目录，每个API对应一个函数，可在不同.vue文件中使用，提高复用性。

### 6 栅格布局优先使用col-lg-*

更多具体规则参照https://blog.ygxdxx.com/2017/03/09/Vuejs-Component-Style-Guide/


## 前端部署系统
