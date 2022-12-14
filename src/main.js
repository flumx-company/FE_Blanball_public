

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import VCalendar from 'v-calendar';
import App from './App.vue'
import router from './router'
import pkg from '../package'


import './assets/main.css'
import 'v-calendar/dist/style.css';
import 'v3-infinite-loading/lib/style.css'
import { UA_LANGUAGE } from "./i18n/ua";
import { createLoader } from "./workers/loading-worker/loading.worker";
import Toast from "vue-toastification";
const i18n = createI18n({
    locale: 'ua',
    allowComposition: true,
    messages: {
        ua: UA_LANGUAGE
    }
});

createLoader();
const app = createApp(App);
app.provide('clientVersion', pkg.version);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(VCalendar, {})
app.mount('#app');
app.use(Toast);
// }, 4000)
