<template>
    <div class="catalog-form">
<!--{{tempo}}-->
        <ul>
            <li v-for="item in tempo">
                <p>Name: {{item.name}}</p>
                <p v-if="item.sublevel">
                    <catalog-form :tempo="item.sublevel"></catalog-form>
                </p>
            </li>
        </ul>


    </div>
</template>

<script>
    import Vue from 'vue'
//    import CatalogType from '../../Models/CatalogType'
//    import Catalog from '../../Models/Catalog'

    export default {
        name: 'catalog-form',
        components: {
            'catalog-form': require('./CatalogForm.vue')
        },
        props: ['tempo'],
        data () {
            return {
                msg: 'Catalog CRUD',
            }
        },
        methods: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
