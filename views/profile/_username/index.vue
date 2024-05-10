<template>
  <div :key="componentKey" class="bg">
    <div class="header-profile">
      <div class="ripple">
        <img @click="$router.push('/')"
          style="width: 35px; border-radius: 100%; object-fit: contain; box-shadow: 0px 4px 4px 0px #00000040;"
          src="@/assets/img/button-float/backwhite.png" alt="">
      </div>
      <div class="title-profile">
        <h4>{{ userData?.firstName }}</h4>
        <h4>{{ userData?.lastName }}</h4>
      </div>
      <div :class="similarSession ? 'view-edit' : 'view-edit-no'" class="ripple" @click="openOptions">
        <svg width="25" height="25" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="30" height="30.4412" fill="url(#pattern0)" />
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_969_119" transform="matrix(0.00614973 0 0 0.00606061 -0.00120322 0)" />
            </pattern>
            <image id="image0_969_119" width="163" height="165"
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKMAAAClCAYAAAAwNU2dAAAACXBIWXMAAAsSAAALEgHS3X78AAALr0lEQVR4nO2de3ATxx3HN7YxYGxLfvyP6UxmMpN24mlnMk1gsCkpbUgoJmUClId1PBqewTxMwOBiYl41GGzeCQ9hnk4mTZSSR0NKEalDWjoNZpp0mFJq+38wNn4QguTt3OlOyJZlS/I9fnv6fsYeWafV7Ur38e7e3t7+nuCcMwDiJX2Dx8X8Phf3+QuY38e4z8+Y33eF+/0e5vOffOBe3BbtriEjiIuMik/ymc/v4X7/6BAJHz/6/Yz5/C3c7yv67tTyxmjySMKhALGSWXkxnzHmZYyNHuSt8uvXh8+udUWTBWQEMeHYfkkT0RHD+9zDZ1QPKuSAzXTOmVuFjPM89TewUX5U/w68lys/j7c/fs5D3xMhHQ/bb3g6rj0PSxeSV5+y9U6j5hW27/B0gc0h6ULzYSFpepe1jTHe2FXzG6+d1XZUeeWm2cv9fgf3++RmONAcR26mGQ/+rTxK37+37mSk/YfJmHvutiygi3NerGzgPPzgQcbwsgZea2eceRjjJV375kTdcRcBZ3VDPvf7vMwnixiQLA4ZGZOF/GBDv0IGm+nc8/9z5p677WGMXWaMFdvpizQRh/rdNaetOJ1vlw/lrPkqnqY5Eu5hUyr7bbJD+4xyZlN1yAwEDpo3bfnpPNG/i6wD1/QUUcM9bHJFmJCKjLn1TRWMsWd0zAwEDl7E/pEIZB3+2ggRNdwpk8p7CanVjCWQxxAK0padKhSx4NlHbxgpooY7ZeKGoJBJufVNhQZnmOhENcZGiewT35ohooY7uXCd0r+Wa0bbdLSJIlS/MafuppkianiSxq12yjI6Tcw0ERHmnz3n7C0rRGTqlRoXrsAYT1TXZa0mt77JKhE1IKMJNFMvYG59U57FIso8AxmNx0O9gHdmjmmmUE7IaCw3ug/OIy8jCwgpn/XXWVkGyGgc7aIN69yd/aSVQrZARmOQRSzsPjBXiJOXUO4WP2WVkB7IqD/ygczv3i+eiBqt8582W0j5n7ciRYcdtYh+DVYn5LPRxq59s20xdax10TOurMNfM5NmcLl6Gva06SFjc+uCH1bosB9AjHtLfuzKOnCNGSyk5PdWKSd5aKbBgNxb/qyRTbbku7Qj2KpCRjAobSXPGSGk5LtY2at7BxlBVLStGaenkNKjTyrCzjMgI4ia9nWFeggpPbpQPvA9MMA+pE7b4Uot2t6YOnWb7jOy2ssmDkXIiDdjMchoP1Jf2SnL4lZvI/EOm7JVdyHvl0+KR8gBb1NlkNFepE6v0kTUCAj58pu6C9lRMTlaIeUB7WkP31kz6Fg0ZLQJqdN39RVRIyDkS1v0F3LrlMGEVC6LPjy7MqrJIpDRBgx/dXckETUCQk6u0F3Izh1FkYRURIx20ScGGcVHXcNmIBE1AkK+uFl/Iaum9xVSEfGBe3FM1+cho8AMn7k3WhE1FCFTflGuu5Bde2ZoQgZEPLoo5okikFFQhs+qiVVEjYCQkzbpL2TtbJcyY+nI/LhmLEFGAVHXO4xHRI2AkD/fqLuQ3QfnxX3PD2QUjBFz9g1VRI2AkC+UkblVGTIKxIi5+/USUSMg5MQNJISEjIIwYt5BvUXUUIRMnvCG5UJCRgEYUXzIKBE1AkIWrrNUSMhInBHSYaNF1AgIWVBqmZCQkTAj5x8xS0SNgJDj11oiJGQkysgFb5stokZAyHFrTBcSMhJk5ELLRNRQhEwau8pUISEjMUYuOma1iBqykI1Jz5eYtqQfZCTEyNeOUxFRY7R6P7gpQEYipC0+QU1EDdPWe4eMBEhb4qYqotRztca01UIgo8WkLa2jK+KXe01dtgYyWkjaslNkRfQ3VJu+fhJktIi0FafpivjFbksW8oKMFjDq9TN0Rbyyy7IV5SCjyYxaeZauiN4qS5c2hIwmMqrkPF0RL//e8jU2IaNJjFpdT1bE0GXprAQymsCoNe/QFfHP28msOgwZDSZ97bt0Rfx8G6nlryGjgaSXvkdXxItbya3DDhkNIn3dH+iK+FklyYAAkNEA0te/T1bER59uIRuZAjLqTPqGD+iK2M/SxZSAjDqSUeahK+LHm8nH6oGMOpGx8Y90Rfzod0IEjYKMOpCx6QJdES9sEiZ6GWQcIhnlH5EV8fsPNwoVRg8yDoGMzR/TFdFTJlw8R8gYJ5kVn9IVcYDwFpSBjHGQueVPdEV8f72wEW4hY4xkvvkZXREHibNCHcgYA5mVFwmLWCp8zG/IGCWZ2z4nK+LDd9faIvg8ZIyCzO2X6IoYReQpUYCMg+DY8Re6Itavso2IDDIOjGPnZboini+xlYgMMkbGUeWlK+LZlbYTkUHG/nHs+oKsiN+ded2WIjLIGI5j91/pinh6hW1FZJCxN87qBroinlompIjJBaV5yQWlUS04mmJ8ccTAuedLuiLWLRVKxOQJb8jfZRHjfGpw2/i1jHF+g3F2kjN+sqdhT1vf96FmlEWsuUpXRPcSYUSUI20l/2y9V/0up/aTRF6aeS9jrDlp7Kqw2jLhZXTW/o2siA9OLBZIRCUGoSxiQRTJHYyx633XC09oGZ37/k5XxOO/Fa2PWKPWfLHgTXq+JBhRIWFlzNp/ja6Ix8QSMeWFsjzGWHEcb3WErhmekDJmHfgHXRGPLhTxrNmlx3sTTsasQ/+kK+JbC0QdRxxKrJjRSc+tVJrqhJIx6zBdEbuPzBd5QHuokbQUmRNGxqwj1+mKeFiy9ZWVaEkIGbPfaswnK+KhYoiokig1I8UDLnUfnAcRQ7C9jNlHb7jiGP8yGql7/1yI2IdEqBkrCJQhFKlr3xyI2A+2ljH72L+K1MigVJC6amdDxAjYvWY0LSJoFEhdNbMg4gDYVsbs49/kR3nR3gykrj0zIeIg2LlmpFIrSl3VMyBiFNhSxuwT3zrjvHCvN1Ln7lchYpTYtWakUCtKnbumQ8QYgIzGIHVW/RoixojtZMxx/9ulzpOzCqlz5ysQMQ7sWDNaOcgtde6YBhHjxFYy5tTdLLRwkFvq2F4EEYeA3WpGq/qKUse2X0HEIWIbGXPqbuZFuD3SaKSOrVMgog7YqWa0oq8odVS+DBF1whYy5pz+j1NZwcBcpI4tL0FEHbFLzWj2cI50v+JFiKgzdllrx6wTlxuy+Pc3/7LRpPwSCuFlzDlzy2XCcI4sYc398kmoDQ3EDjXjUG4gH4wPFQnLJnoNzAOoCC1j7tn/GjFnsZ0x5pHPztvXT2jWed9gAESvGfXsK7aodxHWtJeOD1s7EBiPsDLmnrsd72JDfVH6g22rx6I/aDEi14xD7SvWyTVh28qfoj9IBJFljKeJbtea4nsrnkV/kBhCyphb3xTrIHeLernQc2/pT9AfJIqoNWO0teIVuRZsfS3fY3B5gA4IJ2NufVP+IMuVBIdmWhf+CE2xQIhYM0ZaCzA4NNM6/2k0xQJiBxnlpvjk3eKnMDQjOCLKKNd6W9QwD2135zyJSQs2QTgZ78wc41VFBDYj4YMSATpARkAGyAjIABkBGSAjIANkBGSAjIAMkBGQATICMkBGQAbICMgAGQEZICMgA2QEZICMgAyQEZABMgIyQEZABsgIyAAZARkgIyADZARkgIyADJARkAEyAjJARkAGyAjIABkBGfRY+MmZffybQsY5U34ZV37kv7nynIVtD33eK02EdFx7HpYuJK9er7E+adS8wvYdni6wOSRdaD4sJE3fsvZJx3noa/2Um6mfvc++Q/fX+7sZqDyDpwv7nnvlGfq5I6cLP1bBzxdpzcyY0ENGeRXZy3oUBiQ2aKYBGSAjIANkBGSAjIAMkBGQATICMkBGQAbICCigRDJLQhgLYDU9X9UGZUR8PWAlV7S8k+7MHNMcugEAkwmG2dP6jBU4AsACWtQIuAqKjGoItFocDWAicijmop6rNcEIuMGz6TuzfiAHFF+lJgLASOQasbDnak2vIKRPBOeoqeSeu53HOHdxzouU6WGch89fC52PF2GeIuYzJtB8xrDP3W+6dsa5l3Hm8TdUh4djZoz9H0Fp/mcq3NpwAAAAAElFTkSuQmCC" />
          </defs>
        </svg>
      </div>
      <div v-if="showOptions" class="modal-profile">
        <p @click="menuClick(1)">Edit Profile</p>
        <p @click="menuClick(2)">Logout</p>
        <p @click="menuClick(3)">Delete Account</p>
      </div>
    </div>
    <v-dialog v-model="dialogDelete" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Shareity </v-card-title>
        <v-card-text>
          Are you sure you want to delete your account it will erase all
          progress and any money raised. If you would not like to be part of
          specific campaigns anymore then click here to opt out of individual
          campaigns
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="deleteAccountAction(userData.id)">
            Delete
          </v-btn>
          <v-btn color="blue" text @click="dialogDelete = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center" class="container-profile">
      <div style="padding: 5px; width: 100%;" @click="showOptions = false">
        <div
          style="display: flex; justify-content: center; align-items: center; flex-direction:column; gap: 30px; margin: 20px">
          <div class="container-profile-photo">
            <div :class="!userData.imagen ? 'card-avatar-png' : 'card-avatar-user-png'"
              style="width: 115px; height: 100px;">
              <img
                :src="userData?.imagen ? urlBucket + userData?.imagen : require('~/assets/img/png/userfeed-2.png')" />
            </div>
          </div>
          <div class="contend-options">
            <div class="contend-options_img">
              <div class="ripple">
                <span v-if="loadingIcon" class="loader_icon"></span>
                <template v-else>
                  <img v-if="similarSession" @click="goToButton('rewards')" class="icon-reward "
                    src="@/assets/img/button-float/rewards.png" alt="">
                  <div v-else style="width: 56px; height: 45px;">
                    <div class="card">
                      <div class="percent">
                        <svg>
                          <circle r="18" cx="27" cy="29"></circle>
                          <circle r="18" cx="27" cy="29" ref="circles" />
                        </svg>
                        <p>{{ power }}</p>
                      </div>

                    </div>

                  </div>
                  <img v-else class="icon-reward " src="@/assets/img/button-float/sway.png" alt="">
                </template>


              </div>
              <div class="ripple">
                <span v-if="loadingIcon" class="loader_icon"></span>
                <template v-else>
                  <img v-if="similarSession" @click="goToButton('notifications')" class="icon-notification"
                    src="@/assets/img/button-float/notification.png" alt="">
                  <img v-if="(areFriend == 3 && !similarSession) || (areFriend == 0 && !similarSession)"
                    @click="addFriend()" class="icon-reward " src="@/assets/img/button-float/friend.png" alt="">
                  <img v-if="areFriend == 2" @click="addFriend()" class="icon-reward "
                    src="@/assets/img/button-float/pending.png" alt="">
                  <img v-if="areFriend == 1" @click="addFriend()" class="icon-reward"
                    src="@/assets/img/button-float/chat-active.png" alt="">
                </template>

              </div>
            </div>
            <div class="contend-options_text">
              <p v-if="loadingIcon" style="color: #013A71; font-size: 12px;  font-weight: 700; margin: 0;">Laoding...
              </p>
              <p v-if="loadingIcon" style="color: #013A71; font-size: 12px;  font-weight: 700; margin: 0;">Laoding...
              </p>
              <template v-else>
                <p v-if="similarSession" style="color: #013A71; font-size: 12px;  font-weight: 700; margin: 0;">Rewards
                </p>
                <p v-else style="color: #013A71; font-size: 12px;  font-weight: 700; margin: 0;">Sway</p>
                <p v-if="similarSession" style="color: #013A71; font-size: 12px;  font-weight: 700; margin: 0;">
                  Notifications</p>
                <template v-if="!similarSession">
                  <p v-if="areFriend == 3 || reFriend == 0"
                    style="color: #013A71; font-size: 12px;  font-weight: 700; margin: 0;">Accept</p>
                  <p v-if="areFriend == 1" style="color: #013A71; font-size: 12px;  font-weight: 700; margin: 0;">Chat
                  </p>
                  <p v-if="areFriend == 0" style="color: #013A71; font-size: 12px;  font-weight: 700; margin: 0;">Add
                    friend</p>
                  <p v-if="areFriend == 2" style="color: #013A71; font-size: 12px;  font-weight: 700; margin: 0;">
                    Pending
                  </p>
                </template>

              </template>
            </div>
          </div>
        </div>



        <!--  <v-row no-gutters align="center" justify="center" style="margin: 0px">
          <v-col v-for="stat in stats" :key="stat.name" cols="4">
            <div class="title-stats">
              {{ stat.name }}
            </div>
            <p class="data-stats">
              {{ stat.name == "Total Raised" ? "$" : "" }}{{ stat.data }}
            </p>
          </v-col>
        </v-row> -->
        <div v-if="session" class="contend-bottom-status">
          <button class="button-status"
            :style="[areFriend == 2 ? { background: '#6f6f6f' } : { background: 'linear-gradient(90.02deg, #2F4B75 0.02%, #47A4E7 24.51%, #78C6FF 48.5%, #47A4E7 73.49%, #2F4B75 99.98%)' }]"
            v-if="!similarSession && areFriend == 3" @click="addFriend()" style="color: #fff">
            <span>Accept</span>
          </button>
          <button class="button-status" style="color:#757575;background-color: #fff" v-if="areFriend == 3"
            @click="decline()">
            Decline
          </button>
        </div>
        <!-- <v-row v-if="session" align="center" justify="center">
          <v-btn class="mx-2 mb-3" v-if="!similarSession" @click="addFriend()" style="color: #fff"
            :color="areFriend == 2 ? '#6f6f6f' : '#33A9F2'">
            {{ areFriend == 0 ? "Add friend" : areFriend == 2 ? "Pending" : areFriend == 3 ? "Accept request" : "Chat with friend"}}
          </v-btn>
          <v-btn class="mx-2 mb-3" variant="flat" color="error" v-if="areFriend == 3" @click="decline()">
            Decline
          </v-btn>
          <elements-buttons-model2 @click="$router.push(`${$route.params.username}/edit`)" text="Edit Profile"
            v-if="similarSession" />
          <elements-buttons-model2 @click="openModalMyCommunities()" text="Communities" v-if="similarSession" />
        </v-row> -->
        <template v-if="loading">
          <div data-app>
            <Loading :active="loading" />
          </div>
        </template>
        <v-dialog v-model="dialog" persistent width="90%" style="margin: 20px" content-class="content-message">
          <v-card>
            <template v-if="message">
              <v-card-title class="text-h5"> Error </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="closeDelete">
                  Done
                </v-btn>
              </v-card-actions>
            </template>
            <template v-else>
              <v-card-title style="font-size: 17px">
                Are you sure to delete this challenge?
              </v-card-title>
              <v-card-text>If you delete this challenge you will not be able to see it
                again and you will lose the follow-up</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="deleteChallenge()">
                  Delete
                </v-btn>
                <v-btn color="green-darken-1" variant="text" @click="closeDelete">
                  Cancel
                </v-btn>
              </v-card-actions>
            </template>
          </v-card>
        </v-dialog>
        <div class="grid-collections" v-if="!loading">
          <template v-for="(item, index) in userData?.userChallenges">
            <GridChallenges :item="item" :deleteUser="deleteUser" :dialog="dialog" :loading="loading"
              :closeDelete="closeDelete" :deleteModal="deleteModal" :index="index" :arrayChallenge="userData"
              :userData="session" />
          </template>
        </div>
      </div>
    </v-row>
    <v-bottom-sheet v-model="sheet" :width="windowWidthT + 'px'" hide-overlay>
      <v-sheet class="text-center fondo" height="200px" z-index="3" hide-overlay>
        <v-btn class="mt-4" text color="blue" @click="sheet = !sheet">
          Done
        </v-btn>
        <div class="py-4 ml-5">
          <v-row>
            <v-col class="steven" cols="4">
              <v-img width="65px" :src="require('~/assets/img/png/steve_buy_usd.png')"></v-img>
            </v-col>
            <v-col cols="6" style="display:flex; justify">
              <p class="typefontt" style="color: white;">
                Your invitation is on the way!
              </p>
            </v-col>
          </v-row>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <full-screen />
    <ModalAlertMessage />
    <div data-app>
      <ShareFriends />
    </div>
    <div :class="[showInfo ? 'welcome-profile' : 'none']" @click="closeInfo">
      <div class="welcome-profile__img"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import GridChallenges from "@/components/partials/GridChallenges.vue";
