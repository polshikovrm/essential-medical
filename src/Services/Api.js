import fb from './firebase'


class Api {
    constructor(collection, data) {
        this.collection = '/' + collection + '/';
        this.default = this.copy(data);
        this.model = {};
        this.options = {};
        this.fieldTypes = {};
        this.validations = {};

        this.setModel(this.copy(data))
    }

    reset() {
        return this.setModel(this.copy(this.default))
    }

    getModel() {
        return this.model
    }

    setModel(data) {
        return this.model = this.copy(data)
    }

    setAttributes(data) {
        if (JSON.stringify(data) !== JSON.stringify(this.model))
            this.reset()

        let $this = this

        Object.keys(this.model).map(function(objectKey, index) {
            if (data.hasOwnProperty(objectKey))
                $this.setAttribute(objectKey, data[objectKey])
        })
        return this.model
    }

    setAttribute(attr, val) {
        if(this.fieldTypes.hasOwnProperty(attr)){
            if(this.fieldTypes.hasOwnProperty(attr)){
                switch (this.fieldTypes[attr].type){
                    case 'int':
                        val = parseInt(val)
                        break
                    case 'float':
                        val = parseInt(val)
                        break
                    case 'string':
                        val = val.toString()
                        break
                    case 'oneOf':
                        this.fieldTypes[attr].type
                        val = val.toString()
                        break
                }
            }
        }
        this.model[attr] = val
    }

    ref() {
        return fb.getRef(this.collection)
    }

    refsByKey(key) {
        return fb.getRef(this.collection + key)
    }

    findAll() {
        return this.ref().once('value')
    }

    findAllOrderBy(order) {
        return this.ref().orderByChild(order).once('value')

    }

    findById(key) {
        return this.refsByKey(key).once('value')
        // return this.ref().child(key).once('value')
    }

    create() {
        // return this.ref().push(body);
        let newKey = this.ref().push().key;
        this.setAttribute('id', newKey)
        return this.refsByKey(newKey).update(this.getModel());
    }

    update() {
        return this.refsByKey(this.model.id).set(this.model);

        // multy update
        // var newPostKey = firebase.database().ref().child('posts').push().key;
        // var updates = {};
        // updates['/posts/' + newPostKey] = postData;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
        // return firebase.database().ref().update(updates);
    }

    delete(key) {
        return this.refsByKey(key).remove()
    }

    copy(data){
        return JSON.parse(JSON.stringify(data))
    }
}

export  {Api as default}