<template>
    <div class="catalog-form">
        <div class="container text-left">
            <div class="row">
                <div class="col">
                    <div class="form-catalog-type">
                        <div class="field-row">
                            <span class="form-group__message" v-if="$v.model.$invalid">Form is not Valid</span>
                        </div>
                        <div class="field-row">
                            <label for="id">Id:</label>
                            <input id="id" readonly type="text" v-bind:value="model.id">
                        </div>
                        <div class="field-row">
                            <label for="title">Title:</label>
                            <div class="input-box">
                                <input id="title" @keyup="getSlug" type="text" v-model="model.title">
                                <span class="form-group__message" v-if="!$v.model.title.required">Title is required.</span>
                                <span class="form-group__message" v-if="!$v.model.title.minLength">Title must have at least {{ $v.model.title.$params.minLength.min }} letters.</span>
                            </div>
                        </div>
                        <div class="field-row">
                            <label for="slug">Slug:</label>
                            <div class="input-box">
                                <input id="slug" type="text" v-model="model.slug">
                                <span class="form-group__message" v-if="!$v.model.slug.required">Slug is required.</span>
                                <span class="form-group__message" v-if="!$v.model.slug.minLength">Slug must have at least {{ $v.model.slug.$params.minLength.min }} letters.</span>
                            </div>
                        </div>
                        <div class="field-row">
                            <label for="description">Description:</label>
                            <div class="input-box">
                                <textarea id="description" cols="32" rows="3" v-model="model.description"></textarea>
                                <span class="form-group__message" v-if="!$v.model.description.minLength">Description must have at least {{ $v.model.description.$params.minLength.min }} letters.</span>
                            </div>
                        </div>
                        <div class="field-row">
                            <label for="type">Type:</label>
                            <div class="input-box">
                                <select name="" id="type" v-model="model.type">
                                    <!--<option value="">None</option>-->
                                    <option v-for="(option, key) in typesList" v-bind:key="option['.key']" :value="option['.key']">{{ option.title }}</option>
                                </select>
                                <span class="form-group__message" v-if="!$v.model.type.required">Type is required.</span>
                            </div>
                        </div>
                        <div class="field-row">
                            <label for="active">Active:</label>
                            <div class="input-box">
                                <input type="checkbox" id="active" v-model="model.active">
                            </div>
                        </div>
                        <div class="field-row">
                            <label for="order">Order:</label>
                            <div class="input-box">
                                <input type="number" id="order" v-model="model.order">
                                <span class="form-group__message" v-if="!$v.model.order.required">Order is required.</span>
                            </div>
                        </div>
                        <div class="field-row">
                            <label for="price_schedule">Pricing Schedule:</label>
                            <div class="input-box">
                                <select id="price_schedule" @change="updateModelPricingSchedule" v-model="model['pricing-schedule-id']">
                                    <option value="">None</option>
                                    <option v-for="(option, index) in fb_PricingSchedule" :value="option.id">{{ option.title }}
                                        <template v-if="option.multiplier">(M)</template>
                                    </option>
                                </select>
                            </div>
                        </div>
                        <button type="button" class="btn btn-success" :disabled="buttons.create.disabled" v-if="model.id === ''" @click.prevent="createCatalog">Create Catalog</button>
                        <button type="button" class="btn btn-primary" :disabled="buttons.update.disabled" v-if="model.id !== ''" @click.prevent="updateCatalog">Update Catalog</button>
                        <button type="button" class="btn btn-warning" @click.prevent="resetFormCatalog">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CatalogType from '../../Models/CatalogType'
    import Catalog from '../../Models/Catalog'
    import PricingSchedule from '../../Models/PricingSchedule'

    export default {
        name: 'catalog-form',
//        components: {
//            'catalog-form': require('./CatalogForm.vue')
//        },
        props: ['model', 'parentModel'],
        data () {
            return {
                msg: 'Catalog CRUD',
                Catalog: Catalog,
                buttons: {
                    update: {
                        disabled: false
                    },
                    create: {
                        disabled: false
                    }
                },
            }
        },
        computed: {
            typesList(){
                if(this.parentModel.type == undefined){
                    this.parentModel.type = 'none';
                }
//                let list = [];
//                return CatalogType.ref().orderByChild('parent').equalTo(this.parentModel.type).once('value').then(function(snapshot){
//                    Object.keys(snapshot.val()).map(function(objectKey, index) {
//                        list.push(snapshot.val()[objectKey]);
//                    });
////                    snapshot.val()
//                    console.log(list)
//                    return list;
//                });
                this.$bindAsArray('items', CatalogType.ref().orderByChild('parent').equalTo(this.parentModel.type))
                return this.items;
            }
        },
        watch: {
            typesList: function(val){
                this.model.type = this.items[0] !== undefined ? this.items[0].id : ''
            }
        },
        created(){},
        validations: {
            model: Catalog.validations.model
        },
        firebase: {
            fb_CatalogType: CatalogType.ref(),//.orderByChild('parent').equalTo('none'),
            fb_catalog: Catalog.ref().orderByChild('order'),
            fb_PricingSchedule: PricingSchedule.ref().orderByChild('active').equalTo(true),
//            fb_SublevelTypes: CatalogType.ref().orderByChild('parent').equalTo(this.Catalog.type)
        },
        methods: {
            getSlug(){
                let Text = this.model.title;
                Text = Text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                this.model.slug = Text;
            },
            createCatalog: function () {
                if (!this.$v.model.$invalid) {
                    this.$emit('createModel', this.model);
                }
            },
            updateCatalog: function () {
                if (!this.$v.model.$invalid) {
                    this.$emit('updateModel', this.model);
                }
            },
            resetFormCatalog: function () {
                this.$emit('resetModel');
            },
            updateModelPricingSchedule: function () {
                debugger
                var $that = this;

                if($that.model['pricing-schedule-id'] !== '' && $that.model['pricing-schedule-id'] !== undefined){
                    $that.buttons.create.disabled = true;
                    $that.buttons.update.disabled = true;

                    PricingSchedule.findById($that.model['pricing-schedule-id']).then(function (s) {
                        debugger
                        $that.model['pricing-schedule'] = CatalogType.copy(s.val());

                        $that.buttons.create.disabled = false;
                        $that.buttons.update.disabled = false;
                    });
                } else {
                    $that.model['pricing-schedule'] = [];
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
