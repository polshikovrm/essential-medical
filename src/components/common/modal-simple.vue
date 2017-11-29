<template>
    <div class="modal-simple">
        <button type="button" @click.prevent="openModal" class="btn btn-info btn-sm" data-toggle="modal" :data-target="'#' + btnTarget">
            <!--<template v-if="btnLabel">-->
                {{ btnLabel }}
            <!--</template>-->
            <!--<template v-else>-->
                <!--View more...-->
            <!--</template>-->
        </button>

        <!-- The modal -->
        <div class="modal fade" :id="btnTarget" tabindex="-1" role="dialog" :aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 v-if="modalTitle" class="modal-title" :id="modalLabel">{{ modalTitle }}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <template v-if="modalContent">{{ modalContent }}</template>
                        <slot name="modalCustomBody"></slot>
                    </div>
                    <div class="modal-footer">
                        <button v-if="showUpdateButton" type="button" class="btn btn-primary" data-dismiss="modal" @click="updateModal">Update</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!--
USAGE:

<modal-simple :btnLabel="'btnLabel'" :btnTarget="'#'" :modalTitle="'modalTitle'" :modalContent="'modalContent'" :showUpdateButton="false">
    <template slot="modalCustomBody"></template>
</modal-simple>
-->

<script>
    export default {
        name: 'modal-simple',
        props: ['btnLabel', 'btnTarget', 'modalTitle', 'modalContent', 'showUpdateButton'],
        computed:{
            modalLabel(){
                return this.btnTarget; //todo unique
            }
        },
        data () {
            return {}
        },
        methods: {
            openModal(){
                this.$emit('openModal');
            },
            closeModal(){
                this.$emit('closeModal');
            },
            updateModal(){
                this.$emit('updateModal');
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h4  {
        text-align: left;
    }
</style>