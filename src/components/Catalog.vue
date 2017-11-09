<template>
    <div class="catalog">
        <h1>{{ msg }}</h1>
        <div class="block">
            <div class="col3">
                <h3>Catalog Form</h3>
                <div class="form-catalog-type">
                    <div class="field-row">
                        <span class="form-group__message" v-if="$v.model.$invalid">Form is not Valid</span>
                    </div>
                    <div class="field-row">
                        <label for="c_id">Id:</label>
                        <input id="c_id" type="text" v-bind:value="model.id"><i>Hidden</i>
                    </div>
                    <div class="field-row">
                        <label for="c_title">Title:</label>
                        <div class="input-box">
                            <input id="c_title" type="text" v-model="model.title">
                            <span class="form-group__message" v-if="!$v.model.title.required">Name is required.</span>
                            <span class="form-group__message" v-if="!$v.model.title.minLength">Name must have at least {{ $v.model.title.$params.minLength.min }} letters.</span>
                        </div>
                    </div>
                    <div class="field-row">
                        <label for="c_description">Description:</label>
                        <div class="input-box">
                            <input id="c_description" type="text" v-model="model.description">
                            <span class="form-group__message" v-if="!$v.model.description.minLength">Name must have at least {{ $v.model.description.$params.minLength.min }} letters.</span>
                        </div>
                    </div>
                    <div class="field-row">
                        <label for="c_type">Type:</label>
                        <div class="input-box">
                            <select name="" id="c_type">
                                <option v-for="option in fb_CatalogType" v-bind:key="option['.key']" @value="option['.key']">{{ option.title }}</option>
                            </select>
                            <span class="form-group__message" v-if="!$v.model.type.required">Name is required.</span>
                        </div>
                    </div>
                    <div class="field-row">
                        <label for="c_active">Active:</label>
                        <div class="input-box">
                            <input type="checkbox" id="c_active" v-model="model.active">
                            <span class="form-group__message" v-if="!$v.model.active.required">Name is required.</span>
                        </div>
                    </div>
                    <div class="field-row">
                        <label for="c_order">Order:</label>
                        <div class="input-box">
                            <input type="number" id="c_order" v-model="model.order">
                            <span class="form-group__message" v-if="!$v.model.order.required">Name is required.</span>
                        </div>
                    </div>
                    <button v-if="model.id === ''" @click.prevent="createCatalog">Create Catalog</button>
                    <button v-if="model.id !== ''" @click.prevent="updateCatalog">Update Catalog</button>
                    <button @click.prevent="resetFormCatalog">Reset</button>


                    <div class="field-row">
                        <!--<label for="c_parent">Sublevels:</label>-->
                        <!--<div class="input-box">-->
                        <!--<button @click.prevent="addCatalogSublevel">Add Sublevel</button>-->
                        <button @click.prevent="model.sublevel.push(new CatalogType())">Add Sublevel</button>
                        <!--</div>-->
                    </div>
                </div>
            </div>
            <div class="col3">
                <h3>Catalog Form</h3>
                <catalog-form :tempo="tempo"></catalog-form>
            </div>
            <div class="col2-3">
                <h3>Catalog List</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, minLength, numeric} from 'vuelidate/lib/validators'
    import CatalogType from '../Models/CatalogType'
    import Catalog from '../Models/Catalog'

    import CatalogForm from './CatalogComponents/CatalogForm.vue'


    export default {
        name: 'Catalog',
        components: {
            'catalog-form': CatalogForm
        },
        data () {
            return {
                msg: 'Catalog CRUD',
                Catalog: Catalog,
                model: Catalog.getModel(),
                listData: [],
                tempo: [
                    {
                        name: 1,
                        sublevel: [
                            {
                                name: 3,
                                sublevel: [
                                    {
                                        name: 1,
                                        sublevel: [
                                            {
                                                name: 3,
                                                sublevel: []
                                            }
                                        ]
                                    },
                                    {
                                        name: 2,
                                        sublevel: [
                                            {
                                                name: 4,
                                                sublevel: []
                                            },
                                            {
                                                name: 5,
                                                sublevel: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 2,
                        sublevel: [
                            {
                                name: 4,
                                sublevel: []
                            },
                            {
                                name: 5,
                                sublevel: []
                            }
                        ]
                    }
                ]
            }
        },
        computed: {},
        validations: {
            model: Catalog.validations.model
        },
        firebase: {
            fb_CatalogType: CatalogType.ref().orderByChild('parent').equalTo('none'),
            fb_catalog: Catalog.ref().orderByChild('order')
        },
        methods: {}
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

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0 10px;
        width: 100%;
    }

    a {
        color: #42b983;
    }

    .block {
        width: 100%;
        min-width: 400px;
        max-width: 1200px;
        min-height: 10px;
        margin: 0 auto;
        text-align: left;
    }

    .col2 {
        width: 49%;
        padding-left: 5px;
        float: left;
    }

    .col3, .col1-3 {
        width: 33%;
        padding-left: 5px;
        float: left;
    }

    .col2-3 {
        width: 66%;
        padding-left: 5px;
        float: left;
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

    .form-group__message {
        color: red;
    }
</style>
