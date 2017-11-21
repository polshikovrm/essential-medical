import {required, minLength, numeric} from 'vuelidate/lib/validators'


import Api from '../Services/Api'

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
