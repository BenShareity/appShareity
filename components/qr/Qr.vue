<template>
    <div>
        <ClientOnly>
            <div v-if="cbk != ''">
                <vue-qr :text="textSrc" :size="160" :margin="2" :logoSrc="cbk" :colorDark="badgeColor ? badgeColor : ''"
                 :logoScale=0.25 :bindElement="true" />
            </div>
            <div v-else> LOADING.... </div>
        </ClientOnly>
    </div>
</template>
<script>

export default {
    created() {
        this.getDownload(this.badgeImage)
        this.badgeColor = this.shadeColor(this.badgeColor, -50)
    },
    data() {
        return {
            cbk: ''
        }
    },
    methods: {
       shadeColor(color, percent) {

var R = parseInt(color.substring(1, 3), 16);
var G = parseInt(color.substring(3, 5), 16);
var B = parseInt(color.substring(5, 7), 16);

R = parseInt(R * (100 + percent) / 100);
G = parseInt(G * (100 + percent) / 100);
B = parseInt(B * (100 + percent) / 100);

R = (R < 255) ? R : 255;
G = (G < 255) ? G : 255;
B = (B < 255) ? B : 255;

R = Math.round(R)
G = Math.round(G)
B = Math.round(B)

var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

return "#" + RR + GG + BB;
},
        getDownload(badge) {
            this.$axios({
                url: '/media/' + badge,
                method: 'GET',
            })
                .then((response) => {
                    this.cbk = 'data:'+response.data.type+';base64,' + response.data.data

                })
        },
        blobToBase64(blob) {
            return new Promise((resolve, _) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        }
    },
    props: {
        textSrc: String,
        badgeImage: String,
        badgeColor: String,
    }
};
</script>