export default {
  //middleware: "auth",
  layout(context) {
    return "Modal";
  },
  data: (vm) => ({
    dialog: true,
    sheet: false,
    userData: {},
    view: false,
    requestSent: false,
    areFriend: 0,
    session: null,
    similarSession: false,
    id: null,
    power: 0,
    otherUser: null,
    showInfo: false,
    stats: [
      {
        name: "Total Raised",
        data: 0,
      },
      {
        name: "Challenges",
        data: 0,
      },
      {
        name: "Friends",
        data: 0,
      },
    ],
    friends: [],
    dataProfile: null,
    deleteUser: false,
    componentKey: 0,
    dialog: false,
    loading: false,
    message: false,
    objetDelete: null,
    loadingIcon: false,
    showOptions: false,
    dialogDelete: false,
  }),
  components: { GridChallenges },
  computed: {
    ...mapGetters("challenges", ["getChallengesRelational"]),
    ...mapState("phoneSize", ["windowWidthT", "windowLeftT"]),
    urlBucket() {
      return process.env.api_assets_url;
    },
  },
  watch: {
    power(value) {
      console.log('value', value)

      let rounded = Math.round(Number(value))
      console.log('rounded', rounded)
      setTimeout(() => {
        this.$refs.circles.style.cssText = ` --percent: ${rounded}`;
      }, 100);
    },
  },
  methods: {
    ...mapActions("user", [
      "userDataAction",
      "areFriendsAction",
      "nicknameAction",
      "usernameAction",
      "swayScoreAction",
    ]),
    ...mapActions("phoneSize", ["onRezise"]),
    ...mapActions("user", ["deleteAccountAction", "nicknameAction"]),
    deleteModal(deleteItem) {
      this.dialog = true;
      this.objetDelete = deleteItem;
    },
    openOptions() {
      this.showOptions = true
    },
    deleteChallenge() {
      this.$axios
        .$delete("/user-challenge/" + this.objetDelete.id)
        .then((res) => {
          this.getChallengeUser();
          this.dialog = false;
          this.objetDelete = null;
          this.$forceUpdate();
        })
        .catch((err) => {
          console.log("error al eliminar el challenge", err);
          this.loading = false;
          this.message = true;
          this.objetDelete = null;
        });
    },
    menuClick(option) {
      switch (option) {
        case 1:
          this.$router.push(`${this.$route.params.username}/edit`)
          this.showOptions = false
          break;
        case 2:
          localStorage.clear();
          this.showOptions = false
          this.$router.push('/') 
          break;
        case 3:
          this.dialogDelete = true;
          this.showOptions = false
          break;

        default:
          break;
      }

    },
    closeDelete() {
      this.message = false;
      this.dialog = false;
      this.objetDelet = null;
    },
    openModalMyCommunities() {
      this.$router.push({
        path: "/mycommunities",
        query: { tab: "communities" },
      });
    },
    addFriend() {
      // Add to friends
      if (this.areFriend == 0) {
        this.$axios
          .$post("/user/friendship-request", {
            userId: Number(this.session.id),
            userFriendship: [Number(this.user.id)],
          })
          .then((res) => {
            this.requestSent = true;
            this.areFriend = 2;
            this.sheet = true;
          })
          .catch((err) => (this.requestSent = true));

        // Chat with the profile user
      } else if (this.areFriend == 1) {
        this.$router.push({ path: `/chat/${this.user.username}` });

        // Accept friend request
      } else if (this.areFriend == 3) {
        this.$axios
          .$post("/user/friendship-request", {
            userId: Number(this.session.id),
            userFriendship: [Number(this.user.id)],
          })
          .then((res) => {
            this.requestSent = true;
            this.areFriend = 1;
            this.sheet = true;
          })
          .catch((err) => (this.requestSent = true));
      }
    },
    // Reject friendship request
    decline() {
      this.$axios
        .$delete(`/user/friendship-delete/${Number(this.user.id)}`)
        .then((res) => {
          this.areFriend = 0;
        });
    },
    closeInfo() {
      const res = localStorage.getItem("profile");
      if (res == 1) {
        this.showInfo = false;
        localStorage.setItem("profile", 0);
      }
    },
    // Consult the number of friends
    getfriends() {
      this.$axios
        .$get(`/user/get-friends/${this.$route.params.username}`)
        .then((response) => {
          this.friends = response.map((element) => {
            if (element != null) this.stats[2].data++;
          });
        });
    },
    getChallengeUser(vm) {
      this.loading = true;
      console.log(this.stats);
      this.usernameAction(this.$route.params.username).then((otherUser) => {
        this.swayScoreAction(otherUser).then((resSway) => {
          console.log("BUEEENO", resSway);
          this.stats[0].data = resSway.raised.money ? resSway.raised.money : 0;
        });
        console.log(otherUser);
        if (otherUser.length < 1) this.$router.push({ path: "/" });
        this.dataProfile = null;
        // this.dataProfile = otherUser;
        this.userData = otherUser;

        console.log("ESTOOOO", this.userData);
        this.userData.userChallenges.forEach((element) => {
          element.idProfile = this.userData.id;
        });
        this.similarSession = this.session.username == otherUser.username;
        console.log("sesssion", this.session);
        this.areFriendsAction({
          user: this.session.id,
          otherUser: otherUser.id,
        }).then((r) => {
          this.areFriend = r.code;
        });

        if (this.similarSession) {
          this.user = this.session;
        } else {
          this.user = otherUser;
        }
        if (this.session.id === this.userData.id) {
          this.deleteUser = true;
        } else {
          this.deleteUser = false;
        }
        this.stats[1].data = this.userData.userChallenges
          ? this.userData.userChallenges.length
          : 0;
        setTimeout(() => {
          this.loading = false;
          this.power = Math.round(Number(this.userData.sway))
          this.loadingIcon = false
        }, 1500);
      });
    },
    hasHistory() {
      return window.history.length > 2;
    },
    goToButton(route) {
      switch (route) {
        case 'rewards':
          this.$router.push({ path: `/rewards` });
          break;
        case 'notifications':
          this.$router.push({ path: `/notifications` });
          break;
        default:
          break;
      }

    },
    getButtonStyle(isSpecialOffer) {
      console.log('isSpecialOffer', isSpecialOffer)
      return {
        gridTemplateColumns: isSpecialOffer == 2 && '1fr 1fr' || isSpecialOffer === 3 && '1fr 1fr 1fr' || isSpecialOffer > 3 && '1fr 1fr 1fr 1fr 1fr' || isSpecialOffer < 2 && '1fr'
      };
    },
  },
  created() {
    this.loadingIcon = true
    this.nicknameAction().then((session) => {
      setTimeout(() => {
        this.$refs.circle.style.cssText = ` --percent: 10%`;
      }, 2000);

      console.log("lo que recibo", session);
      if (session) {
        console.log(this.$route.params.username);
        console.log("quejesto", session);
        this.swayScoreAction({
          id: session.id,
        }).then((r) => {
          if (this.userData.username === session.username) {
            this.stats[0].data = r.raised.money;
          }
          // if (r.raised.money !== undefined) {
          //   console.log("bueno entonces", r);
          // }
        });
        if (this.$route.params.username === session.username) {
          const res = localStorage.getItem("profile");
          console.log(session);
          console.log(this.$route.params.username);
          if (res == 1) {
            this.showInfo = true;
          } else {
            this.showInfo = false;
          }
        }
      }

      // Validate whether the user is a friend or not

      this.session = session;

      this.getChallengeUser();

      this.view = true;
    });
  },

  mounted() {
    this.onRezise();
    window.addEventListener("resize", () => {
      this.onRezise();
    });
    this.getfriends();
  },
  head() {
    return {
      title: "Profile",
      meta: [
        {
          hid: "og:image",
          property: "og:image",
          content: "@/assets/img/png/user.png",
        },
        {
          hid: "description",
          name: "description",
          content: "Shareity Web App",
        },
        {
          name: "keywords",
          content: "Shareity, Web App",
        },
      ],
    };
  },
};
</script>
<style>
.loader_icon {
  width: 32px;
  height: 32px;
  border: 3px solid #096ea4;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.modal-profile {
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  background-color: white;
  box-shadow: 0px 0px 0px 0px #00000040;
  border-radius: 15px;
  right: 10px;
  padding: 20px;
  top: 60px;
  animation: fade .6s forwards;
  overflow: hidden;
}

