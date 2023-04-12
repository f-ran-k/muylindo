import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

/**
 * mimic Vue v2.x's behaviour of providing an EventBus
 * 
 * call this.$eventBus.emit() instead of this.$root.emit() to make an event globally available
 * or rather this.$eventBus.on() instead of this.$root.on() to listen for custom gloabl events respectively
*/
import mitt from 'mitt'

const app = createApp(App)

app.config.globalProperties.$eventBus = mitt()

const vuetify = createVuetify({
  components,
  directives,
})

app.use(router)
app.use(vuetify)

app.mount('#app')
