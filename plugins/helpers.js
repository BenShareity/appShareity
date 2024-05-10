/* =============
MAIN FUNCTIONS JS
================*/

import Vue from 'vue'
import axios from "axios";

Vue.mixin({
  methods: {
    test(test) {
      console.log('Example Function Test: ', test)
    },
    checkDataUrl() {
      // console.log('Router query', this.$route.query)
      // console.log('Router query', Object.keys(this.$route.query).length)
      /* 
        initMode
        0 Normal
        1 797979
        4 Lightbeat
      */
      let mode = {
          init: 0
      }
      if (Object.keys(this.$route.query).length > 0) {
          if (this.$route.query.lightbeat)
          {
            mode = this.$route.query;
            mode.init = 4
          }
          this.$auth.$storage.setLocalStorage('url_params', mode);
          setTimeout(() => {
              this.$router.replace({'query': null});
          }, 100);
      }
      else {
        this.$auth.$storage.setLocalStorage('url_params', mode);     
      }  
      return mode;    
    },
    assetDataType(asset) {
      let format = asset.split('.');
      format = format[format.length-1];
      format = format.toUpperCase();
      
      if (format == 'MP4' || format == 'MKV' || format == 'MOV' || format == '3GP') {
        return 'video';
      } else {
        return 'image';
      }
    },
    getAssetLink(path){
      return process.env.api_assets_url + path;
    },
    numberFormatter(num, digits) {
      var si = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (
        (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
      );
    },
  }
})

