<template>
	<div id="app">
		<div id="filters">
			<div v-for="filter in filters" :class="{active: selectedFilter === filter}" class="filter" @click="selectFilter(filter)">{{ filter }}</div>
		</div>
		<div id="svgs">
			<div v-for="svg in list" :class="{hide: !svg.active}" v-html="svg.src"></div>
		</div>
		<div id="github">
			<a href="https://github.com/PresentKim/SVG-files/">View SVG</a>
			|
			<a href="https://github.com/PresentKim/SVG-files/tree/gh-pages">View Source</a>
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
					this.list.forEach(svg => {
						svg.active = filter === `all` || svg.tags.includes(filter)
					});
				}
			}
		},
		mounted() {
			[
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
			].forEach(svg => {
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
						svg.tags.forEach(tag => {
							if (!app.filters.includes(tag)) {
								app.filters.push(tag);
							}
						});
					}
				};
			});
		}
	}
</script>

<style lang="scss">
	@import "nord.scss";

	body {
		background-color: $nord1;
		color: $nord8;
		margin: 0;

		#app {
			display: flex;
			flex-direction: column;
			width: 100%;

			#filters {
				width: 72vmin;
				margin: 1vmin auto 0 auto;
				text-align: center;

				.filter {
					display: inline-block;
					text-transform: uppercase;
					font-size: 2vmin;
					margin: 1vmin;
					cursor: pointer;

					&.active {
						color: $nord4;
						border-bottom: 1px solid #fff;
					}
				}
			}

			#svgs {
				width: 72vmin;
				margin: 0 auto;
				div {
					width: 10vmin;
					height: 10vmin;
					display: inline-block;
					margin: 1vmin;
					transition: .5s ease-in-out;

					&.hide {
						visibility: hidden;
						opacity: 0;
						width: 0;
						height: 0;
						margin: 0;
					}

					svg {
						width: inherit;
						height: inherit;
					}
				}
			}

			#github {
				position: absolute;
				right: 2vmin;
				bottom: 2vmin;
				a {
					cursor: pointer;
					color: $nord8;
					font-size: 2vmin;
					text-decoration: none;
					border-top: 0.3vmin solid #00000000;
					border-bottom: 0.3vmin solid #00000000;

					&:hover {
						border-top: 0.3vmin solid $nord8;
						border-bottom: 0.3vmin solid $nord8;
					}
				}
			}
		}
	}
</style>
