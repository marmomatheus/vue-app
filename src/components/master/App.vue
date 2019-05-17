<template>
	<v-app>
		<app-aside v-model="drawer">
		</app-aside>
		
		<app-top-bar @toggleDrawer="toggleDrawer">
		</app-top-bar>

		<v-content style="padding: 48px 0px 0px 100px; !important">
			<router-view>
			</router-view>
		</v-content>
	</v-app>
</template>

<script>
	import AppAside from './Aside.vue'
	import AppTopBar from './Topbar.vue'
	
	export default {
    	data: () => ({
			drawer: true,
			snackbar: {
				text: '',
				show: false,
				color: 'success'
			},
		}),
		methods: {
			toggleDrawer () {
				this.drawer = !this.drawer;
			}
		},
		components: {
			'app-aside': AppAside,
			'app-top-bar': AppTopBar,
		}
	};
</script>