<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <p>{{modelData}}</p>
        <p>{{tempo}}</p>
    </div>
</template>

<script>
  import firebase from 'firebase'
  import CatalogModel from '../../Models/Catalog.json'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Create Catalog Types',
        modelData: CatalogModel,
        tempo: {}
      }
    },
    methods: {
      initModel: function () {
        var userId = firebase.auth().currentUser
        console.log(userId)

        var $this = this
        firebase.database().ref('/catalog_type/').once('value').then(function (snapshot) {
//        return firebase.database().ref('/catalog_types/1').once('value').then(function (snapshot) {
          $this.tempo = snapshot.val()
          console.log($this.tempo)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
