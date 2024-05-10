<template>
  <v-app dark class="container">
    <h1>
    Ups! You should not get here
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<style scoped>
h1 {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 1.5rem;
  color: gray;
}
.container {
  margin-top: 50%;
  text-align: center;
}
</style>
