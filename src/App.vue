<template>
	<div id="app">
		<div id="filters">
			<div v-for="newFilter in filters" :class="{active: filter === newFilter}" class="filter" @click="filter = newFilter">{{ newFilter }}</div>
		</div>
		<div id="svgs">
			<div v-for="svg in list" :class="{hide: filter !== `all` && !svg.tags.includes(filter)}" v-html="svg.src"></div>
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
				filter: `all`,
				list: []
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
				{path: `plugin-icons/targetselector`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/topmoneynpc`, tags: [`pmmp-plugin`]},
				{path: `plugin-icons/virtualchest`, tags: [`pmmp-plugin`, `nord`]},
				{path: `plugin-icons/writecheck`, tags: [`pmmp-plugin`, `nord`]}
			].forEach(svg => {
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
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;

		#app {
			width: 100%;
			height: 100%;

			#filters {
				margin: 10pt auto 0 auto;
				text-align: center;

				.filter {
					display: inline-block;
					text-transform: uppercase;
					font-size: 24pt;
					margin: 10pt;
					cursor: pointer;
					color: $nord3;
					border-bottom: 2px solid $nord3;

					&.active {
						color: $nord4;
						border-bottom: 2px solid $nord8;
					}
				}
			}

			#svgs {
				width: 70%;
				margin: 0 auto;
				div {
					width: 70pt;
					height: 70pt;
					display: inline-block;
					margin: 5pt;
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
				right: 16pt;
				bottom: 16pt;
				a {
					cursor: pointer;
					color: $nord8;
					font-size: 16pt;
					text-decoration: none;
					border-top: 3pt solid #00000000;
					border-bottom: 3pt solid #00000000;

					&:hover {
						border-top: 3pt solid $nord8;
						border-bottom: 3pt solid $nord8;
					}
				}
			}
		}
	}
</style>
