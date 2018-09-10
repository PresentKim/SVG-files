<template>
	<div id="app">
		<div class="filters">
			<div v-for="filter in filters">
				<div :class="{active: selectedFilter === filter}" class="filter" @click="selectFilter(filter)">{{ filter }}</div>
			</div>
		</div>
		<div v-for="svg in list">
			<div :class="{hide: !svg.active}" v-html="svg.src"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: `app`,
		data() {
			return {
				filters: [`all`],
				selectedFilter: `all`,
				list: []
			}
		},
		methods: {
			selectFilter: function (filter) {
				if (this.selectedFilter !== filter) {
					this.selectedFilter = filter;
					for (let i in this.list) {
						this.list[i].active = filter === `all` || this.list[i].tags.includes(filter);
					}
				}
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
				svg.active = true;

				let app = this;
				let xhr = new XMLHttpRequest();
				xhr.open(`GET`, `https://raw.githubusercontent.com/PresentKim/SVG-files/master/${svg.path}.svg`, true);
				xhr.setRequestHeader(`Content-Type`, `text/plain`);
				xhr.send();
				xhr.onload = function () {
					if (xhr.status === 200) {
						svg.src = xhr.response;
						app.list.push(svg);
						for (let j in svg.tags) {
							if (!app.filters.includes(svg.tags[j])) {
								app.filters.push(svg.tags[j]);
							}
						}
					}
				};
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

	svg {
		width: 10vmin;
		height: 10vmin;
	}
</style>
