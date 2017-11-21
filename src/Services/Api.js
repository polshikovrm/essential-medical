import fb from './firebase'


class Api {
    constructor(collection, data) {
        this.fb = fb;
        this.collection = '/' + collection + '/';
        this.default = this.copy(data);
        this.model = {};
        this.options = {};
        this.fieldTypes = {};
        this.validations = {};

        this.setModel(this.copy(data))
    }

    changeRefCollection(newCollection) {
        this.collection = newCollection;
    }

    reset() {
        return this.setModel(this.copy(this.default))
    }

    getModel() {
        return this.model
    }

    setModel(data) {
        this.model = data;
        return this.copy(this.model);
    }

    setAttributes(data) {
        if (JSON.stringify(data) !== JSON.stringify(this.model))
            this.reset()

        let $this = this

        Object.keys(this.model).map(function (objectKey, index) {
            if (data.hasOwnProperty(objectKey))
                $this.setAttribute(objectKey, data[objectKey])
        })
        return this.model
    }

    setAttribute(attr, val) {
        if (this.fieldTypes.hasOwnProperty(attr)) {
            if (this.fieldTypes.hasOwnProperty(attr)) {
                switch (this.fieldTypes[attr].type) {
                    case 'int':
                        val = parseInt(val)
                        break
                    case 'float':
                        val = parseInt(val)
                        break
                    case 'string':
                        val = val.toString()
                        break
                    case 'fb_object':
                        let temp = this.copy(val)
                        delete temp['.key'];
                        // delete Object.getPrototypeOf(temp).['.key']
                        val = this.copy(temp)
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
        if (key !== undefined) {
            return fb.getRef(this.collection + key)
        }
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
        debugger
    // return this.ref().push(body);
    let newKey = '';
    if(this.model._ref){
        newKey = fb.getRef(this.model._ref).push().key;
        this.setAttribute('_ref', this.model._ref + newKey + '/')
    } else {
        newKey = this.ref().push().key;
        this.setAttribute('_ref', this.collection + newKey + '/')
    }
    this.setAttribute('id', newKey)
    return fb.getRef(this.model._ref).update(this.getModel());
}

    update() {
        // console.log(this.model)
        if(this.model._ref !== undefined){
            return fb.getRef(this.model._ref).set(this.model);
        }
        return this.refsByKey(this.model.id).set(this.model);

        // multy update
        // var newPostKey = firebase.database().ref().child('posts').push().key;
        // var updates = {};
        // updates['/posts/' + newPostKey] = postData;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
        // return firebase.database().ref().update(updates);
    }

    delete(ref) {
        return fb.getRef(ref).remove()
    }

    copy(data) {
        return JSON.parse(JSON.stringify(data))
    }
}

export  {Api as default}