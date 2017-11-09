<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>Essential Links</h2>
        <p>{{modelData}}</p>
        <p>{{tempo}}</p>
        <p>{{tempo1}}</p>
        <p>{{tempo2}}</p>
        <ul>
            <li>
                <button v-on:click="initModel">Init Model</button>
            </li>
            <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
            <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
            <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
            <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
            <br>
            <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
            <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
            <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
            <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
        </ul>
    </div>
</template>

<script>
//  import firebase from 'firebase'
  import Api from '../Services/Api.js'
  import CatalogModel from '../Models/Catalog.json'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Create Catalog Types',
        modelData: CatalogModel,
        tempo: {},
        tempo1: {},
        tempo2: {}
      }
    },
    methods: {
      initModel: function () {
        var $this = this
        Api.CatalogType.findAll().then(function (snapshot) {
          $this.tempo = snapshot.val()
        })

        Api.CatalogType.getCatalogTypeById(0).then(function (snapshot) {
          $this.tempo1 = snapshot.val()
        })

        Api.CatalogType.getCatalogTypeById(1).then(function (snapshot) {
          $this.tempo2 = snapshot.val()
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