@keyframes fade {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: fit-content;
    opacity: 1;
  }
}

.modal-profile p {
  margin: 0;
  color: #2F4B75;
  font-weight: 600;
  font-size: 14px;
}

.header-profile {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 9px -6px black;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  position: relative;
  border-radius: 0px 0px 30px 0px
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.ripple {
  position: relative;
}

.ripple:active::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: #0b75ab;
  pointer-events: none;
  left: 50%;
  top: 50%;
  animation: ripple 0.5s linear forwards;
}

.view-edit {
  visibility: visible;
}

.view-edit-no {
  visibility: hidden;
}

@keyframes ripple {

  0% {
    width: 30px;
    height: 30px;
    opacity: 0.8;
  }

  50% {
    width: 40px;
    height: 40px;
    opacity: 0.4;
  }

  100% {
    width: 120px;
    height: 120px;
    opacity: 0;
  }
}
</style>
<style lang="scss" scoped>
.card .percent {
  position: relative;
}

.card .percent p {
  margin: 0;
  position: absolute;
  top: 18px;
  bottom: 0;
  left: 26px;
  font-size: 12px;
  height: fit-content
}

.card svg {
  position: relative;
  width: 52px;
  height: 55px;
  transform: rotate(-90deg);
}

.card svg circle {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: #0e8ac130;
  stroke-width: 4;
  stroke-linecap: round;
}

