// For more information https://axios.nuxtjs.org/extend
// These function are generic for all axios request

export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    //console.log('axios plugin', error.response);
    //   if (error.response.status === 500) {
    //   redirect('/login');
    // }
  })
}