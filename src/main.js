import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import Vuelidate from 'vuelidate'

Vue.use(VueRouter);
Vue.use(VueFire);
Vue.use(Vuelidate);

// Components
import App from './App.vue'
import CatalogType from './components/CatalogType.vue'
import Catalog from './components/Catalog.vue'
// Components END

// Routs
const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/catalog-type', component: CatalogType},
        {path: '/catalog', component: Catalog}
    ]
});

// Root Component
new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
