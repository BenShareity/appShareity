<template>
    <div v-if="array.length > 0">
        <virtual-list 
        :page-mode="true" 
        make 
        scrollable 
        :data-key="'id'" 
        :data-sources="array"
        :data-component="itemComponent" 
        :keeps="4" 
        :estimate-size="390" 
        :item-class="'list-item-page scroll-touch'" 
        v-on:totop="totop"
        v-on:tobottom="tobottom" 
        :extra-props="{
            user:{
                name:'pepito',
                id:145654511,
            },
            array:[
                {id:1 ,name:'kenny'},
                {id:2 ,name:'salazar'},

            ]
        }"
        />
    </div>
</template>
  
<script>
4
import Item from '../../components/Item.vue'
import VirtualList from 'vue-virtual-scroll-list'
import { mapActions, mapGetters, mapState } from "vuex";
export default {
    name: 'root',
    data() {
        return {
            itemComponent: Item,
            array:[],

        }
    },
    components: { 'virtual-list': VirtualList },
    methods: {
        ...mapActions("user", ["nicknameAction"]),
        ...mapActions("infiniteScroll", ["getNetxPage"]),
        ...mapActions("content", ["changeContentView"]),
    },
    computed: {
        ...mapGetters("challenges", ["getChallenges"]),
        ...mapGetters("content", ["getContentView"]),
        ...mapState("infiniteScroll", ["userChallenges", "userChallengesPages"]),
        totop(){
            console.log('totop')
        },
        tobottom(){
            console.log('tobottom' )
        }
    },
    mounted() {
        this.nicknameAction().then((user) => {
            this.getNetxPage({
                page: 1,
                items: 10,
                from: "Trending",
                idProfile: user.id,
            }).then((res) => {
                this.array = res
                console.log('res', this.array )

            });

        });

    },
}
</script>

<style>
.list-page {
    width: 100%;
    border: 2px solid;
    border-radius: 3px;
    overflow-y: auto;
    border-color: dimgray;


}

.list-item-page {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid;
    border-color: lightgray;
}

.bottom {
    padding: 2em 0;
}
</style>