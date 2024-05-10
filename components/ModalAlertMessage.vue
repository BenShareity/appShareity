<template>
    <v-row justify="center">
        <v-dialog v-model="modalActive" :retain-focus="false" persistent max-width="290">
            <v-card>
                <!--  <div class="messageALERT_ID">
                    {{ message }}
                </div> -->
                <div class="header-text">
                    <!--  <template v-if="typeSocial">
                        <p v-if="typeSocial === 'instagram'" class="header-text-social bg-Inatgram"> Instagram</p>
                        <p v-else class="header-text-social bg-tik"> Tik Tok</p>
                    </template> -->
                    <template v-if="url">
                        <div class="header-body-url">
                            <v-icon size="30" style="color: rgb(236, 61, 64)">
                                mdi-file-image-remove-outline
                            </v-icon>
                            <div> {{ message }}</div>
                        </div>
                        <p class="header-url">
                            <span>Allowed files:</span>
                            <strong> {{ url }} </strong>
                        </p>
                    </template>
                    <template v-else>
                        <p class="header-body"> {{ message }}</p>
                    </template>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="clickModal">
                        Done
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {

    data() {
        return {
            modalActive: false,
            message: null,
            typeSocial: '',
            url: ''
        }
    },
    methods: {
        clickModal() {
            this.modalActive = false
            /*  this.$emit("clickModal", false); */
        }
    },
    created() {
        this.$nuxt.$on("modalDownload", (option) => {
            this.modalActive = option[0]
            this.message = option[1]
            this.typeSocial = option[2]
            this.url = option[3]
        })
    },
}
</script>

<style>
.messageALERT_ID {
    padding: 20px;
    font-weight: 500;
    text-align: center;
}

.header-text {}

.header-text-social {
    text-align: center;
    font-weight: 600;
    border-bottom: 1px solid rgba(128, 128, 128, 0.25882);

    height: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: sans-serif;
    letter-spacing: 1px;
}

.header-body-url {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: azure;
    padding: 20px;
}

.bg-Inatgram {
    box-shadow: 1px 1px 16px 0px #ca2269;
    background: #33A9F2;
    background: #f09433;
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f09433', endColorstr='#bc1888', GradientType=1);
}

.bg-tik {
    background-color: black;
    box-shadow: 0px 0px 16px 0px black;
}


.header-body {
    text-align: center;
    padding: 12px;
    line-height: 26px;
}

.header-url {
    padding: 0px 10px;
    text-align: center;
    font-family: 'din_mediumregular';
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-top: 15px;
    margin: 0;
}
</style>