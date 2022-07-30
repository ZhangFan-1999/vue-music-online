<template>
	<div id="app">
		<Header></Header>
		<Tab></Tab>
		<transition>
			<keep-alive><router-view></router-view></keep-alive>
		</transition>
		<player></player>
	</div>
</template>

<script>
import Header from './base/Header/Header';
import Player from './base/Player/Player';
import Tab from './base/Tab/Tab';
export default {
	name: 'App',
	components: {
		Header,
		Tab,
		Player
	}
};
</script>

<style scoped>
#app {
	width: 100%;
	height: 100%;
	position: relative;
}
.v-enter-active {
	transition: all 0.4s ease;
}
.v-enter,
.v-leave-to {
	transform: translateX(20%);
	opacity: 0;
}
</style>
