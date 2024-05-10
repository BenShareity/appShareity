<template>
    <video ref="videoFULL" :accesskey="item.id" @loadedmetadata="$event => loadVideo($event)"
        :style="'background-image: url(https://chgsdev.shareity.com/' + item.photoUrl + ');'" :src="urlBucket + item.url"
        @click="playAndPause()" loop playsinline="false" class="video-fullScreen" id="video-background"
        :poster="urlBucket + item.photoUrl">
    </video>
</template>
<script>
export default {
    props: {
        item: Object
    },
    data() {
        return {

        }
    },
    computed: {
        urlBucket() {
            return process.env.api_assets_url;
        },
    },
    methods: {
        playAndPause(value, index) {
            this.statePlays = !this.statePlays
            if (this.statePlays) {
                this.$refs.videoFULL.pause();
                this.videoPause = true;
            } else {
                this.$refs.videoFULL.play();
                this.videoPause = false;
            }
        },
    },
}
</script>
<style  scoped></style>