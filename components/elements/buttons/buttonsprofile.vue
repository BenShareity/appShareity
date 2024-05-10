<template>
    <v-btn 
    x-small
    class="btn-save-profile btn-accept text-capitalize font-weight-bold rounded-lg" color="transparent" dark
    @click="$emit('click')"
    >
        <v-icon v-if="!icon == ''" dark left v-text="icon"></v-icon>
        {{text}}
    </v-btn>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
        },       
    }
</script>

<style lang="scss" scoped>

.btn-save-profile{
    //font-family: gotham_htfmedium !important;
    color: #fff;
    background-color: #30B6FF!important;
    border: 0px !important;
    font-size: 0.8em !important;
    padding: 6px 12px !important;
    border-radius: 5px !important;
}

</style>