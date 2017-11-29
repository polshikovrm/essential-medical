import {required, minLength, numeric} from 'vuelidate/lib/validators'


import Api from '../Services/Api'
import {_} from 'vue-underscore'

// import CatalogType from './CatalogType.js'

class Catalog extends Api {
    constructor() {
        super('catalog', {
            "id": "",
            "title": "",
            "description": "",
            "slug": "",
            "type": "",
            "active": true,
            "order": 1,
            "sublevel": {},
            "pricing-schedule-id": "",
            "pricing-schedule": {},
            "extendedFields": [],
            "isSelected": false,
            "_ref": ""
        });

        this.fieldTypes = {
            'order': {
                'type': 'int'
            },
            'active': {
                'type': 'bool'
            }
        };

        this.validations = {
            model: {
                title: {
                    required,
                    minLength: minLength(5)
                },
                description: {
                    minLength: minLength(10)
                },
                slug: {
                    required,
                    minLength: minLength(5)
                },
                type: {
                    required
                },
                order: {
                    required,
                    numeric
                }
            }
        }
    }

    getMultiplier(data, dependants){
        if(data.hasOwnProperty('pricing-schedule') && data['pricing-schedule'] !== undefined){
            if(data['pricing-schedule'].multiplier){
                return parseFloat((data['pricing-schedule'].pricebreak[dependants]) ? data['pricing-schedule'].pricebreak[dependants].price : 1);
            }
        }
    }

    getRate(data, dependants){
        if(data.hasOwnProperty('pricing-schedule') && data['pricing-schedule'] !== undefined){
            if(!data['pricing-schedule'].multiplier){
                return parseFloat((data['pricing-schedule'].pricebreak[dependants]) ? data['pricing-schedule'].pricebreak[dependants].price : 0);
            }
        }
    }


    // checkDefaults(data, deps) {
    //     console.log(data);
    //     data.isSelected = true;
    //     return data;
    //     let $this = this;
    //     let hasDefaults = false;
    //     if ('number' === typeof deps) {
    //         deps--;
    //     }
    //     // debugger
    //     if (data.hasOwnProperty('pricing-schedule-id') && data.hasOwnProperty('pricing-schedule') && data['pricing-schedule-id'] !== '') {
    //         if (data['pricing-schedule'] && data['pricing-schedule'].hasOwnProperty('pricebreak') && data['pricing-schedule'].pricebreak.length > 0) {
    //             var zeroAmounts = data['pricing-schedule'].pricebreak.filter(function (pricebreak) {
    //                 return pricebreak.amount === 0;
    //             });
    //
    //             return !(zeroAmounts.length > 0);
    //         }
    //     }
    //
    //     if (deps > 0) {
    //         if (data.hasOwnProperty('sublevel')) {
    //             Object.keys(data.sublevel).map(function (objectKey, index) {
    //                 if(!hasDefaults){
    //                     hasDefaults = $this.isDefault(data.sublevel[objectKey], deps);
    //                     // return $this.isDefault(data.sublevel[objectKey], deps);
    //                 }
    //                 return hasDefaults;
    //             })
    //             // data.sublevel.forEach(function (item, i, arr) {
    //             //     return this.isDefault(item);
    //             // });
    //         }
    //     }
    //
    //     return hasDefaults;
    // }


    // isDefault(data, deps) {
    //     return true;
    //     let $this = this;
    //     let hasDefaults = false;
    //     if ('number' === typeof deps) {
    //         deps--;
    //     }
    //     // debugger
    //     if (data.hasOwnProperty('pricing-schedule-id') && data.hasOwnProperty('pricing-schedule') && data['pricing-schedule-id'] !== '') {
    //         if (data['pricing-schedule'] && data['pricing-schedule'].hasOwnProperty('pricebreak') && data['pricing-schedule'].pricebreak.length > 0) {
    //             var zeroAmounts = data['pricing-schedule'].pricebreak.filter(function (pricebreak) {
    //                 return pricebreak.amount === 0;
    //             });
    //
    //             return !(zeroAmounts.length > 0);
    //         }
    //     }
    //
    //     if (deps > 0) {
    //         if (data.hasOwnProperty('sublevel')) {
    //             Object.keys(data.sublevel).map(function (objectKey, index) {
    //                 if(!hasDefaults){
    //                     hasDefaults = $this.isDefault(data.sublevel[objectKey], deps);
    //                     // return $this.isDefault(data.sublevel[objectKey], deps);
    //                 }
    //                 return hasDefaults;
    //             })
    //             // data.sublevel.forEach(function (item, i, arr) {
    //             //     return this.isDefault(item);
    //             // });
    //         }
    //     }
    //
    //     return hasDefaults;
    // }

    // getTypeTitle(typeId){
    //     return CatalogType.ref().orderByChild('id').equalTo(typeId).once('value').then(function(snapshot){
    //         return CatalogType.copy(snapshot.val()[typeId])
    //     })
    // }

    // addSublevelValidate(obj){
    //     obj.model.sublevel = {
    //         $each: {
    //             model: this.validations.model
    //         }
    //     }
    // }

    // getSublevelTypes() {
    //     return {'benefit':[],'level':[]};
    //
    //     if (this.model.type != '') {
    //         return CatalogType.ref().orderByChild('parent').equalTo(this.model.type)
    //     }
    // }
}

// export {CatalogType as default}
export default new Catalog()
