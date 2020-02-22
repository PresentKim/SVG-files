<template>
	<div id="app">
		<div id="filters">
			<div v-for="newFilter in filters" :key="newFilter" :class="{active: filter === newFilter}" class="filter" @click="filter = newFilter">{{ newFilter }}</div>
		</div>
		<div id="svgs">
			<div v-for="svg in svgs" :key="svg.src" :class="{hide: filter !== `all` && !svg.tags.includes(filter)}" v-html="svg.src" @contextmenu="openMenu"></div>
		</div>
		<div id="github">
			<a href="https://github.com/PresentKim/SVG-files/">View SVG</a>
			|
			<a href="https://github.com/PresentKim/SVG-files/tree/gh-pages">View Source</a>
		</div>

		<div id="contextmenu" tabindex="-1" v-if="viewMenu" ref="right" @blur="closeMenu" :style="{top: top, left: left}">
			<li>Download to SVG</li>
			<li>Download to PNG</li>
		</div>
	</div>
</template>

<script>
	import svgsJson from './svgs.json';

	export default {
		name: `app`,
		data() {
			return {
				filters: [`all`],
				svgs: [],
				viewMenu: false,
				top: `0px`,
				left: `0px`
			}
		},
		computed: {
			filter: {
				get: function () {
					let filter = this.$route.query.filter;
					return filter === undefined ? `all` : filter;
				},
				set: function (newFilter) {
					let query = newFilter === `all` ? {} : {filter: newFilter};
					this.$router.push({query});
				}
			}
		},
		mounted() {
			svgsJson.forEach(svg => {
				let app = this;
				let xhr = new XMLHttpRequest();
				xhr.open(`GET`, `https://raw.githubusercontent.com/PresentKim/SVG-files/master/${svg.path}.svg`, true);
				xhr.setRequestHeader(`Content-Type`, `text/plain`);
				xhr.send();
				xhr.onload = function () {
					if (xhr.status === 200) {
						svg.src = xhr.response;
						app.svgs.push(svg);
						svg.tags.forEach(tag => {
							if (!app.filters.includes(tag)) {
								app.filters.push(tag);
							}
						});
					}
				};
			});
		},
		methods: {
			openMenu: function(event) {
				this.viewMenu = true;
				this.svgElement = event.path.find(element => element.tagName == `svg`);
				this.$nextTick(function() {
					this.$refs.right.focus();
					let largestHeight = window.innerHeight - this.$refs.right.offsetHeight;
					let largestWidth = window.innerWidth - this.$refs.right.offsetWidth;
					this.top = `${event.y > largestHeight ? largestHeight : event.y}px`;
					this.left = `${event.x > largestWidth ? largestWidth : event.x}px`;
				}.bind(this));
				event.preventDefault();
			},
			closeMenu: function() {
				this.viewMenu = false;
				this.svgElement = null;
			}
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

			#contextmenu{
				background: $nord1;
				border: 1px solid $nord4;
				display: block;
				list-style: none;
				margin: 0;
				padding: 0;
				position: absolute;
				width: 200px;
				z-index: 999999;

				li {
					margin: 0;
					padding: 5px 30px;
					&:hover {
						background: $nord3;
					}
				}
			}
		}
	}
</style>
