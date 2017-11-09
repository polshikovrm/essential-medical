<template>
    <div class="form-catalog-type">
        <div class="field-row">
            <span class="form-group__message" v-if="$v.model.$invalid">Form is not Valid</span>
        </div>
        <div class="field-row">
            <label for="c_id">Id:</label>
            <input id="c_id" type="text" v-bind:value="model.id"><i>Hidden</i>
        </div>
        <div class="field-row">
            <label for="c_title">Title:</label>
            <div class="input-box">
                <input id="c_title" type="text" v-model="model.title">
                <span class="form-group__message" v-if="!$v.model.title.required">Name is required.</span>
                <span class="form-group__message" v-if="!$v.model.title.minLength">Name must have at least {{ $v.model.title.$params.minLength.min }} letters.</span>
            </div>
        </div>
        <div class="field-row">
            <label for="c_description">Description:</label>
            <div class="input-box">
                <input id="c_description" type="text" v-model="model.description">
                <span class="form-group__message" v-if="!$v.model.description.minLength">Name must have at least {{ $v.model.description.$params.minLength.min }} letters.</span>
            </div>
        </div>
        <div class="field-row">
            <label for="c_type">Type:</label>
            <div class="input-box">
                <select name="" id="c_type">
                    <option v-for="option in fb_CatalogType" v-bind:key="option['.key']" @value="option['.key']">{{ option.title }}</option>
                </select>
                <span class="form-group__message" v-if="!$v.model.type.required">Name is required.</span>
            </div>
        </div>
        <div class="field-row">
            <label for="c_active">Active:</label>
            <div class="input-box">
                <input type="checkbox" id="c_active" v-model="model.active">
                <span class="form-group__message" v-if="!$v.model.active.required">Name is required.</span>
            </div>
        </div>
        <div class="field-row">
            <label for="c_order">Order:</label>
            <div class="input-box">
                <input type="number" id="c_order" v-model="model.order">
                <span class="form-group__message" v-if="!$v.model.order.required">Name is required.</span>
            </div>
        </div>
        <button v-if="model.id === ''" @click.prevent="createCatalog">Create Catalog</button>
        <button v-if="model.id !== ''" @click.prevent="updateCatalog">Update Catalog</button>
        <button @click.prevent="resetFormCatalog">Reset</button>


        <div class="field-row">
            <!--<label for="c_parent">Sublevels:</label>-->
            <!--<div class="input-box">-->
            <!--<button @click.prevent="addCatalogSublevel">Add Sublevel</button>-->
            <button @click.prevent="model.sublevel.push(new CatalogType())">Add Sublevel</button>
            <!--</div>-->
        </div>
    </div>
</template>