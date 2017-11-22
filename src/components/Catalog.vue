<template>
    <div class="catalog">
        <h1>{{ msg }}</h1>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>Catalog Form</h3>
                    <h5 v-if="parentModel.title">Sublevel for {{parentModel.title}}</h5>
                    <catalog-form :model="model" :parentModel="parentModel" @resetModel="resetForm()" @updateModel="updateModel" @createModel="createModel"></catalog-form>
                </div>
                <div class="col-8">
                    <h3>Catalog List</h3>
                    <!--<div id="level-1" role="tablist" aria-multiselectable="true">-->
                        <template v-for="catalogItem in listSections">
                            <catalog-list :model="catalogItem" :level="1"></catalog-list>
                        </template>
                    <!--</div>-->
                </div>
            </div>
        </div>
        <div class="block">
        </div>
    </div>
</template>

<script>
    import {required, minLength, numeric} from 'vuelidate/lib/validators'
    import CatalogType from '../Models/CatalogType'
    import Catalog from '../Models/Catalog'

    import CatalogForm from './CatalogComponents/CatalogForm.vue'
    import CatalogList from './CatalogComponents/CatalogList.vue'

    import {BUS} from '../main'


    export default {
        name: 'Catalog',
        components: {
            'catalog-form': CatalogForm,
            'catalog-list': CatalogList
        },
        data () {
            return {
                msg: 'Catalog CRUD',
                Catalog: Catalog,
                model: Catalog.copy(Catalog.getModel()),
                parentModel: {},
                dataRef: Catalog.collection
            }
        },
        created () {
            this.$bindAsArray('listSections', this.$firebaseRefs.fb_catalog.orderByChild('order'));

            BUS.$on('editCatalog', (data) => {
                this.resetForm();
                this.model = Catalog.copy(data);
            });
            BUS.$on('addSubModel', (data) => {
                this.resetForm();
                this.parentModel = Catalog.copy(data);
                this.model._ref = this.parentModel._ref + 'sublevel/'
//                console.log(this.parentModel.type)
//                CatalogType.ref().orderByChild('parent').equalTo(this.parentModel.type).once('value').then(function(snapshot){
//                    console.log(snapshot.val())
//                });

            });
            BUS.$on('deleteModel', (model) => {
                this.resetForm();
                this.parentModel = {};
                this.deleteModel(model._ref);
            });
        },
        validations: {
            model: Catalog.validations.model
        },
        firebase: {
            fb_CatalogType: {
                source: CatalogType.ref()//.orderByChild('parent').equalTo('none'),

            },
            fb_catalog: Catalog.ref().orderByChild('order')
        },
        methods: {
            resetForm: function () {
                this.model = this.Catalog.reset();
                this.parentModel = {};

                this.dataRef = Catalog.collection;
                this.model.$reset;
            },
            createModel: function (newValue) {
                this.model = newValue;
                if (!this.$v.model.$invalid) {
                    Catalog.setAttributes(this.model);
                    Catalog.create()
                    this.resetForm()
                }
            },
            updateModel: function (newValue) {
                this.model = newValue;
                if (!this.$v.model.$invalid) {
                    Catalog.setAttributes(this.model);
                    Catalog.update()
                    this.resetForm()
                }
            },
            deleteModel: function(ref){
                CatalogType.delete(ref)
            }
        }
    }
</script>

<style lang="scss">
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
