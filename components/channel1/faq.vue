<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      hide-overlay
      transition="dialog-bottom-transition"
      :width="windowWidthT + 15"
      :content-class="`${
        toListenWidth > 1264 && toListenWidth < 1904 ? 'margin_desptop' : ''
      }`"
    >
      <div style="background:white; height: 100vh; overflow-y: scroll !important">
        <v-expansion-panels
        flat>
          <v-expansion-panel
            v-for='(item,i) in items'
            :key='i'
          >
            <v-expansion-panel-header
            v-text='item.faq'
            >
            </v-expansion-panel-header>
            <v-expansion-panel-content
            v-text='item.answer'
            >
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn
            class="mx-2"
            fab
            dark
            color="#686868"
            style="position: fixed; top: 83vh; z-index: 4;"
            @click="show = false"
        >
            <v-icon dark> mdi-arrow-left </v-icon>
        </v-btn>
      </div>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  layout (context) {
  return 'App'
  },
  data: () => ({
      show: false,
      items: [
        {
          faq: 'What is a selfie challenge?',
          answer: 'It is a fun challenge done with your smart phone to raise money for causes you care about. The challenge can be pictures, videos or selfies.',
        },
        {
          faq: 'Why do I get badges?',
          answer: 'Badges are earned for every challenge completed. They are stored on your impact screen and are a gateway to that community.',
        },
        {
          faq: 'How do I share my challenge?',
          answer: 'During the challenge process (snap, raise, share) you are prompted to share. You can also share directly from your impact screen - just select the challenge you want to charge and click the share icon. If you don’t see the platform you want to post on then you can “copy link” which allows you to paste it anywhere.',
        },
        {
          faq: 'How do I raise more money?',
          answer: 'There are two raise to raise more money - by sharing your challenge and having other do it because of you and by buying challenges.',
        },
        {
          faq: 'How do I buy other people’s challenges?',
          answer: 'Shareity allows you to keep the campaigns going once sponsor money runs out. New participants will be notified that there is no sponsor and can either buy a challenge or let somebody else buy theirs. If they buy challenges the next users to participate will see the person who bought the challenge advertised instead of a brand or no sponsor. You can also buy challenge by clicking the badge when on the share screen in your community.',
        },
        {
          faq: 'How do I get rewards?',
          answer: 'Shareity allows causes and brands to push rewards for participation. Usually there is a target goal like 10000 points or the “highest shared”. If you get a reward you will be notified directly in the web app.',
        },
        {
          faq: 'How do I add Shareity to my home screen?',
          answer: 'Shareity is a web app and able to be downloaded to your home screen. Just click the share button in your browser and then “add to home screen” follow the instructions and your done. Note: iOS will require you to login by submitting a secure code. Enter your phone number and then the code. There are no passwords in Shareity.',
        },
        {
          faq: 'How do I find a challenge?',
          answer: 'Click the bottom right icon of the app. Here you can search between challenges you hav not completed and trending challenges. If you have unlocked particular trending challenges you will see them if not you will have to do the challenge first.',

        },
        {
          faq: 'Who donates the money?',
          answer: 'Challenges are sponsored by brands to a certain agreed upon amount. If the sponsor reaches their goal the challenge will still be available but will now be “unsponsored” which means people can donate money to buy challenges and keep the campaign going.'
        },
        {
          faq: 'Where does the money go?',
          answer: 'All Shareity challenges are run by causes. The cause logo and information are presented on the locked challenges.'
        },
        {
          faq: 'Where does my data go and what is it used for?',
          answer: 'More details are in the privacy policy, but essentially you are uploading your selfie, pic or video for a cause to monetize it. Brands donate because people do challenges and all the data is stored in that causes database. Causes can see challenge pics, impact information, and names of participants. They are also allowed to ping users. There is a feature to opt out of a cause overreaches their boundaries and even an report feature if it goes too far. Brand are only allowed to send 1 thank you letter and push rewards to participant for impact. Brands also have a database of information but are limited to first name, photo or video and impact. Nobody ever sees your phone number!'
        },
        {
          faq: 'Why do you ask for my phone number?',
          answer: 'In order for Shareity to verify every challenge is unique we need a specific phone number for every challenge done. Otherwise people can upload multiple challenges and the brand would have to pay for each one. We only allow one participation per phone number per challenge.'
        },
        {
          faq: 'How do I delete my account?',
          answer: 'If your reading this, we are sorry to see you go, if there is anything we can do please reach out. Deleting is easy - just click your profile in “my impact” and then “delete account”. All your information and challenge will be deleted and the money and impact you had will be returned if it’s less than 1 week. Otherwise it will be deleted and the impact of the account stored under a generic user ID and any money raise will be kept by the cause.'
        },
        {
          faq: 'What is the Shareity Channel?',
          answer: 'Shareity is a platform create for the people. We believe you are just as much part of the as we are and therefore deserve a piece of the platform. Shareity users can interact with the Shareity community via this channel - think of it as a beta test version in progress.'
        },
        {
          faq: 'Can I suggest challenge ideas?',
          answer: 'Yes, absolutely! We love it when users participate. Just go the the shareity channel (click top right icon) and select “challenge ideas”'
        },
        {
          faq: 'Can I start my own challenge?',
          answer: 'Yes! Just click the contact us button in Shareity channel.'
        },
        {
          faq: 'What is the Shareity mission?',
          answer: 'Inspiring citizens to use their social influence to shine a light on every dollar that is donated world wide. Our socially conscious platform ignites the power of humanity  IT DECLAR ES YOU MATTER!'
        }
      ],
    }),
    computed: {
      ...mapState("phoneSize", ["windowWidthT"]),
      ...mapGetters("login", ["$cookies.get('username')"]),
    },
    methods: {
      toListenWidth(){
        return window.innerWidth
      },
    },
    created(){
        this.$nuxt.$on("faq", (option) => {
        this.show = option
      });
    }
  }
</script>

<style lang="scss" scoped>

.theme--light.v-expansion-panels .v-expansion-panel {
  background-color:transparent;
  font-family: "Lemon/milk", sans-serif;
  font-weight: 600;
  color: #525252;
}
.v-expansion-panel-header {
  text-transform: uppercase;
  font-size: 20px;
  box-sizing: content-box;
  justify-content: center;
  padding: 0px;
  text-align: center;
  min-height: 60px;
  width: 75%;
  margin: auto;
}
.v-expansion-panel-content {
  text-align: center;
  margin: auto 5px;
}
.faq-data {
  width: 100%;
  padding-top: 15%;
  padding-bottom: 15%;
  overflow-y: scroll;
  background-color: #f4f4f4;
}

.v-expansion-panel--active > .v-expansion-panel-header {
  color: #33A9F2;
}
</style>