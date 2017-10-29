# littlee
A easy way to master h5

# littlee
一个简单而强大的单页面h5框架。告别混乱的js代码，只需简单的配置【标签属性】和【插件】，即可轻松实现强大及复杂的业务逻辑。
高度的代码复用。
如果你因项目越来越复杂的前端业务逻辑而困扰，如果你因业务逻辑与效果代码混乱而困扰，如果你想让代码越写越轻松，如果你想要一个懂你的小助手，如果你是一个追求简洁的“艺术家”，如果你是个喜欢创造的大师，那么请加入littlee，尽情展示或运用你的激情吧！请让我们一起告别混乱、繁琐、乏味以及那些限制并困扰我们的无聊吧！
在这里，【创造家】可以创造精美的【plugin】，而【艺术家】可以运用这些【plugin】来创建美妙的艺术品。

# 依赖
1. art-template，一个简单而强大的前端渲染引擎。本框架使用阿里团队开发的 基于【art-template语法】的前端模板预编译工具。
  （模板位于template/tpl/中，于该目录下执行如下命令，即可编译模板： tmod）qj
2. jquery
3. iscroll5
4. swiper

# 用法
1. 在index.html中引入【css文件】及【jquery, lib/littlee/index.js】
2. 启动应用，使用类似如下代码：
  Ajax.query({href: '#', islogin: true, template: 'index', method: 'render', success: 'index.index', controller: 'index'});
3. 应用逻辑跳转，方式有二：
  1. 只需通过【Ajax.query】方法，即可渲染静态页面，或者从服务器端获取数据并渲染相应模板。
  2. 通过 【a标签】或者 含有 【query】class类的标签触发页面逻辑。本方法本质是方式1的调用，通过标签属性传递参数。
  
文档编辑ing。。。
