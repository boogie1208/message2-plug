import message from './message'
// const MessagePlug = {
//   install(Vue, options) {
//     Vue.component(message.name, message)
//   }
// }
// if (typeof window !== 'undefined' && window.Vue) {
//   window.MessagePlug = MessagePlug
//   Vue.use(MessagePlug)
// }
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
};
const MessagePlug = {
  install(Vue, options) {
    // Vue.component(message.name, message)
    let MessageConstructor = Vue.extend(message); // 写插件需要用到的
    Vue.prototype.$message = funMessage
    function buildProps (args) {
      let props = {}
      props.message = args.message
      props.type = args.type
      return props
    }

    function funMessage () {
      if (!arguments[0]) return
      if (typeof arguments[0] === 'string') {
        arguments[0] = {
          message: arguments[0]
        };
      }
      const propsData = buildProps(arguments[0])
      const instance = new MessageConstructor({propsData})
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el)
      // const instance = new MessageConstructor({propsData})
      // document.body.appendChild(instance.$mount().$el)
    }
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.MessagePlug = MessagePlug
  Vue.use(MessagePlug)
}
// 给MessagePlug增加四个直接调用的方法
// 支持this.$message.success('xxx')方式调用，等同于this.$message({type: 'success',message: 'xxx'})
['success', 'warning', 'info', 'error'].forEach(type => {
  MessagePlug[type] = options => {
    console.log(options, 'options.....11111111111')
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    console.log(options, 'options.....22222222222')
    return MessagePlug(options);
  };
  console.log(MessagePlug[type], 'options.....333333')
});
export default MessagePlug