<template>
    <div class="pricin-schedule">
        <h1>{{ msg }}</h1>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h3>PricingSchedule Form</h3>
                    <div class="text-left form-catalog-type">
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
                                <input id="description" type="text" v-model="model.description">
                                <span class="form-group__message" v-if="!$v.model.description.minLength">Description must have at least {{ $v.model.description.$params.minLength.min }} letters.</span>
                            </div>
                        </div>
                        <div class="field-row">
                            <label for="active">Active:</label>
                            <div class="input-box">
                                <input type="checkbox" id="active" v-model="model.active">
                            </div>
                        </div>
                        <div class="field-row border-bottom">
                            <label for="multiplier">Multiplier:</label>
                            <div class="input-box">
                                <input type="checkbox" id="multiplier" v-model="model.multiplier">
                            </div>
                        </div>

                        <div class="field-row">
                            <label>Pricebreaks:</label>
                            <button class="btn-sm btn-success" @click.prevent="addPricebreak">Add</button>
                        </div>
                        <div class="container">
                            <div class="row">
                                <div class="col-12" v-for="(pricebreakItem, index) in model.pricebreak" v-bind:key="index">
                                    <div class="row pricebrea-list">
                                        <div class="col-8">
                                            <div class="row">
                                                <div class="col-12">
                                                    <p>Dependants: {{ index }}</p>
                                                </div>
                                                <!--<div class="col-6">-->
                                                    <!--<input id="amount" readonly type="text" :value="">-->
                                                <!--</div>-->
                                            </div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <label for="price">Price:</label>
                                                </div>
                                                <div class="col-6">
                                                    <input id="price" type="text" v-model="pricebreakItem.price">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <button type="button" class="btn btn-link" @click.prevent="model.pricebreak.splice(index, 1)">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn-sm btn-success" v-if="model.id === ''" @click.prevent="create">Create</button>
                        <button class="btn-sm btn-success" v-if="model.id !== ''" @click.prevent="update">Update</button>
                        <button class="btn-sm btn-warning" @click.prevent="resetForm">Reset</button>
                    </div>
                </div>
                <div class="col-8">
                    <div class="row">
                        <div class="col-12">
                            <h3>PricingSchedule List</h3>
                            <!--<template v-if="fb_PricingSchedule">-->
                                <div class="row border-bottom text-left" v-for="(item, key) in fb_PricingSchedule" v-bind:key="item['.key']">
                                    <div class="col-6">
                                        <div class="row">
                                            <div class="col-3"><b>ID:</b></div>
                                            <div class="col-9">{{item['.key']}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3"><b>Title:</b></div>
                                            <div class="col-9">{{item.title}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3"><b>Description:</b></div>
                                            <div class="col-9">{{item.description}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3"><b>Active:</b></div>
                                            <div class="col-9">{{item.active}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3"><b>Multiplier:</b></div>
                                            <div class="col-9">{{item.multiplier}}</div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <b>Pricebreaks:</b>
                                        <div v-if="item.pricebreak.length > 0">
                                            <ul>
                                                <li v-for="(value, index) in item.pricebreak">
                                                    <b>Dependants:</b> {{index}}<br>
                                                    <b>Price:</b> {{value.price}}
                                                </li>
                                            </ul>
                                        </div>
                                        <div v-else>
                                            <i>Pricebreaks not found</i>
                                        </div>
                                    </div>
                                    <div class="col-3 text-center">
                                        <div><b>Actions</b></div>
                                        <button class="btn-sm btn-primary" @click="editModel(item['.key'])">Edit</button>
                                        <button class="btn-sm btn-secondary" @click="copyModel(item['.key'])">Copy</button>
                                        <button class="btn-sm btn-danger" @click="deleteModel(item._ref)">delete</button>
                                    </div>
                                </div>
                            <!--</template>-->
                            <!--<template v-else>-->
                                <!--<i>Pricing Schedules not found</i>-->
                            <!--</template>-->
                        </div>
                        <div class="col-12">
                            <h3>PricingSchedule Multiplier List</h3>
                            <!--<template v-if="fb_PricingSchedule.length > 0">-->
                                <div class="row border-bottom text-left" v-for="(item, key) in fb_PricingScheduleMultiplier" v-bind:key="item['.key']">
                                    <div class="col-6">
                                        <div class="row">
                                            <div class="col-3"><b>ID:</b></div>
                                            <div class="col-9">{{item['.key']}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3"><b>Title:</b></div>
                                            <div class="col-9">{{item.title}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3"><b>Description:</b></div>
                                            <div class="col-9">{{item.description}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3"><b>Active:</b></div>
                                            <div class="col-9">{{item.active}}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3"><b>Multiplier:</b></div>
                                            <div class="col-9">{{item.multiplier}}</div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <b>Pricebreaks:</b>
                                        <div v-if="item.pricebreak.length > 0">
                                            <ul>
                                                <li v-for="(value, index) in item.pricebreak">
                                                    <b>Dependants:</b> {{index}}<br>
                                                    <b>Price:</b> {{value.price}}
                                                </li>
                                            </ul>
                                        </div>
                                        <div v-else>
                                            <i>Pricebreaks not found</i>
                                        </div>
                                    </div>
                                    <div class="col-3 text-center">
                                        <div><b>Actions</b></div>
                                        <button class="btn-sm btn-primary" @click="editModel(item['.key'])">Edit</button>
                                        <button class="btn-sm btn-secondary" @click="copyModel(item['.key'])">Copy</button>
                                        <button class="btn-sm btn-danger" @click="deleteModel(item['_ref'])">delete</button>
                                    </div>
                                </div>
                            <!--</template>-->
                            <!--<template v-else>-->
                                <!--<i>Pricing Schedules not found</i>-->
                            <!--</template>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block">
        </div>
    </div>
</template>

<script>
    import {required, minLength, numeric} from 'vuelidate/lib/validators'
    import PricingSchedule from '../Models/PricingSchedule'
    import Pricebreak from '../Models/Pricebreak'

    export default {
        name: 'pricin-schedule',
        data () {
            return {
                msg: 'PricingSchedule CRUD',
                Object: PricingSchedule,
                model: PricingSchedule.getModel()
            }
        },
        validations: {
            model: PricingSchedule.validations.model
        },
        firebase: {
            fb_PricingSchedule: PricingSchedule.ref().orderByChild('multiplier').equalTo(false),
            fb_PricingScheduleMultiplier: PricingSchedule.ref().orderByChild('multiplier').equalTo(true)
        },
        methods: {
            addPricebreak(){
                if ("object" !== typeof this.model.pricebreak) {
                    this.model.pricebreak = []
                }
                this.model.pricebreak.push(Pricebreak.copy(Pricebreak.default))
            },
            resetForm: function () {
                this.model = this.Object.reset()
                this.model.$reset
            },
            create: function () {
                if (!this.$v.model.$invalid) {
                    this.Object.setAttributes(this.model)
                    this.Object.create()
                    this.resetForm()
                }
            },
            update: function () {
                if (!this.$v.model.$invalid) {
                    this.Object.setAttributes(this.model)
                    this.Object.update()
                    this.resetForm()
                }
            },
            editModel(key){
                var $this = this
                this.Object.findById(key).then(function (snapshot) {
                    $this.model = snapshot.val()
                    $this.model.id = snapshot.key
                })
                this.$v.model.$reset
            },
            copyModel(key){
                var $this = this
                this.Object.findById(key).then(function (snapshot) {
                    console.log(snapshot.val())
                    $this.model = $this.Object.copy(snapshot.val());
                    $this.model.id = '';
                    $this.model._ref = $this.Object.collection;
                    console.info($this.model)
                })
                this.$v.model.$reset
            },
            deleteModel(key){
                this.Object.delete(key)
            }
        }
    }
</script>

<style scoped>
    .pricebrea-list {
        padding: 3px 0;
        margin-bottom: 5px;
        background-color: #f5f5f5;
    }

    .pricebrea-list label {
        width: 70px;
    }

    .pricebrea-list input {
        width: 100px;
    }
</style>
