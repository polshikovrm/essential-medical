import {required, minLength, numeric} from 'vuelidate/lib/validators'

import Api from '../Services/Api'

class Product extends Api {
    constructor() {
        super('products', {
            "id": "",
            "title": "",
            "description": "",
            "rate": 0,
            "dependants": 0,
            "catalogs": [],
            "extendedFields": [],
            "_ref": ""
        });

        this.fieldTypes = {};

        this.validations = {
            model: {
                title: {
                    required,
                    minLength: minLength(5)
                },
                description: {
                    minLength: minLength(10)
                }
            }
        }
    }
}

export default new Product()
