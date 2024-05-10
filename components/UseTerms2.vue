<template>
  <v-dialog class="termin2" v-model="show" hide-overlay transition="dialog-bottom-transition" content-class='modal-termins'>
    <v-card color="#33a9f2">
      <v-toolbar dark color="#33a9f2" height="80">
        <v-btn icon dark @click="show = false">
          <v-icon size="30"> mdi-arrow-left-circle </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <div class="container_IMG">
            <img class="T_img" :src="image" />
          </div>
        </v-toolbar-items>
      </v-toolbar>

      <div class="center">
        <div class="content">
          <v-img width="300px" :src="require('~/assets/img/png/login/shareity_white.png')"></v-img>
          <p>
            Thanks for taking the time to read our Terms of Use. We are
            forever striving to build the Share Care Economy - people centric
            technology that shares the world for good! <br><br> In doing this we want
            to be as transparent as possible and consider all feedback. <br><br> Here
            you go: Simply put, with Shareity you use your social influence
            for good. You don’t have to donate money, just do fun challenges
            and share with friends. Most of the time brands sponsor challenges
            by donating money/other to causes for every person that completes
            a Shareity Challenge. Some of our challenges are unsponsored as
            well, meaning you can still do it and wait for a sponsor or donate
            money to become a sponsor. <br><br> Every challenge you do with Shareity is
            verified and authenticated with what we call a Totally Shareable
            Token (TST). TST are created by our patented “Blockchain for
            Social Influence” technology that works as a human blockchain to
            authenticate and validate your challenge. With a TST you not only
            own the picture/video challenge but also all the reciprocity -
            impressions, views, influence everywhere in the world, in any
            platform, including dark web. And if you don’t want anyone to see
            your “work of art” anymore then you can take it down (offline)
            whenever you want and the only one that can see it is you. Because
            there is only one unique image to own. Oh, and since your TST is
            completely unique, shareable, trackable and authenticated, it is
            also sellable. And unlike an NFT that is a picture/video/etc
            authenticated by a computer algorithm where anyone can own the
            “original code” of that “jpg picture” regardless of whether or not
            they actually own the token, with your TST you actually own the
            reciprocity where people can only view your work of art, not
            actually store the image on their device. <br><br> You now own this unique
            piece of work so take care of it and be sure to increase the value
            by sharing it everywhere - it only gets better from here. <br><br> Taking
            credit for a challenge, or verifying its uniqueness (TST) is also
            done such that a brand sponsor will want to donate. The
            authentication is as simple as entering phone number - Shareity
            does the rest. You are allowed one (1) (photo/selfie/video) per
            phone number per campaign challenge. Your phone number will not be
            shared with anyone for any reason! Your phone number is stored in
            the Shareity database and only used as a way to send messages
            relevant to your progress or other opt-ins such as: notifications
            when someone accepts your challenge, rewards, likes, or
            sponsorship of other challenges. Once your user is on record it is
            also used as your login from any device. <br><br> By using this platform
            you are consenting to use your social influence and personal data
            to raise money for causes you care about. Your data is protected
            at all times and only certain information is shared with cause and
            brands (name, impact score) And remember you are in control, so
            you can take your challenge down whenever you want, stop getting
            notifications or rewards and, yes, delete your data and entire
            social impact anytime you want. And remember when you delete, all
            posts, no matter where (social, text, email) will be erased. <br><br> When
            you share you raise more money for your cause and get points as
            your influence grows. Further, you can get branded rewards if you
            are a top sharer. And it doesn’t stop there: users of Shareity
            earn coin as part of the project - imagine owning part of Facebook
            or Snapchat just for using their platform. Simply put, the more
            you share and the more involved you are, the more Shareity Coin
            you get. <br><br> How Shareity works: <br><br> Brand sponsors a Shareity Challenge
            for a predetermined amount of money. <br><br> For every challenge completed
            the brand donates $1 to the host cause “because of the users
            action” - and the user is shown a quick 5-10 sec. “thank you”
            message. <br><br> This donation is made directly to the cause without any
            charges to the cause - this transaction is handled between the
            cause and brand. <br><br> The brand sponsor is then charged ~$0.25 for
            every challenge completed through the Shareity platform - this is
            how we keep our lights on. <br><br> Users share their challenge, raising
            more money/awareness and expanding the reach of the cause as
            friends join the community. <br><br> We built a platform for the people
            that uses patented technology and social influence to solve the
            worlds problems. Shareity brings together people, causes and
            brands for good, where everyone wins. If you have any comments,
            ideas or just want to help, please let us know, your voice will be
            heard! <br><br> Is your selfie worth something? <br><br> Benjamin Hill <br><br> Co-founder
            Shareity
          </p>
          <v-btn class="rounded-lg py-4 mt-6 mb-6 text-capitalize" style="color: white; margin-bottom: 30px; margin-top: 30px;" color="#33a9f2"
            @click="$nuxt.$emit('UseTerms3', true)">
            GO TO TERMS OF USE
          </v-btn>
          <br><br><br><br>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
  
<script>
const imgLink = require("@/assets/img/png/footer/icoLogo.png");
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: false,
      image: imgLink,
    };
  },
  created() {
    this.$nuxt.$on("UseTerms2", (option) => {
      this.show = option;
    });
  },
  methods: {
    toListenWidth() {
      return window.innerWidth
    },
  },
  computed: {
    ...mapState("phoneSize", ["windowWidthT"]),
  },
};
</script>
<style>
.modal-termins {
  width: 400px !important;
}
@media(max-width:600px) {
  .modal-termins {
    width: 100% !important;
    margin: 0px !important;
    height: 100%;
    overflow: hidden;
  }
}
</style>
<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
}

.content {
  height: 100%;
  color: white;
  overflow: auto;
  width: 100%;
  padding: 20px;
  inline-size: auto;
}
.content p {
     line-height: 27px;
    font-weight: 600;
    font-size: 17px;
}
.container_IMG {
  display: flex;
  justify-content: center;
  align-items: center;
}

.T_img {
  width: 36px;
  height: 41px;
}

.center::-webkit-scrollbar {
  -webkit-appearance: none;
}

.center::-webkit-scrollbar:vertical {
  width: 10px;
}

.center::-webkit-scrollbar-button:increment,
.center::-webkit-scrollbar-button {
  display: none;
}

.center::-webkit-scrollbar:horizontal {
  height: 10px;
}

.center::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.center::-webkit-scrollbar-track {
  border-radius: 10px;
}
</style>