<template>
    <v-container class="container__communities">
        <div class="header_options">
            <div class="options_subHeader">
                <v-skeleton-loader type="avatar"></v-skeleton-loader>
                <div class="subHeader_text">
                    <v-skeleton-loader class="edit_chip" type="chip"></v-skeleton-loader>
                </div>
                <div style="display: grid; gap: 2px;">
                    <v-skeleton-loader class="edit_chip-2" type="chip"></v-skeleton-loader>
                    <v-skeleton-loader class="edit_chip-2" type="chip"></v-skeleton-loader>
                    <v-skeleton-loader class="edit_chip-2" type="chip"></v-skeleton-loader>
                </div>
            </div>
            <div class="options_img">
                <div>
                    <v-skeleton-loader class="edit_avatar" tile type="avatar"></v-skeleton-loader>
                </div>
            </div>
        </div>
        <div class="container-skeletorrr">
            <div v-for="(item, index) in 4" :key="index">
                <v-skeleton-loader height="250" type="card-avatar"></v-skeleton-loader>
            </div>
        </div>
    </v-container>
</template>
<script>
export default {

}
</script>
<style lang="css" >
.header_options {
    height: 150px;
    padding: 10px;
    background: #f3f4f5;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
}

.container-img_img {
    width: 100%;
    box-shadow: 1px 1px 5px 2px #b1b1b1;
    height: 350px;
    object-fit: cover;
    border-radius: 24px 4px;
}

.edit_avatar div.v-skeleton-loader__avatar {
    height: 66px !important;
    width: 75px !important;
}

.edit_chip div.v-skeleton-loader__chip {
    border-radius: 16px;
    height: 11px;
    width: 144px;
}

.edit_chip-2 div.v-skeleton-loader__chip {
    border-radius: 16px;
    height: 4px;
    width: 27px;
}

.container-skeletorrr {
    width: 400px;
    height: 100vh;
    background: #f3f4f5;
    display: grid;
    padding: 10px;
    gap: 14px;
    margin-top: 15px;

}

.options_subHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.subHeader_text {
    text-align: center;
    font-size: 1.3rem;
    font-weight: 700;
    color: #000;
    font-family: sans-serif;
}

.options_img {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>