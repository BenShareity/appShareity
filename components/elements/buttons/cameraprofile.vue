<template>
    <v-btn 
     color="transparent"
     class="cameraprofile" 
    >  <v-img @click="$emit('click')" width="52px" :src="require('~/assets/img/svg/profile/photo-camera-black.svg')"></v-img>
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

.cameraprofile {
    position: absolute;
    width: 6px;
    top: 28%;
    left: 16.4%;
}

</style>