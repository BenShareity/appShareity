import io from "socket.io-client";

export default async ({ app }, inject) => {

  let userGet = null
  let userId = 0;
  if (process.client) {
    userGet = localStorage.getItem('username')
    console.log('app', userGet)
  }
  await app.$axios
    .$get(`/user/get-by-nickname/${userGet}`)
    .then((response) => {
      userId = response.id;
    })
    .catch((err) => console.log("🚧 catch", err));

  // Conecta al servidor de socket.io
  if (userId) {
    const socket = io(`${process.env.api_url}/messages`, {
      auth: {
        userId: userId,
      },
    });

    socket.on("connect", () => {
      console.log("socket.connected", socket.connected);
    });

    socket.on("disconnect", () => {
      console.log("socket.connected", socket.connected);
    });

    // socket.on("newMessageResived", (data) => {
    //   console.log("💌", data);
    // });

    // Inyecta la instancia de socket en el contexto de Nuxt
    inject("socket", socket);
  }

};
