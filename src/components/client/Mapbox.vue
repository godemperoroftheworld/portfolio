<script setup lang="tsx">
import mapboxgl, { GeoJSONSource, type LngLatLike } from "mapbox-gl";
import { createApp, onMounted, ref, watch } from "vue";
import MapPin from "@/icons/MapPin.png";
import type { JSX } from "vue/jsx-runtime";
import type { GeoJSON, LineString } from "geojson";
import MapPane from "@/components/client/map/MapPane.vue";

interface Step {
  label: string;
  description: string;
  coordinate: LngLatLike;
}
interface Props {
  steps?: Step[];
}
const { steps = [] } = defineProps<Props>();

const map = ref<mapboxgl.Map>();
const stepIndex = ref(0);
const hidePane = ref(false);

function createMarkerNode(vnode: () => JSX.Element): HTMLElement {
  const el = document.createElement("div");
  createApp({ render: vnode }).mount(el);
  return el;
}

function initMap(map: mapboxgl.Map) {
  // Add markers
  steps.forEach((step, idx) => {
    const node = createMarkerNode(() => (
      <button class="block cursor-pointer" onClick={() => setStep(idx)}>
        <img class="h-12" src={MapPin.src} alt="" />
      </button>
    ));
    const marker = new mapboxgl.Marker(node).setLngLat(step.coordinate);

    marker.addTo(map);
  });
  // Add route source/layer
  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  });
  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "none",
    },
    paint: {
      "line-color": "red",
      "line-width": 2,
      "line-dasharray": [2, 1],
    },
  });
}

function increaseStep() {
  setStep(stepIndex.value + 1);
}
function decreaseStep() {
  setStep(stepIndex.value - 1);
}
function setStep(idx: number) {
  hidePane.value = true;
  setTimeout(() => {
    stepIndex.value = idx;
  }, 500);
}
watch(stepIndex, value => {
  updateMapLine(map.value!);
  const target = mapboxgl.LngLat.convert(steps[value].coordinate);
  const distance = map.value!.getCenter().distanceTo(target);
  const normalizedDistance = Math.log(Math.max(distance, 1));
  const duration = normalizedDistance * 500;
  const clampedDuration = Math.min(Math.max(duration, 500), 10000);
  map.value!.flyTo({
    center: steps[value].coordinate,
    zoom: 16,
    duration: clampedDuration,
    easing: t => t * (2 - t),
  });
});

function updateMapLine(map: mapboxgl.Map) {
  const source = map.getSource("route") as GeoJSONSource;
  const filteredSteps = steps.slice(
    Math.max(0, stepIndex.value - 1),
    stepIndex.value + 2
  );
  const newData: GeoJSON<LineString> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: filteredSteps.map(step => {
        const latLng = mapboxgl.LngLat.convert(step.coordinate);
        return [latLng.lng, latLng.lat];
      }),
    },
  };
  source.setData(newData);
}

onMounted(() => {
  // init map
  mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_TOKEN;
  map.value = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/t2pellet/cme09l9xv00cm01ry4qva7ml6",
    center: steps[0].coordinate,
    zoom: 16,
    renderWorldCopies: false,
  });
  map.value.on("load", () => {
    // resize
    map.value!.resize();
    // init map
    initMap(map.value!);
    updateMapLine(map.value!);
  });
  map.value.on("moveend", () => {
    hidePane.value = false;
  });
});
</script>

<template>
  <div v-bind="$attrs" id="map" class="relative">
    <MapPane
      :visible="!hidePane"
      :show-previous="stepIndex > 0"
      :show-next="stepIndex + 1 < steps.length"
      :label="steps[stepIndex].label"
      :description="steps[stepIndex].description"
      @next="increaseStep"
      @previous="decreaseStep"
    />
  </div>
</template>

<style>
#map {
  .mapboxgl-canvas-container {
    height: 100%;
    width: 100%;
  }
}
</style>
