<template>
  <v-container class="contain_skeletor">
    <v-row class="p-skeletor">
      <v-col cols="12">
        <v-skeleton-loader height="320" type="card"></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader height="320" type="card"></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader height="320" type="card"></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader height="320" type="card"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    attrs: {
      class: "mb-6",
      boilerplate: true,
      elevation: 2,
    },
  }),
};
</script>

<style></style>