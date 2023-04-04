<script>
	import * as mapboxgl from "mapbox-gl";
	import "mapbox-gl/dist/mapbox-gl.css";
	import { getContext, setContext, onMount } from "svelte";
	import { writable } from "svelte/store";

	let clazz;
	let _map;
	export { clazz as class };
	export let zoomRange = [1, 12];
	export let zoom = zoomRange[0];
	export let pitch = 0;
	export let bearing = 0;
	export { _map as map };

	export let style;
	export let projection = "mercator";
	export let interactive = true;
	export let bounds;
	export let fitBoundsOptions;

	const theme = getContext("theme");

	let ready = writable(false);
	let mapReady = writable(false);
	let map = writable(null);
	let stylesReady = writable(false);
	let clientWidth;

	setContext("mapbox", {
		map,
		ready,
		mapReady,
		stylesReady,
	});

	$: _style = style || $theme.mapStyle;
	$: $map && mapReady && $map.setStyle(_style);

	let node;
	onMount(() => {
		$map = new mapboxgl.Map({
			accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
			container: node,
			style: _style,
			projection,
			pitch,
			zoom,
			bearing,
			bounds,
			fitBoundsOptions: fitBoundsOptions || { padding: clientWidth / 10 },
			interactive,
			attributionControl: false,
			minZoom: zoomRange[0] - 0.00000001,
			maxZoom: zoomRange[1],
		});

		_map = $map;

		$map.on("load", () => {
			$mapReady = true;
		});

		$map.on("styledata", () => {
			$stylesReady = true;
		});

		$map.on("webglcontextlost", () => {
			console.log("A webglcontextlost event occurred.");
		});
	});

	$: if ($ready && bounds) {
		$map.fitBounds(bounds, fitBoundsOptions || { padding: clientWidth / 10 });
	}

	$: {
		if ($mapReady && $stylesReady) {
			setTimeout(() => {
				$ready = true;
			}, 1000);
		}
	}
</script>

<style lang="postcss">
	.container {
		width: 100%;
		height: 100%;
		&.globe {
			aspect-ratio: 1;
		}
	}
</style>

<div class="map container {projection} {clazz}" bind:clientWidth bind:this={node}>
	{#if $ready}
		<slot />
	{/if}
</div>
