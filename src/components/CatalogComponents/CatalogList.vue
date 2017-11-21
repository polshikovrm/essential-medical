<template>
    <div class="catalog-list">
        <div class="container">
            <div class="row">
                <div class="col">
                    <table :class="['level-' + level]">
                        <tr>
                            <td>
                                <div class="row">
                                    <div class="col-12">
                                        <h5>{{ model.title }}</h5>
                                    </div>
                                    <div class="col-12">
                                        <p>{{ model.description }}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <b>Type:</b> {{ modelTypeText[model.type].title }}
                                {{ model.type }}
                            </td>
                            <td width="110">
                                <b>Controls:</b><br>
                                <div class="row text-left">
                                    <div class="col-12">
                                        <template v-if="model['pricing-schedule']">
                                            <modal-simple :btnLabel="'View Rates'" :btnTarget="model.slug + '-' + model.id" :modalTitle="'Pricing Schedule for ' + model.title" :modalContent="''">
                                                <template slot="modalCustomBody">
                                                    <div v-if="model['pricing-schedule']">
                                                        <div class="row">
                                                            <div class="col-3"><b>{{ model['pricing-schedule'].title }}:</b></div>
                                                            <div class="col-9" v-if="'object' === typeof model['pricing-schedule'].pricebreak">

                                                                <ul v-if="model['pricing-schedule'].pricebreak.length" v-for="pb in model['pricing-schedule'].pricebreak">
                                                                    <li><b>{{ pb.amount }}</b> - R{{ pb.price }}</li>
                                                                </ul>
                                                            </div>
                                                            <div v-else class="col-9">
                                                                <i>Pricebreaks not found</i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else>
                                                        <i>Not set</i>
                                                    </div>
                                                </template>
                                            </modal-simple>
                                        </template>
                                    </div>
                                    <div class="col-12">
                                        <button type="button" class="btn-sm btn-primary" @click="editModel(model)">Edit Catalog</button>
                                    </div>
                                    <div class="col-12">
                                        <button type="button" class="btn-sm btn-secondary"  @click="addSubModel(model)">Add Sublevel</button>
                                    </div>
                                    <div class="col-12">
                                        <button type="button" class="btn-sm btn-danger" @click="deleteModel(model)">Delete</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <b>ref:</b> {{ model._ref }}
                            </td>
                        </tr>
                        <tr v-if="listSections.length">
                            <td colspan="4">
                                <template v-for="catalogItem in listSections">
                                    <catalog-list :model="catalogItem" @update:listData="updateCatalogItem(newVal)" :level="level+1"></catalog-list>
                                </template>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CatalogType from '../../Models/CatalogType'
    import Catalog from '../../Models/Catalog'

    import {BUS} from '../../main'
    import ModalSimple from '../common/modal-simple.vue'

    export default {
        name: 'catalog-list',
        components: {
            'catalog-form': require('./CatalogForm.vue'),
            'modal-simple': ModalSimple,
        },
        props: ['model', 'level'],
        data () {
            return {
                msg: 'Catalog CRUD',
                Catalog: Catalog
            }
        },
        computed: {
        },
        created() {
//            this.$firebaseRefs.fb_catalogSublevel = Catalog.fb.db.ref(this.$props.model._ref + 'sublevel/').orderByChild('order');

            this.$bindAsArray('listSections', Catalog.fb.db.ref(this.$props.model._ref + 'sublevel/').orderByChild('order'));
            this.$bindAsObject('modelTypeText', CatalogType.ref().orderByChild('id').equalTo(this.model.type));
        },
        validations: {
            model: Catalog.validations.model
        },
        firebase: {
            fb_CatalogType: CatalogType.ref().orderByChild('parent').equalTo('none'),
            fb_catalog: Catalog.ref().orderByChild('order'),
//            fb_SublevelTypes: CatalogType.ref().orderByChild('parent').equalTo(this.Catalog.type)
        },
        methods: {
            editModel(model){
                BUS.$emit('editCatalog', model);
            },
            addSubModel(model){
                BUS.$emit('addSubModel', model);
            },
            deleteModel(model){
                BUS.$emit('deleteModel', model);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*td{*/
        /*border: 1px solid darkgray;*/
    /*}*/
    .level-1, .level-2, .level-3, .level-4{
        margin: 5px 0px 5px 0px;
    }

    .level-1 td{
        border: 3px solid black;
    }

    .level-2 td{
        border: 2px solid #999;
    }

    .level-3 td{
        border: 1px solid #CCC;
    }

    .level-4 td{
        border: 1px solid #EEE;
    }
</style>
