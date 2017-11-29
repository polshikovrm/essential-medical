<template>
    <div id="app">
        <img src="./assets/logo.png" height="30">
        <div>
            <ul class="nav-menu">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <a href="/docs/">Swagger</a>
                </li>
                <li>
                    <router-link :to="{name:'pricing-schedule'}">Pricing Schedule</router-link>
                </li>
                <li>
                    <router-link to="/catalog-type">Catalog Type</router-link>
                </li>
                <li>
                    <router-link to="/catalog">Catalog</router-link>
                </li>
                <li>
                    <router-link :to="{name:'products'}">Products</router-link>
                </li>
            </ul>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    import {required, minLength, numeric} from 'vuelidate/lib/validators'
    import CatalogType from './Models/CatalogType'
    import Catalog from './Models/Catalog'


    export default {
        name: 'App',
        data () {
            return {
                msg: 'Create Catalog Types'
            }
        },
        methods: {},
        created: function () {}
    }
</script>
<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    table{
        width: 100%;
    }

    h1, h2 {
        font-weight: normal;
    }

    a {
        color: #42b983;
    }

    button{
        margin: 2px 2px 0 0;
    }

    ul.nav-menu{
        list-style-type: none;
        padding: 0;
    }

    ul.nav-menu li {
        display: inline-block;
        margin: 0 10px;
    }

    .form-catalog-type {
        width: 100%;
        min-width: 200px;
        margin: 0 auto;
    }

    .form-catalog-type label {
        width: 100px;
        display: block;
        float: left;
    }

    .field-row:after, .block:after {
        display: block;
        clear: both;
        content: '';
    }

    .input-box span {
        display: block;
    }

    .form-group__message, .error {
        color: red;
    }

    .border-bottom{
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
    }
</style>
