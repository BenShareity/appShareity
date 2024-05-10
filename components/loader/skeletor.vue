<template>
  <v-container class="contain_skeletor">
    <div class="skeletor">
      <v-skeleton-loader height="250" type="card-avatar"></v-skeleton-loader>
      <v-skeleton-loader height="250" type="card-avatar"></v-skeleton-loader>
      <v-skeleton-loader height="250" type="card-avatar"></v-skeleton-loader>
      <v-skeleton-loader height="250" type="card-avatar"></v-skeleton-loader>
      <v-skeleton-loader height="250" type="card-avatar"></v-skeleton-loader>
      <v-skeleton-loader height="250" type="card-avatar"></v-skeleton-loader>
      <v-skeleton-loader height="250" type="card-avatar"></v-skeleton-loader>
      <v-skeleton-loader height="250" type="card-avatar"></v-skeleton-loader>
    </div>
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
  created() {},
};
</script>

<style>
.skeletor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15%;
}

.contain_skeletor {
  display: block;

  width: 100%;
  /*   height: 100vh; */
  /* 
  overflow-y: scroll; */
}

.p-skeletor {
  padding-top: 50px;
}

.v-skeleton-loader__image {
  height: 520px;
}

.v-skeleton-loader__list-item-avatar {
  height: 145px;
}

.v-skeleton-loader__text {
  height: 67px;
}

.v-skeleton-loader__list-item-avatar .v-skeleton-loader__avatar,
.v-skeleton-loader__list-item-avatar-two-line .v-skeleton-loader__avatar,
.v-skeleton-loader__list-item-avatar-three-line .v-skeleton-loader__avatar {
  height: 70px;
  width: 70px;
}
</style>