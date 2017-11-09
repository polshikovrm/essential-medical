import {required, minLength, numeric} from 'vuelidate/lib/validators'


import Api from '../Services/Api'

class Catalog extends Api {
    constructor() {
        super('catalog', {
            "title": "",
            "description": "",
            "slug": "",
            "type": "",
            "active": true,
            "order": 1,
            "sublevel": {},
            // "levels": [],
            // "covers": [],
            "extendedFields": []
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
                active: {
                    required
                },
                order: {
                    required,
                    numeric
                }
            }
        }

    }

    // addSublevelValidate(obj){
    //     obj.model.sublevel = {
    //         $each: {
    //             model: this.validations.model
    //         }
    //     }
    // }
}

// export {CatalogType as default}
export default new Catalog()
