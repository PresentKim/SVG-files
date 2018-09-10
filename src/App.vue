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
				{name: `PresentKim`, path: `profiles/presentkim`},
				{name: `Blugin`, path: `profiles/blugin`},
				{name: `BuoyCompass`, path: `plugin-icons/buoycompass`},
				{name: `ChunkLoader`, path: `plugin-icons/chunkloader`},
				{name: `Dustbin`, path: `plugin-icons/dustbin`},
				{name: `Firework`, path: `plugin-icons/firework`},
				{name: `GeometryAPI`, path: `plugin-icons/geometryapi`},
				{name: `HeadShot`, path: `plugin-icons/headshot`},
				{name: `HotBox`, path: `plugin-icons/hotbox`},
				{name: `Humanoid`, path: `plugin-icons/humanoid`},
				{name: `IgnoreCase`, path: `plugin-icons/ignorecase`},
				{name: `InstantEnchant`, path: `plugin-icons/instantenchant`},
				{name: `InventoryMonitor`, path: `plugin-icons/inventorymonitor`},
				{name: `ItemPopup`, path: `plugin-icons/itempopup`},
				{name: `Lifespan`, path: `plugin-icons/lifespan`},
				{name: `LocalChat`, path: `plugin-icons/localchat`},
				{name: `Lullaby`, path: `plugin-icons/lullaby`},
				{name: `MakePlugin+`, path: `plugin-icons/makepluginplus`},
				{name: `NbsPlayer`, path: `plugin-icons/nbsplayer`},
				{name: `OpCrown`, path: `plugin-icons/opcrown`},
				{name: `RealisticCompass`, path: `plugin-icons/realisticcompass`},
				{name: `RewardBox`, path: `plugin-icons/rewardbox`},
				{name: `ShowCoordinates`, path: `plugin-icons/showcoordinates`},
				{name: `StartKit`, path: `plugin-icons/startkit`},
				{name: `TargerSelector`, path: `plugin-icons/targerselector`},
				{name: `TopmoneyNpc`, path: `plugin-icons/topmoneynpc`},
				{name: `VirtualChest`, path: `plugin-icons/virtualchest`},
				{name: `WriteCheck`, path: `plugin-icons/writecheck`}
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
