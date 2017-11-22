import {required, minLength, numeric} from 'vuelidate/lib/validators'

import Api from '../Services/Api'
import PricingSchedule from '../Models/PricingSchedule'

class CatalogType extends Api {
    constructor() {
        super('catalog-type', {
            "id": "",
            "title": "",
            "description": "",
            "type": "",
            "parent": "none",
            "active": true,
            "order": 1,
            "pricing-schedule-id": "",
            "pricing-schedule": {},
            "_ref": ""
        });

        this.fieldTypes = {
            'order': {
                'type': 'int'
            },
            'active': {
                'type': 'bool'
            },
            'pricing-schedule': {
                'type': 'fb_object'
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
                parent: {
                    required,
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


    // update() {
    //     var $that = this;
    //     var $thatModel = this.copy(this.getModel());
    //
    //     var currentRef = '';
    //     if ($that.model._ref !== undefined) {
    //         currentRef = $that.fb.getRef($that.model._ref);
    //     } else {
    //         currentRef = $that.refsByKey($that.model.id);
    //     }
    //
    //     if ($that.model['pricing-schedule-id'] !== '') {
    //         PricingSchedule.findById($that.model['pricing-schedule-id']).then(function (s) {
    //             $that.setAttributes($thatModel);
    //             $that.setAttribute('pricing-schedule', $that.copy(s.val()));
    //             // return $that.refsByKey($that.model.id).set($that.model);
    //             currentRef.set($that.model)
    //             $that.resetForm()
    //         });
    //     } else {
    //         // return this.refsByKey(this.model.id).set(this.model);
    //         currentRef.set($that.model)
    //         $that.resetForm()
    //     }
    //
    //     // multy update
    //     // var newPostKey = firebase.database().ref().child('posts').push().key;
    //     // var updates = {};
    //     // updates['/posts/' + newPostKey] = postData;
    //     // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    //     // return firebase.database().ref().update(updates);
    // }

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
