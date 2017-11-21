import {required, minLength} from 'vuelidate/lib/validators'
import Api from '../Services/Api'
import Pricebreak from './Pricebreak'


class PricingSchedule extends Api {
    constructor() {
        super('pricing-schedule', {
            "id": "",
            "title": "",
            "description": "",
            "active": true,
            "multiplier": true,
            "pricebreak": [Pricebreak.copy(Pricebreak.default)],
            "_ref": ""
        });

        this.fieldTypes = {
            'active': {
                'type': 'bool'
            },
            'multiplier': {
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
                }
            }
        }
    }
}

export default new PricingSchedule()
