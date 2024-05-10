/* =============
MAIN FUNCTIONS JS
================*/

import Vue from 'vue'
import axios from "axios";

Vue.mixin({
  methods: {
    error(test) {
      console.log('Example Function Error: ', test)
    },   
  }
})
