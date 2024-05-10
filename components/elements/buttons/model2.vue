<template>
    <v-btn 
    class="model2-btn ma-2 btn-accept text-capitalize font-weight-bold rounded-lg" color="transparent" dark
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

.model2-btn{
    //font-family: gotham_htfmedium !important;
    color: white !important;
    background-color: #30B6FF!important;
    border: 0px !important;
    font-size: 1em !important;
    padding: 10px !important;
    border-radius: 9px !important;
}

</style>