<template>
	<v-app id="app">
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: "App"
}
</script>

<style scoped>
#app {
	padding: 1%;
}
</style>
