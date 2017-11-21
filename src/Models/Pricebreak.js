import {required, numeric} from 'vuelidate/lib/validators'


import Api from '../Services/Api'


class Pricebreak extends Api {
    constructor() {
        super('pricebreak', {
            "id": "",
            "amount": 0,
            "price": 0
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
                amount: {
                    required,
                    numeric
                },
                price: {
                    required,
                    numeric
                }
            }
        }
    }
}

export default new Pricebreak()
