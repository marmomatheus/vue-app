<template>
	<v-toolbar dense app fixed clipped-left class="grey darken-4">
		<v-toolbar-side-icon @click.stop="toggleDrawer" class="white--text"></v-toolbar-side-icon>
		<v-toolbar-title class="white--text">
			Ruby App
		</v-toolbar-title>
		<v-spacer></v-spacer>
	</v-toolbar>
</template>

<script>	
	export default {
		data () {
			return {}
		},
		
		methods: {
			toggleDrawer () {
				this.$emit('toggleDrawer');
			}
		}
	};
</script>
