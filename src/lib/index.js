import message from './message'
const Message = {
  install(Vue, options) {
    Vue.component(message.name, message)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Message = Message
  Vue.use(Message)
}
export default Message