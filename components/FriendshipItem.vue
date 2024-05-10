<template>
  <div class="container-friendship">
    <div v-if="item.messages > 0" class="count-messages">
      {{ item.messages }}
    </div>
    <div class="friend-img">
      <router-link :to="`/profile/${item.username}`">
        <img v-if="item.imagen" :src="urlBucket + item.imagen" />
        <img v-else src="~/assets/img/png/user.png" />
      </router-link>
    </div>
    <div class="friend-description">
      <h1>{{ item.firstName }}</h1>
      <!-- <h2>ALL CAUSES $0</h2> -->
      <!-- <h2>SWAY $0</h2> -->
      <!-- <h2 class="friend-description--gray">Start a new chat!</h2> -->
    </div>
    <div class="friend-actions">
      <!-- <button class="friend-actions--gray">Unfriend</button> -->
      <button @click="$router.push(`/chat/${item.username}`)" class="btn-action">
        Chat
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],

  computed: {
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
};
</script>

<style scoped>
.container-friendship {
  width: 100%;
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  border-radius: 24px 4px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
  padding: 8px;
  background-color: white;
  position: relative;
}

.count-messages {
  background-color: #01386e;
  color: white;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  min-width: 25px;
  font-size: small;
  position: absolute;
  top: -3px;
  right:-3px;
}

/* -------- img -------- */
.friend-img {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  padding: 5px;
  box-shadow: 0px 0px 4px 2px #20202045;
}

.friend-img img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* -------- description -------- */
.friend-description {
  width: 60%;
  font-size: 9px;
  color: #33a9f2;
  padding-left: 8px;
}

.friend-description h1 {
  font-size: 19px;
  color: rgb(105, 105, 105);
}

.friend-description--gray {
  color: rgb(105, 105, 105);
}

/* -------- buttons -------- */

.friend-actions {
  width: 20%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.friend-actions--gray {
  background-color: rgb(105, 105, 105);
  font-size: 14px;
  padding: 4px 3px;
  border-radius: 20px;
}

.btn-action {
  background-color: #33a9f2;
  color: white;
  text-decoration: none;
  text-align: center;
  font-size: 20px;
  padding: 4px 3px;
  border-radius: 20px;
}
</style>
