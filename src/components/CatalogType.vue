<template>
    <div id="catalog-type">
        <h1>Catalog Type CRUD</h1>

        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>Catalog Type Form</h3>
                    <div class="form-catalog-type text-left">
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
                                <input id="title" type="text" v-model="model.title">
                                <span class="form-group__message" v-if="!$v.model.title.required">Title is required.</span>
                                <span class="form-group__message" v-if="!$v.model.title.minLength">Title must have at least {{ $v.model.title.$params.minLength.min }} letters.</span>
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
                                <input type="text" id="type" v-model="model.type">
                                <span class="form-group__message" v-if="!$v.model.type.required">Type is required.</span>
                            </div>
                        </div>
                        <div class="field-row">
                            <label for="parent">Parent:</label>
                            <div class="input-box">
                                <select readonly id="parent" v-model="model.parent">
                                    <option value="none">None</option>
                                    <option v-for="(option, index) in fb_catalogType" :value="option.id">{{ option.title }}</option>
                                </select>
                                <!--<span class="form-group__message" v-if="!$v.model.parent.required">Name is required.</span>-->
                            </div>
                        </div>
                        <div class="field-row">
                            <label for="active">Active:</label>
                            <div class="input-box">
                                <input type="checkbox" id="active" v-model="model.active">
                                <span class="form-group__message" v-if="!$v.model.active.required">Status is required.</span>
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
                        <button class="btn-sm btn-success" :disabled="buttons.create.disabled" v-if="model.id === ''" @click.prevent="create">Create CatalogType</button>
                        <button class="btn-sm btn-success" :disabled="buttons.update.disabled" v-if="model.id !== ''" @click.prevent="update">Update CatalogType</button>
                        <button class="btn-sm btn-warning" @click.prevent="resetForm">Reset</button>

                    </div>
                </div>
                <div class="col-8">
                    <h3>Catalog Type List (VueFire)</h3>
                    <div class="row border-bottom text-left" v-for="(catalogType, key) in fb_catalogType" v-bind:key="catalogType['.key']">
                        <div class="col-6">
                            <div class="row">
                                <div class="col-3"><b>Order:</b></div>
                                <div class="col-9">{{catalogType.order}}</div>
                            </div>
                            <div class="row">
                                <div class="col-3"><b>ID:</b></div>
                                <div class="col-9">{{catalogType['.key']}}</div>
                            </div>
                            <div class="row">
                                <div class="col-3"><b>Title:</b></div>
                                <div class="col-9">{{catalogType.title}}</div>
                            </div>
                            <div class="row">
                                <div class="col-3"><b>Description:</b></div>
                                <div class="col-9">{{catalogType.description}}</div>
                            </div>
                            <div class="row">
                                <div class="col-3"><b>Type:</b></div>
                                <div class="col-9">{{catalogType.type}}</div>
                            </div>
                            <div class="row">
                                <div class="col-3"><b>Active:</b></div>
                                <div class="col-9">{{catalogType.active}}</div>
                            </div>
                            <div class="row">
                                <div class="col-3"><b>Parent:</b></div>
                                <div class="col-9">{{catalogType.parent}}</div>
                            </div>
                        </div>
                        <div class="col-4">
                            <b>Pricing Schedule:</b>
                            <div v-if="catalogType['pricing-schedule']">
                                <div class="row">
                                    <div class="col-3"><b>{{ catalogType['pricing-schedule'].title }}:</b></div>
                                    <div class="col-9" v-if="'object' === typeof catalogType['pricing-schedule'].pricebreak">

                                        <ul v-if="catalogType['pricing-schedule'].pricebreak.length" v-for="pb in catalogType['pricing-schedule'].pricebreak">
                                            <li><b>{{ pb.amount }}</b> - {{ pb.price }}</li>
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
                        </div>
                        <div class="col-2 text-center">
                            <b>Actions</b>
                            <button class="btn-sm btn-primary" @click="editModel(catalogType['.key'])">Edit</button>
                            <button class="btn-sm btn-danger" @click="deleteModel(catalogType._ref)">delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {required, minLength, numeric} from 'vuelidate/lib/validators'
    import CatalogType from '../Models/CatalogType'
    import PricingSchedule from '../Models/PricingSchedule'

    export default {
        name: 'App',
        data () {
            return {
                msg: 'Create Catalog Types',
                buttons: {
                    update: {
                        disabled: false
                    },
                    create: {
                        disabled: false
                    }
                },
                CatalogType: CatalogType,
                model: CatalogType.copy(CatalogType.getModel()),
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
            },
            fb_PricingSchedule: {
                source: PricingSchedule.ref().orderByChild('active').equalTo(true),
                // Optional, allows you to handle any errors.
                cancelCallback(err) {
                    console.error(err);
                }
            }
        },
        methods: {
            resetForm: function () {
                this.model = this.CatalogType.reset()
                this.model.$reset
            },
            create: function () {
                if (!this.$v.model.$invalid) {
                    CatalogType.setAttributes(this.model)
                    CatalogType.create()
                    this.resetForm()
                }
            },
            update: function () {
                if (!this.$v.model.$invalid) {
                    CatalogType.setAttributes(this.model)
                    CatalogType.update()
                    this.resetForm()
                }
            },
            editModel(key){
                var $this = this
                CatalogType.findById(key).then(function (snapshot) {
                    $this.model = snapshot.val()
                    $this.model.id = snapshot.key
//                    $this.model['pricing-schedule'] = $this.model['pricing-schedule'].id
                })
                this.$v.model.$reset
            },
            deleteModel(key){
                CatalogType.delete(key)
            },
            updateModelPricingSchedule: function () {
                var $that = this;

                if($that.model['pricing-schedule-id'] !== '' && $that.model['pricing-schedule-id'] !== undefined){
                    $that.buttons.create.disabled = true;
                    $that.buttons.update.disabled = true;

                    PricingSchedule.findById($that.model['pricing-schedule-id']).then(function (s) {
                        $that.model['pricing-schedule'] = CatalogType.copy(s.val());

                        $that.buttons.create.disabled = false;
                        $that.buttons.update.disabled = false;
                    });
                } else {
                    $that.model['pricing-schedule'] = [];
                }
            }
        },
        created: function () {
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
