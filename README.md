# littlee
A easy way to master h5

# littlee
一个简单而强大的单页面h5框架。告别混乱的js代码，只需简单的配置【标签属性】和【插件】，即可轻松实现强大及复杂的业务逻辑。
高度的代码复用。
如果你因项目越来越复杂的前端业务逻辑而困扰，如果你因业务逻辑与效果代码混乱而困扰，如果你想让代码越写越轻松，如果你想要一个懂你的小助手，如果你是一个追求简洁的“艺术家”，如果你是个喜欢创造的大师，那么请加入littlee，尽情展示或运用你的激情吧！请让我们一起告别混乱、繁琐、乏味以及那些限制并困扰我们的无聊吧！
在这里，【创造家】可以创造精美的【plugin】，而【艺术家】可以运用这些【plugin】来创建美妙的艺术品。

# 依赖
### 1. art-template，一个简单而强大的前端渲染引擎。本框架使用阿里团队开发的 基于【art-template语法】的前端模板预编译工具。
  （模板位于template/tpl/中，于该目录下执行如下命令，即可编译模板： tmod）qj
### 2. jquery
### 3. iscroll5
### 4. swiper

# 用法
### 1. 在index.html中引入【css文件】及【jquery, lib/littlee/index.js】
### 2. 启动应用，使用类似如下代码：
  Ajax.query({href: '#', islogin: true, template: 'index', method: 'render', success: 'index.index', controller: 'index'});
### 3. 应用逻辑跳转，方式有二：
  1. 只需通过【Ajax.query】方法，即可渲染静态页面，或者从服务器端获取数据并渲染相应模板。
  2. 通过 【a标签】或者 含有 【query】class类的标签触发页面逻辑。本方法本质是方式1的调用，通过标签属性传递参数。
  
# 属性说明
### 1. click
 #### 含义： 点击执行的操作
 #### 值： 函数名
 #### 例： <a href='#' click='click.click'></a><script>var click = {click: function(data){console.log#### ： (1);}};</script>
 使用场景： 当只需要点击
 
### 2. store-offwifi
 #### 含义： 是否缓存非wifi环境下的post请求，以便节约流量
 #### 值： true | false
 #### 例： 
 #### 使用场景： 节约流量
 
### 3. data-value
 #### 含义： 下载文件数据（配合 download 使用）
 #### 值： uri（资源路径）
 #### 例： <a download='true' data-value='http://www.baidu.com'>baidu</a>
 #### 使用场景： 下载文件
 
### 4. parent-dir
 #### 含义： 下载文件本地存储路径（相对项目路径，配合 download 和 downloads 使用, 适用于移动端）
 #### 值： uri（资源路径）
 #### 例： <a download='true' parent-dir='data' data-value='http://www.baidu.com'>baidu</a>
 #### 使用场景： 移动端下载文件

### 5. export-source
 #### 含义： 批量下载文件数据（配合 downloads 使用）
 #### 值： uri（资源路径）
 #### 例： <a downloads='true' export-source='http://www.baidu.com'>baidu</a>
 #### 使用场景： 批量下载文件

### 6. page
 #### 含义： 分页页码（从1开始）
 #### 值： uri（资源路径）
 #### 例： <a  page='1'>baidu</a>
 #### 使用场景： 下拉加载更多

### 8. download
 #### 含义： 单个文件下载
 #### 值： true | false
 #### 例： <a download='true' data-value='http://www.baidu.com'>baidu</a>
 #### 使用场景： 下载单个文件

### 9. downloads
 #### 含义： 多文件下载
 #### 值： uri（资源路径）
 #### 例： <a downloads='true' data-value='http://www.baidu.com'>baidu</a>
 #### 使用场景： 下载多文件

10. islink
 #### 含义： 是否是链接（如果值为 true, 则执行默认的按标签点击事件）
 #### 值： true | false
 #### 例： <a href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 需要执行默认的链接点击事件

11. mdata
 #### 含义： 请求方式（默认 get）
 #### 值： get | post
 #### 例： <a mdata='get' template='baidu' contaioner='#baidu' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 更改请求方式

12. append
 #### 含义： 是否以追加的方式添加模板（view）的内容(false 时，将会替换相应dom的内容，常用于加载更多)
 #### 值： true | false
 #### 例： <a download='true' data-value='http://www.baidu.com'>baidu</a>
 #### 使用场景： 动态添加dom内容

13. cachePage
 #### 含义： 是否缓存页面特定区域内容(如果为true，则会将该内容渲染至id值为cachePage值的dom中，再次打开该页面时会直接渲染出该页面而不再次渲染。等价于常驻dom)
 #### 值：  dom的id值
 #### 例： <a cachePage='map' data-value='http://www.baidu.com'>baidu</a>
 #### 使用场景： 变化不大，但是渲染代价大的页面

14. plugin
 #### 含义： 该页面需要加载的插件（传入插件文件名，多个用 , 隔开。插件会自动加载）
 #### 值： 插件文件名
 #### 例： <a plugin='down-more,mmap' data-value='http://www.baidu.com'>baidu</a>
 #### 使用场景： 给页面加载自定义或则系统的插件

