<template>
	<div id="app">
		<div v-for="svg in list" v-html="svg.src">
		</div>
	</div>
</template>

<script>
	export default {
		name: `app`,
		data() {
			return {
				list: []
			}
		},
		mounted() {
			let svgList = [
				{path: `profiles/presentkim`, tags: [`profiles`]},
				{path: `profiles/blugin`, tags: [`profiles`]},
				{path: `plugin-icons/buoycompass`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/chunkloader`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/dustbin`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/firework`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/geometryapi`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/headshot`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/hotbox`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/humanoid`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/ignorecase`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/instantenchant`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/inventorymonitor`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/itempopup`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/lifespan`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/localchat`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/lullaby`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/makepluginplus`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/nbsplayer`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/opcrown`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/realisticcompass`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/rewardbox`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/showcoordinates`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/startkit`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/targerselector`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/topmoneynpc`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/virtualchest`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/writecheck`, tags: [`pmmp-plugin`, `nord`]}
			];
			for (let i in svgList) {
				let svg = svgList[i];

				let xhr = new XMLHttpRequest();
				xhr.open(`GET`, `https://raw.githubusercontent.com/PresentKim/SVG-files/master/${svg.path}.svg`, false);
				xhr.setRequestHeader(`Content-Type`, `text/plain`);
				xhr.send();
				if (xhr.status === 200) {
					svg.src = xhr.response;
					this.list.push(svg);
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "nord.scss";

	body {
		background-color: $nord1;
		color: $nord8;
	}
</style>
