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
    Vue.component(message.name, message)
    let MessageConstructor = Vue.extend(message); // 写插件需要用到的
    Vue.prototype.$message = funMessage
    function buildProps (args) {
      console.log(args, 'args....')
      let props = {}
      props.message = args.message
      props.type = args.type
      console.log(props, 'props.....222222')
      console.log(options, 'options.....333333')
      if (typeof options === 'string') {
        props = {
          message: options
        };
      }
      return props
    }

    function funMessage () {
      console.log(arguments, 'arguments.....')
      if (!arguments[0]) return
      const propsData = buildProps(arguments[0])
      const instance = new MessageConstructor({propsData})
      document.body.appendChild(instance.$mount().$el)
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
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return MessagePlug(options);
  };
});
export default MessagePlug