<template v-slot:activator>
    <v-btn 
    x-small
    class="btn-vote btn-accept text-uppercase font-weight-normal rounded-lg" color="transparent" dark
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

.btn-vote{

    background: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(123, 123, 123) 100%);
    border: 1px solid white;
    font-size: 0.7em;
    border-radius: 22px;
    color: white;
    margin: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 14px;
}

</style>