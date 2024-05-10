<template>
  <div>
    <div class="header-search">
      <div class="header-search_container">
        <div :style="[item?.color ? { background: item?.color } : { background: 'black' }]" class="header-search_title">
        </div>
        <div class="header-search_badge">
          <div class="header-search_badge-img">
            <img class="header-search_badge-img_item" :src="urlBucket + item?.badge" />
          </div>
          <div class="header-search_info">
            <div class="header-search_info-name">
              <div class="header-search_info-name-title">
                <span v-if="from == 'sharedLink'">Accept my challenge</span>
                <span v-else> {{ item?.name }}</span>
              </div>
            </div>
            <!--   <div class="marquee">
              <span>{{ item.name }}</span>
            </div> -->
            <div class="header-search_info-images_organization--container" v-if="sponsor?.length === 0">
              <div class="header-search_info-images_organization--title ">
                RAISE AWARENESS FOR
              </div>
              <div v-if="item?.organization" class="header-search_info-images_organization--noSponsor">
                <div class="header-search_info-images_organization-img"
                  :style="{ backgroundImage: `url(${urlBucket + item?.organization.logo})` }">
                </div>
              </div>
            </div>
            <div v-else class="header-search_info-container">
              <div class="header-search_info-title">
                <div class="header-search_info-title_item">
                  <div class="header-search_info-title_item-name">SPONSOR</div>
                </div>
                <div class="header-search_info-title_item">
                  <div v-if="!item?.typeDonationDescription" class="header-search_info-title_item-name">DONATES</div>
                  <div v-else class="header-search_info-title_item-name">{{ item?.typeDonationDescription }} </div>

                </div>
                <div class="header-search_info-title_item">
                  <div class="header-search_info-title_item-name">TO</div>
                </div>
              </div>
              <div class="header-search_info-images">
                <div v-if="sponsor?.length > 0" class="header-search_info-images_sponsor">
                  <div class="header-search_info-images_sponsor-img"
                    :style="{ backgroundImage: `url(${urlBucket + sponsor[0]?.sponsor.logo})` }">
                  </div>
                </div>
                <div v-else style="width:33%;"></div>
                <div v-if="item?.typeDonation == 'money'" class="header-search_info-images_donation">
                  <div class="header-search_info-images_donation-name">${{ item?.amount }}</div>
                </div>
                <div v-else-if="item?.typeDonation == 'object'" class="header-search_info-images_donation"
                  style="height: -webkit-fill-available;">
                  <div class="header-search_info-images_organization-img">
                    <img class="img-sponsor" :src="urlBucket + item?.typeDonationIcon" alt="">
                  </div>
                </div>
                <div v-else class="header-search_info-images_donation" style="height: -webkit-fill-available;">
                  <div class="header-search_info-images_organization-img">
                    <img class="img-sponsor" :src="urlBucket + item?.typeDonationIcon" alt="">
                  </div>
                </div>

                <div v-if="item?.organization" class="header-search_info-images_organization">
                  <div class="header-search_info-images_organization-img"
                    :style="{ backgroundImage: `url(${urlBucket + item?.organization.logo})` }">
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
export default {
  props: {
    item: Object,
    from: String
  },
  data() {
    return {
      sponsor: null,
    };
  },
  computed: {
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  beforeUpdate() {
    this.sponsor = this.item?.sponsors?.filter((sponsor) => {
      if (sponsor?.status == 1) {
        return true;
      }
    });
  },
  created() {
    console.log('item', this.item)
    this.sponsor = this.item?.sponsors?.filter((sponsor) => {
      if (sponsor?.status == 1) {
        return true;
      }
    });
  },
};
</script>




<style>
/* .marquee {
  background-color: none;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
}

.marquee span {
  display: inline-block;
  font-size: 20px;
  position: relative;
  color:white;
  left: 100%;
  animation: marquee 8s linear infinite;
}

.marquee:hover span {
  animation-play-state: paused;
}

.marquee span:nth-child(1) {
  animation-delay: 0s;
}

.marquee span:nth-child(2) {
  animation-delay: 0.8s;
}

.marquee span:nth-child(3) {
  animation-delay: 1.6s;
}

.marquee span:nth-child(4) {
  animation-delay: 2.4s;
}

.marquee span:nth-child(5) {
  animation-delay: 3.2s;
}

@keyframes marquee {
  0% {
    left: 100%;
  }

  100% {
    left: -100%;
  }
}
 */
.header-search_info-name-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.header-search {
  position: absolute;
  left: 0;
  background-color: #ffffffb8;
  width: 100%;
  height: 115px;
  border-radius: 28px 28px 22px 22px;
  inline-size: -webkit-fill-available;
  margin: 20px 0px;
  z-index: 80;
}

.header-search_container {
  position: relative;
  width: 100%;
  height: 100%;
}

.header-search_title {
  position: absolute;
  height: 32px;
  top: 0;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  border-radius: 22px 22px 0px 0px;
}

.header-search_badge {
  width: 100%;
  height: 100%;
  display: flex;
}

.header-search_badge-img {
  width: 30%;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-search_badge-img_item {
  width: 100%;
  height: 100%;
  padding: 5px;
  object-fit: contain;
}

.header-search_info {
  width: 75%;
  position: relative;
  z-index: 30;
}

.header-search_info-name {
  height: 32px;
  font-family: poppinsregular;
  font-size: 18px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-search_info-images_organization--noSponsor {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.header-search_info-images_organization--container {
  display: flex;
  justify-content: space-between;
  height: 72%;
}

.header-search_info-images_organization--title {
  width: 100%;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: gotham_htfmedium;
  color: black;
  font-size: 9pt;
}

.header-search_info-container {
  display: flex;
  flex-direction: column;
  height: 83px;
}

.header-search_info-title {
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
}

.header-search_info-title_item {
  width: 100%;
  font-family: 'poppinsmedium';
  font-weight: bolder;
  font-size: 15px;
  color: black;
}

.header-search_info-title_item-name {
  width: 100%;
  text-align: center;
  font-size: 10pt;
}

.header-search_info-images_sponsor {
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-search_info-images {
  display: flex;
  height: 62px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 7px;
}

.header-search_info-images_sponsor-img {
  background-repeat: no-repeat;
  width: 90%;
  height: 90%;
  background-size: contain;
  background-position-y: center;
  background-position-x: center;
  object-fit: fill;
}

.header-search_info-images_donation {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-search_info-images_donation-name {
  font-family: poppinsbold;
  font-size: 37px;
  color: black;
}

.header-search_info-images_organization {
  display: flex;
  position: relative;
  width: 33%;
  height: 100%;
}

.header-search_info-images_organization-img {
  background-repeat: no-repeat;
  width: 90%;
  height: 90%;
  background-size: contain;
  background-position-y: center;
  background-position-x: center;
  object-fit: fill;
}
</style>

<style scoped>
.header {
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  height: auto;
  width: 100%;
  position: absolute;
  top: 0;
  margin-top: 4%;
  z-index: 10;
}

.header-top {
  display: grid;
  grid-template-columns: 20% 70%;
  height: 27px;
  border-start-start-radius: 15px;
  border-start-end-radius: 15px;
}

.header-top-title {
  font-size: 18px;
  color: white;
  width: 100%;
  text-align: center;
  font-family: poppinsregular;
}



.header-description {
  position: relative;
  background: rgba(255, 255, 255, 0.688);
  -webkit-border-bottom-right-radius: 15px;
  -webkit-border-bottom-left-radius: 15px;
  -moz-border-radius-bottomright: 15px;
  -moz-border-radius-bottomleft: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
}

.header-description-items {
  display: grid;
  grid-template-columns: 30% 1fr 1fr 1fr;
}

.header-description-item {
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding-top: 5px;
  align-items: center;
}

.header-description-item img {
  height: 50px;
  width: 60%;
  object-fit: contain;
}

.header-description-item h1 {
  font-size: 14px;
  text-align: center;
}

.header-description-items__item-Img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-description-items__item-Img img {
  position: relative;
  top: -18px;
}

.donates {
  font-family: poppinsbold;
  font-size: 2.6em;
  color: black;
}

.img-sponsor {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 640px) {
  .img-sponsor {
    width: 80%;
    margin-top: 10px;
    margin-left: 10px;
  }
}
</style>