.card:nth-child(1) svg circle:last-of-type {
  stroke: #01386e;
}

.card:nth-child(2) svg circle:last-of-type {
  stroke: #01386e;
}

.card svg circle:last-of-type {
  stroke-dasharray: 625px;
  stroke-dashoffset: calc(625px - (625px * var(--percent)) / 100);
  stroke: #3498db;
}

.bg {
  background-color: #f3f4f6;
  width: 400px;
  margin: 0 auto;

}

.icon-reward {
  width: 28px;
  object-fit: contain;
  position: relative;
}

.icon-notification {
  width: 30px;
  object-fit: contain;
}



.contend-options_img {
  display: grid;
  gap: 20px;
  padding: 10px 10px 0px 10px;
  grid-template-columns: 1fr 1fr;
  place-content: center;
  place-items: center;
  width: 180px;
  height: 50px;
}

.contend-options_text {
  display: grid;
  gap: 20px;
  margin-top: 5px;
  padding: 0px 10px 10px 10px;
  grid-template-columns: 1fr 1fr;
  place-content: center;
  place-items: center;
}


.fondo {
  background-color: #04355f;
  font-family: "gotham_htfmedium" !important;
}

.contend-bottom-status {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.button-status {
  padding: 5px 15px;
  border-radius: 8px;
  font-size: smaller;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 10px -3px;
}

.title-profile {
  //font-family: gotham_htfmedium;
  font-size: 1.4em;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #2F4B75;
}

.grid-collections {
  display: grid;
  /*  flex-wrap: wrap; */
  width: 100%;
  gap: 5px;
  height: calc(95vh - 300px);
  grid-template-columns: 1fr 1fr
    /* justify-content: space-between; */
}

.title-stats {
  color: black;
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0px;
}

.data-stats {
  font-size: 1.4em;
  font-weight: bold;
  margin-bottom: 0px;
}

.contend-options_img {}

.contend-options {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 10px -3px;
  margin: 0 auto;
  width: fit-content;
  background-color: white
}

.contend-options::after {
  content: "";
  position: absolute;
  border: 1px solid #75757566;
  right: 50%;
  height: 100%;

}

.container-profile {
  text-align: center;
  margin: 10px 0px 0px;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 100px);
  scrollbar-width: none;
}

.container-profile::-webkit-scrollbar {
  display: none;
}

.avatar-profile {
  width: 80px;
  height: 80px;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 12px;

}

.avatar-profile>img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.welcome-profile {
  position: absolute;
  background-color: #0000001f;
  z-index: 99999999 !important;
  bottom: 0%;
  width: 100%;
  height: 100%;
}

.welcome-profile__img {
  position: absolute;
  background-image: url(../../../assets/img/png/perfil.png) !important;
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 80%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  /* z-index: 999; */
  margin-left: auto;
  margin-right: auto;
}

.none {
  display: none;
}

.container-profile-photo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg::-webkit-scrollbar {
  -webkit-appearance: none;
}

.bg::-webkit-scrollbar:vertical {
  width: 10px;
}

.bg::-webkit-scrollbar-button:increment,
.bg::-webkit-scrollbar-button {
  display: none;
}

.bg::-webkit-scrollbar:horizontal {
  height: 10px;
}

.bg::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.bg::-webkit-scrollbar-track {
  border-radius: 10px;
}

.button-close {
  background-color: #33a9f2 !important;
  margin-top: 10px;
  margin-left: 10px;
}

@media (max-width: 640px) {
  .bg {
    width: 100%;
  }
}
</style>
