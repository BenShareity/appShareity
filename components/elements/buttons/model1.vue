<template>
    <v-btn height="56px" class="px-8 btn-accept text-capitalize text-h6 font-weight-bold rounded-lg" color="transparent" dark>
        <v-icon v-if="!icon == ''" dark size="28px" left v-text="icon"></v-icon>
        <span :style="`font-size: ${fontSize};`"  v-text="text" />
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
            fontSize: {
                type: String,
                default: '13pt'
            },
        },        
    }
</script>

<style lang="scss" scoped>
.btn-accept {
  background: linear-gradient(90deg, rgba(#0A84E8, 1) 0%, rgba(#13A7DE, 1) 100%) !important;
}
</style>