<template>
 <v-main style="padding: 0 !important">
    <!-- Header Section -->
    <TermsHead />
    <!-- END Header Section -->

    <!-- Content Section -->
    <terms />
    <!-- END Content Section -->
    
    <!-- Footer Section -->
    <MenuFooter />
    <!-- END Footer Section -->
  </v-main>
</template>
<script>
import terms from './partials/terms.vue';
export default {
  layout (context) {
  return 'Modal'
  },
  components: {terms},
}
</script>
<style lang="scss" scoped>
.v-sheet.v-footer:not(.v-sheet--outlined) {
  background: linear-gradient(0deg, rgb(0 0 0 / 60%) 0%, rgb(0 0 0 / 30%) 100%)!important;
}
</style>