15. href
 #### 含义： 接口地址（如果接口返回数据中存在msg字段，则会默认使用href字段作为输出提示信息）
 #### 值： 'admin/index'
 #### 例： <a href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 接口地址

16. template
 #### 含义： 页面渲染模板文件名
 #### 值： 'index'
 #### 例： <a href='www.baidu.com' tempalte='baidu'>baidu</a>
 #### 使用场景： 需要渲染界面

18. beforeQuery
 #### 含义： 发送请求前需要执行的代码
 #### 值： 函数值名链
 #### 例： <a download='true' beforeQuery='a.b'>baidu</a><script>var a = {b: function(){foo();}}</script>
 #### 使用场景： 执行请求前

19. beforeRender
 #### 含义： 渲染页面前需要执行的代码
 #### 值： 函数值名链
 #### 例： <a download='true' beforeRender='a.b'>baidu</a><script>var a = {b: function(){foo();}}</script>
 #### 使用场景： 渲染页面前要执行特定代码
 
20. afterQuery
 #### 含义： 请求后需要执行的代码
 #### 值： 函数值名链
 #### 例： <a download='true' beforeRender='a.b'>baidu</a><script>var a = {b: function(){foo();}}</script>
 #### 使用场景： 请求后要执行特定代码

21. afterRender
 #### 含义： 渲染页面前需要执行的代码
 #### 值： 函数值名链
 #### 例： <a download='true' beforeRender='a.b'>baidu</a><script>var a = {b: function(){foo();}}</script>
 #### 使用场景： 渲染页面前要执行特定代码

23. rule
 #### 含义： 数据验证规则
 #### 值： 数据验证规则path
 #### 例： <a href='login/login rule='login/login'>baidu</a>
 #### 使用场景： 需要自动验证数据

24. refresh
 #### 含义： 执行接口后刷新当前页面(默认false)
 #### 值： true | false
 #### 例： <a refresh='true' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 执行接口后刷新当前页面

25. method
 #### 含义： 直接渲染静态页面 或者 请求接口后渲染（默认 ''）
 #### 值： '' | render
 #### 例： <a method='render' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 直接渲染静态页面

26. query
 #### 含义： ajax请求时附加的参数
 #### 值： dom事件触发时为 表单控件的id名， js触发时为请求数据对象
 #### 例： <a download='true' query='name,login #passwd'>baidu</a> | Ajax.query({href: 'admin/login', query: {name: 'name', passwd:  'passwd'}});
 #### 需要附加请求参数

27. container
 #### 含义： 渲染页面的承载dom容器
 #### 值： dom选择器名
 #### 例： <a download='true' container='#app'>baidu</a>
 #### 使用场景： 将页面加载至特定dom中

28. isback
 #### 含义： 是否将该操作加入页面历史(true时 当触发浏览器返回事件时，会加载历史操作，类似返回功能)
 #### 值： true | false
 #### 例： <a isback='false' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 是否加入页面历史

29. head
 #### 含义： 是否加载头部导航以及定义导航的内容和样式（适用于移动端）
 #### 值： head配置字符串
 #### 例： <a download='true' head='1,已审核,{"attr":"href=\"user/list?status=0\" head=\"1,待审核用户\" template=\"manage_user_audit\" plugin=\"search,down-more\"","name":"待审"}'>baidu</a>
 #### 使用场景： 添加并配置移动端头部导航

30. menu
 #### 含义： 是否显示菜单（默认false，适用于移动端）
 #### 值： false | true
 #### 例： <a download='true' menu='true' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 需要设置菜单

31. callback
 #### 含义： 接口请求后执行函数
 #### 值： 函数名
 #### 例： <a callback='callback' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 需要执行自定义的请求回调函数

32. success
 #### 含义： 接口请求成功的回调
 #### 值： 回调函数名
 #### 例： <a success='success href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 需要自定义请求成功回调函数

33. failure
 #### 含义： 接口请求失败的回调
 #### 值： 回调函数名
 #### 例： <a failure='failure' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 需要自定义请求失败回调函数

34. isrender
 #### 含义： 是否渲染界面(默认 true)
 #### 值： false | true
 #### 例： <a isrender='false' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 界面操作功能时，不需要根据返回结果渲染页面的场景

35. islogin
 #### 含义： 该页面是否需要验证用户登陆情况（如果为true，则当用户未登录时，会先要求用户登陆，成功后会自动跳转到该页面， 默认 false）
 #### 值： false | true
 #### 例： <a islogin='true' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 需要用户登陆的界面

36. comfirm
 #### 含义： 需要用户确认的操作，点击后会先要求用户确认请求，确认后再执行请求
 #### 值： 需要确认的内容
 #### 例： <a confirm='是否删除' href='http://www.baidu.com'>baidu</a>
 #### 使用场景： 执行操作前需要用户再次确认的场景
 
