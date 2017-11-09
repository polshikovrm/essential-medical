import {required, minLength, numeric} from 'vuelidate/lib/validators'

import Api from '../Services/Api'

class CatalogType extends Api {
    constructor() {
        super('catalog_type', {
            "id": "",
            "title": "",
            "description": "",
            "type": "",
            "parent": "none",
            "active": true,
            "order": 1
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
                type: {
                    required
                },
                // parent: {
                //     required,
                // },
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

    // renewParentList() {
    //     let $this = this
    //
    //     let listRef = this.ref()
    //
    //     listRef.once('value').then(function (snapshot) {
    //         $this.options.parents = snapshot.val()
    //     })
    //
    //     listRef.on('child_added', function (data) {
    //         // $this.renewParentList();
    //     })
    //
    //     listRef.on('child_changed', function (data) {
    //         // $this.renewParentList();
    //     })
    //
    //     listRef.on('child_removed', function (data) {
    //         // $this.renewParentList();
    //     })
    // }
}

// export {CatalogType as default}
export default new CatalogType()
