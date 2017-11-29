import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import Vuelidate from 'vuelidate'

import underscore from 'vue-underscore';
// Object.definePrototype(Vue.prototype, '_', { value: underscore });

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueFire);
Vue.use(Vuelidate);
Vue.use(underscore);

// Components
import App from './App.vue'
import CatalogType from './components/CatalogType.vue'
import Catalog from './components/Catalog.vue'
import Product from './components/Products.vue'
import PricingSchedule from './components/PricingSchedule.vue'
// Components END

// Routs
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/catalog-type', component: CatalogType, name: "catalog-types",
            // children: [
            //     {
            //         path: ':id', component: CatalogType,
            //         name: "catalog-type",
            //         children: [
            //             {
            //                 path: 'pricing-schedule', component: CatalogType
            //             }
            //         ]
            //     }
            // ]
        },
        {path: '/catalog', component: Catalog},
        {path: '/products', name: "products", component: Product},
        {path: '/pricing-schedule', name: 'pricing-schedule', component: PricingSchedule}
    ]
});

export const BUS = new Vue();

// Root Component
var app = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
