<template>
    <div id="catalog-type">
        <h1>Catalog Type CRUD</h1>

        <div class="block">
            <div class="col3">
                <h3>Catalog Type Form</h3>
                <div class="form-catalog-type">
                    <div class="field-row">
                        <span class="form-group__message" v-if="$v.model.$invalid">Form is not Valid</span>
                    </div>
                    <div class="field-row">
                        <label for="ct_id">Id:</label>
                        <input id="ct_id" type="text" v-bind:value="model.id"><i>Hidden</i>
                    </div>
                    <div class="field-row">
                        <label for="ct_title">Title:</label>
                        <div class="input-box">
                            <input id="ct_title" type="text" v-model="model.title">
                            <span class="form-group__message" v-if="!$v.model.title.required">Name is required.</span>
                            <span class="form-group__message" v-if="!$v.model.title.minLength">Name must have at least {{ $v.model.title.$params.minLength.min }} letters.</span>
                        </div>
                    </div>
                    <div class="field-row">
                        <label for="ct_description">Description:</label>
                        <div class="input-box">
                            <input id="ct_description" type="text" v-model="model.description">
                            <span class="form-group__message" v-if="!$v.model.description.minLength">Name must have at least {{ $v.model.description.$params.minLength.min }} letters.</span>
                        </div>
                    </div>
                    <div class="field-row">
                        <label for="ct_type">Type:</label>
                        <div class="input-box">
                            <input type="text" id="ct_type" v-model="model.type">
                            <span class="form-group__message" v-if="!$v.model.type.required">Name is required.</span>
                        </div>
                    </div>
                    <div class="field-row">
                        <label for="ct_parent">Parent:</label>
                        <div class="input-box">
                            <select id="ct_parent" v-model="model.parent">
                                <option value="">None</option>
                                <option v-for="(option, index) in fb_catalogType" :value="option.id">{{ option.title }}</option>
                            </select>
                            <!--<span class="form-group__message" v-if="!$v.model.parent.required">Name is required.</span>-->
                        </div>
                    </div>
                    <div class="field-row">
                        <label for="ct_active">Active:</label>
                        <div class="input-box">
                            <input type="checkbox" id="ct_active" v-model="model.active">
                            <span class="form-group__message" v-if="!$v.model.active.required">Name is required.</span>
                        </div>
                    </div>
                    <div class="field-row">
                        <label for="ct_order">Order:</label>
                        <div class="input-box">
                            <input type="number" id="ct_order" v-model="model.order">
                            <span class="form-group__message" v-if="!$v.model.order.required">Name is required.</span>
                        </div>
                    </div>
                    <button v-if="model.id === ''" @click.prevent="createCatalogType">Create CatalogType</button>
                    <button v-if="model.id !== ''" @click.prevent="updateCatalogType">Update CatalogType</button>
                    <button @click.prevent="resetFormCatalogType">Reset</button>
                </div>
            </div>
            <div class="col2-3">
                <h3>Catalog Type List (VueFire)</h3>
                <table>
                    <tr v-for="(catalogType, key) in fb_catalogType" v-bind:key="catalogType['.key']">
                        <td>
                            <b>{{catalogType.order}}</b>
                        </td>
                        <td>
                            <b>Id:</b> {{catalogType['.key']}}
                        </td>
                        <td>
                        </td>
                        <td>
                            <b>Title:</b> {{catalogType.title}}
                        </td>
                        <td>
                            <b>Type:</b> {{catalogType.type}}
                        </td>
                        <td>
                            <b>Parent:</b> {{catalogType.parent}}
                        </td>
                        <td>
                            <b>Controls:</b>
                            <button @click="editModelCatalogType(catalogType['.key'])">Edit</button>
                            <button @click="deleteModelCatalogType(catalogType['.key'])">delete</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, minLength, numeric} from 'vuelidate/lib/validators'
    import CatalogType from '../Models/CatalogType'


    export default {
        name: 'App',
        data () {
            return {
                msg: 'Create Catalog Types',
                CatalogType: CatalogType,
                model: CatalogType.model,
                listData: [],
            }
        },
        validations: {
            model: CatalogType.validations.model,
        },
        firebase: {
            fb_catalogType: {
                source: CatalogType.ref().orderByChild('order'),
                // Optional, allows you to handle any errors.
                cancelCallback(err) {
                    console.error(err);
                }
            }
        },
        methods: {
            resetFormCatalogType: function () {
                this.model = this.CatalogType.reset()
                this.model.$reset
            },
            createCatalogType: function () {
                if (!this.$v.model.$invalid) {
                    CatalogType.setAttributes(this.model)
                    CatalogType.create()
                    this.resetFormCatalogType()
                }
            },
            updateCatalogType: function () {
                if (!this.$v.model.$invalid) {
                    CatalogType.setAttributes(this.model)
                    CatalogType.update()
                    this.resetFormCatalogType()
                }
            },
            editModelCatalogType(key){
                var $this = this
                CatalogType.findById(key).then(function (snapshot) {
                    $this.model = snapshot.val()
                    $this.model.id = snapshot.key
                })
                this.$v.model.$reset
            },
            deleteModelCatalogType(key){
                CatalogType.delete(key)
            }
        },
        created: function () {
//            var $this = this
//
//            $this.listData = CatalogType.findAllOrderBy('order').then(function (snapshot) {
//                console.log(snapshot)
//                $this.listData = snapshot.val()
//            })

//            CatalogType.findAllOrderBy('order').equalTo('Alex').on('child_added',  ...)
        }
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
