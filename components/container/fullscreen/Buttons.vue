<template>
	<div
		class="container-buttons"
		style="text-align: center">
		<!-- Challenge photo -->
		<div>
			<v-btn 
			icon>
				<v-img
					:max-height="55"
					:max-width="55"
					:src="challengeImg"
				></v-img>
			</v-btn>
		</div>
		<!-- Profile photo -->
		<div
		style="margin-right: -6px;">
			<v-avatar
			:size="50"
			style="background: white; margin:0px">
			<v-img
					:src="user.ImgUsr ? user.ImgUsr : 
					require('~/assets/img/png/profile/user_profile_blue.png')"
			></v-img>
			</v-avatar> 
			<p class="text-buttons">
				{{user.FnameUsr}}
			</p>
		</div>
		<!-- Buttons -->
		<div v-for="button in buttons" :key="button.name">
		<v-btn 
			icon
			@click="handle_function_call(button.name)"
			>
				<v-img
				:width="size"
				:src="require('~/assets/img/'+button.path)"
				></v-img>
			</v-btn>
			<p class="text-buttons">
				{{button.data}}
			</p>
		</div> 
	</div>
</template>

<script>
	export default {
		props:{
			challenge:{ 
				type: Object,
				default(){
					return {};
				}
			},
		},
		data(){
			return{
				size: 40,
				user: {},
				buttons:[
					{
						name: 'share',
						path: 'png/challenge/share.gif'
					},
					{
						name: 'like',
						data: 0,
						path: 'svg/challenge/like.svg'
					},
					{
						name: 'comment',
						data: 0,
						path: 'svg/challenge/comment.svg'
					},
					{
						name: 'redo',
						path: 'svg/challenge/redo.svg'
					},
					{
						name: 'download',
						path: 'svg/challenge/download.svg'
					},
					
				]
			};
		},
		created(){
			this.user = this.challenge.idUsr0;
			let indexLikes = this.buttons.findIndex((element) => element.name == 'like');
			this.buttons[indexLikes].data = this.challenge.CountLike;
			let indexComm = this.buttons.findIndex((element) => element.name == 'comment');
			this.buttons[indexComm].data = this.challenge.commentsCount;
		},
		computed:{
			challengeImg: function () {
        return this.getAssetLink(this.challenge.idBad0.ImgCamp);
      }
		},
		methods:{
			handle_function_call(function_name) {
				this[function_name]()
			},
			like(){

			},
			comment(){

			},
			share(){

			},
			redo(){

			},
			download(){

			}
		}

	}
</script>

<style lang="scss" scoped>
  .container-buttons{
		text-align: center;
		margin-top: 50%;
    margin-left: 84%;
    padding-right: 15px;
    position: absolute;
    width: 60px;

		div {
			margin-bottom: 20px;
		}
  }
	.text-buttons{
		font-size: 0.8em; 
		color:white;
		text-align: center;
	}
</style>