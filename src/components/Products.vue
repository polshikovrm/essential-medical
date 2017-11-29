<template>
    <div class="catalog">
        <h1>{{ msg }}</h1>
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <h3>Product Form</h3>
                    <div class="container text-left">
                        <div class="row">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-12">
                                        <span class="form-group__message" v-if="$v.model.$invalid">Form is not Valid</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <label for="id">Id:</label>
                                    </div>
                                    <div class="col-8">
                                        <input id="id" readonly type="text" v-bind:value="model.id">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <label for="title">Title:</label>
                                    </div>
                                    <div class="col-8">
                                        <input id="title" type="text" v-model="model.title">
                                        <span class="form-group__message" v-if="!$v.model.title.required">Title is required.</span>
                                        <span class="form-group__message" v-if="!$v.model.title.minLength">Title must have at least {{ $v.model.title.$params.minLength.min }} letters.</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label for="description">Description:</label>
                                        <textarea id="description" cols="34" rows="3" v-model="model.description"></textarea>
                                        <span class="form-group__message" v-if="!$v.model.description.minLength">Description must have at least {{ $v.model.description.$params.minLength.min }} letters.</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <label for="dependants">Dependants:</label>
                                    </div>
                                    <div class="col-8">
                                        <input id="dependants" type="number" v-model="model.dependants">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        <label for="rate">Rate:</label>
                                    </div>
                                    <div class="col-8">
                                        <input id="rate" readonly type="number" v-model="model.rate">
                                    </div>
                                </div>
                                <!--<div class="row">-->
                                <!--<div class="col-3">-->
                                <!--<label for="catalogs">Catalogs:</label>-->
                                <!--</div>-->
                                <!--<div class="col-6">-->
                                <!--<select id="catalogs" @change="updateModelCatalogs" v-model="model['catalogs']">-->
                                <!--<option value="">None</option>-->
                                <!--<option v-for="(option, index) in fb_catalogs" :value="option.id">{{ option.title }}-->
                                <!--<template v-if="option.multiplier">(M)</template>-->
                                <!--</option>-->
                                <!--</select>-->
                                <!--</div>-->
                                <!--</div>-->
                                <div class="row">
                                    <div class="col-3">
                                        <label for="catalogs">Catalogs:</label>
                                    </div>
                                    <div class="col-6">
                                        <modal-simple v-show="fb_catalogs.length" :btnLabel="'Select'" :btnTarget="'product-form'" :modalTitle="'Catalog List'" :modalContent="''" :showUpdateButton="true" @updateModal="updateSelectedCatalogs" @openModal="compareCatalogList()">
                                            <template slot="modalCustomBody">
                                                <div class="container">

                                                    <!--// Sections Start =================================== -->
                                                    <div class="row" v-for="(catalogSection, sectionIndex) in orderBy(fb_catalogs, 'order', 'asc')">
                                                        <div class="col-1">
                                                            <input id="catalogs" type="checkbox" v-model="catalogSection.isSelected">{{catalogSection.isSelected}}
                                                        </div>
                                                        <div class="col-11">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <label for="catalogs">{{ catalogSection.title }}</label>
                                                                </div>
                                                            </div>
                                                            <div class="row" v-show="catalogSection.isSelected">

                                                                <!--// BENEFITS Start =================================== -->
                                                                <div class="col-12">
                                                                    <template v-for="(catalogBenefit, benefitIndex) in orderBy(catalogSection.sublevel, 'order', 'asc')">
                                                                        <div class="row" v-if="catalogBenefit.active">

                                                                            <div class="col-1">
                                                                                <input id="benefits" type="checkbox" v-model="catalogBenefit.isSelected">
                                                                            </div>
                                                                            <div class="col-11">
                                                                                <div class="row">
                                                                                    <div class="col-12">
                                                                                        <label for="benefits">{{ catalogBenefit.title }}</label>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="row" v-if="catalogBenefit.isSelected">

                                                                                    <!--// LEVELS Start ===================================-->
                                                                                    <div class="col-12">
                                                                                        <template v-for="(catalogLevel, levelIndex) in orderBy(catalogBenefit.sublevel, 'order', 'asc')">
                                                                                            <div class="row" v-if="catalogLevel.active">

                                                                                                <div class="col-1">
                                                                                                    <input id="levels" type="checkbox" v-model="catalogLevel.isSelected">
                                                                                                </div>
                                                                                                <div class="col-11">
                                                                                                    <div class="row">
                                                                                                        <div class="col-12">
                                                                                                            <label for="levels">{{ catalogLevel.title }}</label>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </template>

                                                                                    </div>
                                                                                    <!--// LEVELS End ===================================-->

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </template>
                                                                </div>
                                                                <!--// BENEFITS End ===================================-->

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!--// Sections Start ===================================-->
                                                </div>


                                                <!--<div class="container">-->

                                                <!--&lt;!&ndash;// Sections Start =================================== &ndash;&gt;-->
                                                <!--<div class="row" v-for="(catalogSection, sectionIndex) in orderBy(fb_catalogs, 'order', 'asc')">-->
                                                <!--<div class="col-1">-->
                                                <!--<input id="catalogs" @change="updateModelCatalogs(catalogSection, sectionIndex)" type="checkbox" v-model="catalogSection.isSelected">-->
                                                <!--</div>-->
                                                <!--<div class="col-11">-->
                                                <!--<div class="row">-->
                                                <!--<div class="col-12">-->
                                                <!--<label for="catalogs">{{ catalogSection.title }}</label>-->
                                                <!--</div>-->
                                                <!--</div>-->
                                                <!--<div class="row" v-if="catalogSection.isSelected">-->

                                                <!--&lt;!&ndash;// BENEFITS Start =================================== &ndash;&gt;-->
                                                <!--<div class="col-12">-->
                                                <!--<template v-for="(catalogBenefit, benefitIndex) in orderBy(catalogSection.sublevel, 'order', 'asc')">-->
                                                <!--<div class="row" v-if="catalogBenefit.active">-->

                                                <!--<div class="col-1">-->
                                                <!--<input id="benefits" @change="updateModelBenefits(catalogBenefit, benefitIndex, sectionIndex)" type="checkbox" v-model="catalogBenefit.isSelected">-->
                                                <!--</div>-->
                                                <!--<div class="col-11">-->
                                                <!--<div class="row">-->
                                                <!--<div class="col-12">-->
                                                <!--<label for="benefits">{{ catalogBenefit.title }}</label>-->
                                                <!--</div>-->
                                                <!--</div>-->

                                                <!--<div class="row" v-if="catalogBenefit.isSelected">-->

                                                <!--&lt;!&ndash;// LEVELS Start ===================================&ndash;&gt;-->
                                                <!--<div class="col-12">-->
                                                <!--<select v-if="$_.filter(catalogBenefit.sublevel, {active:true})">-->
                                                <!--<template v-for="(catalogLevel, levelIndex) in orderBy(catalogBenefit.sublevel, 'order', 'asc')">-->
                                                <!--<option @change="updateModelLevels(catalogLevel, levelIndex, benefitIndex, sectionIndex);" :selected="checkSelected(catalogLevel, levelIndex, benefitIndex, sectionIndex)" v-if="catalogLevel.active">-->
                                                <!--{{ catalogLevel.title }}-->
                                                <!--</option>-->
                                                <!--</template>-->
                                                <!--</select>-->
                                                <!--</div>-->
                                                <!--&lt;!&ndash;// LEVELS End ===================================&ndash;&gt;-->

                                                <!--</div>-->
                                                <!--</div>-->
                                                <!--</div>-->
                                                <!--</template>-->
                                                <!--</div>-->
                                                <!--&lt;!&ndash;// BENEFITS End ===================================&ndash;&gt;-->

                                                <!--</div>-->
                                                <!--</div>-->
                                                <!--</div>-->
                                                <!--&lt;!&ndash;// Sections Start ===================================&ndash;&gt;-->
                                                <!--</div>-->

                                            </template>
                                        </modal-simple>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <ul>
                                            <li v-for="(catalogSection, indexS) in orderBy(model.catalogs, 'order', 'asc')" v-bind:key="indexS">
                                                {{catalogSection.title}}
                                                <ul>
                                                    <li v-for="(catalogBenefit, indexB) in orderBy(catalogSection.sublevel, 'order', 'asc')" v-bind:key="indexB">
                                                        {{ catalogBenefit.title }}
                                                        (
                                                        <template v-for="(catalogLevel, indexL) in orderBy(catalogBenefit.sublevel, 'order', 'asc')">{{ catalogLevel.title }}</template>
                                                        )
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <button class="btn-sm btn-success" :disabled="buttons.create.disabled" v-if="model.id === ''" @click.prevent="create">Create CatalogType</button>
                                        <button class="btn-sm btn-success" :disabled="buttons.update.disabled" v-if="model.id !== ''" @click.prevent="update">Update CatalogType</button>
                                        <button class="btn-sm btn-warning" @click.prevent="resetForm">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <h3>Product List</h3>
                    <div class="container text-left">
                        <div class="row">
                            <template v-if="fb_products.length > 0">
                                <div class="col-12" v-for="product in orderBy(fb_products, 'title', 'asc')">
                                    <div class="row">
                                        <div class="col-10">
                                            <div class="row">
                                                <div class="col-3"><b>ID:</b></div>
                                                <div class="col-9">{{product['.key']}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3"><b>Title:</b></div>
                                                <div class="col-9">{{product.title}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3"><b>Description:</b></div>
                                                <div class="col-9">{{product.description}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3"><b>Dependants:</b></div>
                                                <div class="col-9">{{product.dependants}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3"><b>Rate:</b></div>
                                                <div class="col-9">{{product.rate}}</div>
                                            </div>
                                        </div>
                                        <div class="col-2 text-center">
                                            <b>Actions</b>
                                            <button class="btn-sm btn-primary" @click="editModel(product['.key'])">Edit</button>
                                            <button class="btn-sm btn-danger" @click="deleteModel(product._ref)">delete</button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="col-12">
                                    <i>Not found</i>
                                </div>
                            </template>
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
    import Product from '../Models/Product'
    import Catalog from '../Models/Catalog'

    import ModalSimple from './common/modal-simple.vue'

    export default {
        name: 'Product',
        components: {
            'modal-simple': ModalSimple
        },
        beforeCreate(){
            this.$bindAsArray('fb_catalogs', Catalog.ref().orderByChild('active').equalTo(true));
        },
        data () {
            return {
                msg: 'Product CRUD',
                Object: Product,
                model: Product.copy(Product.getModel()),
                Catalog: Catalog,
                selectedCatalogs: [],
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
//            catalogsList(){
//                debugger;
//
//                let $this = this;
//                let catalog = Catalog.copy($this.fb_catalogs);
//                let levelMultiplier = 1;
//                let levelRate = 0;
//
//                console.log('catalogsList', catalog);
//
//                Object.keys(catalog).map(function (sectionKey, i) {
//
//                    catalog[sectionKey].multiplier = Catalog.getMultiplier(catalog[sectionKey], $this.model.dependants);
////                    catalog[sectionKey].rate = Catalog.getRate(catalog[sectionKey], $this.model.dependants);
//                    catalog[sectionKey].rate = 0;
//
//
//                    if (catalog[sectionKey].hasOwnProperty('sublevel')) {
//                        Object.keys(catalog[sectionKey].sublevel).map(function (benefitKey, i) {
//
////                            catalog[sectionKey].sublevel[benefitKey].multiplier = Catalog.getMultiplier(catalog[sectionKey].sublevel[benefitKey], $this.model.dependants);
////                            catalog[sectionKey].sublevel[benefitKey].rate = Catalog.getRate(catalog[sectionKey].sublevel[benefitKey], $this.model.dependants);
//
//                            if (catalog[sectionKey].sublevel[benefitKey].hasOwnProperty('sublevel')) {
//                                levelMultiplier = 1;
//                                levelRate = 0;
//
//                                Object.keys(catalog[sectionKey].sublevel[benefitKey].sublevel).map(function (levelKey, i) {
//
//                                    catalog[sectionKey].rate += Catalog.getRate(catalog[sectionKey].sublevel[benefitKey].sublevel[levelKey], $this.model.dependants);
//                                });
//                            }
//                        });
//                    }
//
//                    catalog[sectionKey].rate = catalog[sectionKey].rate * catalog[sectionKey].multiplier;
//                });
//
//                return catalog;
//            }
        },
        created () {
            this.Object.model = this.model;
        },
        validations: {
            model: Product.validations.model
        },
        firebase: {
            fb_products: Product.ref(),
//            fb_catalogs: Catalog.ref().orderByChild('active').equalTo(true)
        },
        methods: {
            orderBy(list, field, sort){
                return this.$_.sortBy(list, field, sort);
            },

//            updateModelCatalogs: function (obj, sectionIndex) {
//                console.log(obj, sectionIndex);
//                let data = Catalog.copy(obj);
//                delete data['.key'];
//
//                let hasDefaultBenefit = false;
////                hasDefaultBenefit = Catalog.isDefault(obj, 1)
//
//                if (this.selectedCatalogs[sectionIndex] == undefined) {
//                    this.selectedCatalogs[sectionIndex] = Catalog.copy(data);
//                    this.selectedCatalogs[sectionIndex].sublevel = [];
//                } else {
//                    delete this.selectedCatalogs[sectionIndex];
//                }
//                console.log('this.selectedCatalogs', this.selectedCatalogs)
//            },
//            updateModelBenefits(obj, benefitIndex, sectionIndex) {
////                console.log(obj, benefitIndex, sectionIndex);
//                let data = Catalog.copy(obj);
//                delete data['.key'];
//                if (this.selectedCatalogs[sectionIndex].sublevel[benefitIndex] == undefined) {
//                    this.selectedCatalogs[sectionIndex].sublevel[benefitIndex] = Catalog.copy(data);
//                    this.selectedCatalogs[sectionIndex].sublevel[benefitIndex].sublevel = [];
//                } else {
//                    delete this.selectedCatalogs[sectionIndex].sublevel[benefitIndex];
//                }
////                console.log('this.selectedCatalogs', this.selectedCatalogs)
//            },
//            updateModelLevels(obj, levelIndex, benefitIndex, sectionIndex) {
//                console.log(obj, levelIndex, benefitIndex, sectionIndex);
//                let data = Catalog.copy(obj);
//                delete data['.key'];
//
//                this.selectedCatalogs[sectionIndex].sublevel[benefitIndex].sublevel = {};
////                if (this.selectedCatalogs[sectionIndex].sublevel[benefitIndex].sublevel[levelIndex] == undefined) {
//                this.selectedCatalogs[sectionIndex].sublevel[benefitIndex].sublevel[levelIndex] = Catalog.copy(data);
////                } else {
////                    delete this.selectedCatalogs[sectionIndex].sublevel[benefitIndex].sublevel[levelIndex];
////                }
//                console.log('this.selectedCatalogs', this.selectedCatalogs)
//            },
//            checkSelected(obj, levelIndex, benefitIndex, sectionIndex) {
//                if (obj.isSelected) {
//                    if (this.selectedCatalogs[sectionIndex] == undefined) {
//                        if (this.selectedCatalogs[sectionIndex].sublevel[benefitIndex] == undefined) {
//                            this.updateModelBenefits(this.fb_catalogs[selectionIndex].sublevel[benefitIndex], levelIndex, benefitIndex);
//                            this.updateModelLevels(obj, levelIndex, benefitIndex, sectionIndex);
//                        }
//                    }
//                }
//                return obj.isSelected;
//            },
            updateSelectedCatalogs(){
                let $this = this;

                let catalog = this.Object.copy(this.fb_catalogs);

                let multiplier = 1;
                $this.model.rate = 0;
                Object.keys(catalog).map(function (sectionKey, index) {
                    delete catalog[sectionKey]['.key'];

                    catalog[sectionKey].multiplier = Catalog.getMultiplier(catalog[sectionKey], $this.model.dependants);
                    catalog[sectionKey].rate = 0;

                    if (!catalog[sectionKey].isSelected) {
                        delete catalog[sectionKey];
                    } else {

                        if (catalog[sectionKey].hasOwnProperty('sublevel')) {
                            Object.keys(catalog[sectionKey].sublevel).map(function (benefitKey, i) {
                                delete catalog[sectionKey].sublevel[benefitKey]['.key'];

                                if (!catalog[sectionKey].sublevel[benefitKey].isSelected) {
                                    delete catalog[sectionKey].sublevel[benefitKey];
                                } else {
                                    if (catalog[sectionKey].sublevel[benefitKey].hasOwnProperty('sublevel')) {
                                        Object.keys(catalog[sectionKey].sublevel[benefitKey].sublevel).map(function (levelKey, i) {
                                            delete catalog[sectionKey].sublevel[benefitKey].sublevel[levelKey]['.key'];

                                            if (!catalog[sectionKey].sublevel[benefitKey].sublevel[levelKey].isSelected) {
                                                delete catalog[sectionKey].sublevel[benefitKey].sublevel[levelKey];
                                            } else {
                                                catalog[sectionKey].rate += Catalog.getRate(catalog[sectionKey].sublevel[benefitKey].sublevel[levelKey], $this.model.dependants);
                                            }
                                        });
                                    }
                                }
                            });
                        }

                        $this.model.rate += catalog[sectionKey].rate * catalog[sectionKey].multiplier;
                    }
                });
                this.model.catalogs = this.Object.copy(catalog);
                this.model.rate = parseFloat($this.model.rate).toFixed(2);
            },
            compareCatalogList: function () {
                let $this = this;

                if($this.model.catalogs.length){
                    console.log($this.model.catalogs, $this.fb_catalogs);
                    Object.keys($this.fb_catalogs).map(function (sectionKey, index) {
                        if($this.model.catalogs.hasOwnProperty(sectionKey)){
                            $this.fb_catalogs[sectionKey].isSelected = $this.model.catalogs[sectionKey].isSelected;
                        } else {
                            $this.fb_catalogs[sectionKey].isSelected = false;
                        }

                        if ($this.fb_catalogs[sectionKey].hasOwnProperty('sublevel')) {
                            Object.keys($this.fb_catalogs[sectionKey].sublevel).map(function (benefitKey, i) {
                                if($this.model.catalogs[sectionKey].sublevel.hasOwnProperty(benefitKey)){
                                    $this.fb_catalogs[sectionKey].sublevel[benefitKey].isSelected = $this.model.catalogs[sectionKey].sublevel[benefitKey].isSelected;
                                } else {
                                    $this.fb_catalogs[sectionKey].sublevel[benefitKey].isSelected = false;
                                }

                                if ($this.fb_catalogs[sectionKey].sublevel[benefitKey].hasOwnProperty('sublevel')) {
                                    Object.keys($this.fb_catalogs[sectionKey].sublevel[benefitKey].sublevel).map(function (levelKey, j) {
                                        if($this.model.catalogs[sectionKey].sublevel[benefitKey].sublevel.hasOwnProperty(levelKey)){
                                            $this.fb_catalogs[sectionKey].sublevel[benefitKey].sublevel[levelKey].isSelected = $this.model.catalogs[sectionKey].sublevel[benefitKey].sublevel[levelKey].isSelected;
                                        } else {
                                            $this.fb_catalogs[sectionKey].sublevel[benefitKey].sublevel[levelKey].isSelected = false;
                                        }

                                    });
                                }
                            });
                        }
                    });
                }
            },
            resetForm: function () {
                this.model = this.Object.reset();
                this.model.$reset;
            },
            create: function () {
                if (!this.$v.model.$invalid) {
                    this.Object.setAttributes(this.model);
                    this.Object.create();
                    this.resetForm()
                }
            },
            update: function () {
                if (!this.$v.model.$invalid) {
                    this.Object.setAttributes(this.model);
                    this.Object.update();
                    this.resetForm()
                }
            },
            editModel(key){
                var $this = this;
                Product.findById(key).then(function (snapshot) {
                    $this.model = snapshot.val();
                    $this.model.id = snapshot.key;
                })
                this.$v.model.$reset
            },
            deleteModel(key){
                Product.delete(key)
            },
        }
    }
</script>

<style scoped>

</style>
