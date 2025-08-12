<script setup lang="tsx">
import mapboxgl, { GeoJSONSource } from "mapbox-gl";
import { createApp, onBeforeUnmount, onMounted, ref } from "vue";
import MapPin from "@/icons/MapPin.png";
import type { JSX } from "vue/jsx-runtime";
import type { GeoJSON, LineString } from "geojson";
import MapPane from "@/contents/history/details/HistoryMapPane.vue";
import { useStore } from "@nanostores/vue";
import { historyStepStore } from "@/stores/historyStep.ts";
import { useDebounce } from "@vueuse/core";
import type { Step } from "@/contents/history/types.ts";
import emitter from "@/contents/history/events.ts";

interface Props {
  steps?: Step[];
}
const { steps = [] } = defineProps<Props>();

const map = ref<mapboxgl.Map>();
const stepIndexRaw = useStore(historyStepStore);
const stepIndex = useDebounce(stepIndexRaw, 1000);
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
      <button class="mb-4 block cursor-pointer" onClick={() => setStep(idx)}>
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

// Duration helper
function calculateDuration(step: number) {
  const target = mapboxgl.LngLat.convert(steps[step].coordinate);
  const distance = map.value!.getCenter().distanceTo(target);
  const normalizedDistance = Math.log(Math.max(distance, 1));

  const duration = normalizedDistance * 500;
  return Math.min(Math.max(duration, 500), 6000);
}

// Map flight helper
function directFlight(step: number) {
  // Hide the pane for now
  if (step !== stepIndex.value) {
    hidePane.value = true;
  }
  // Calculate duration
  const duration = calculateDuration(step);
  // Fly
  map.value!.flyTo({
    center: steps[step].coordinate,
    zoom: 14,
    duration: duration,
  });
  setTimeout(() => {
    // Update routes
    updateMapLine(map.value!);
  }, duration * 0.5);
  setTimeout(() => {
    // Restore pane
    hidePane.value = false;
  }, duration * 0.75);
}
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
  // Events
  emitter.on("flyTo", directFlight);
  // init map
  mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_TOKEN;
  map.value = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/t2pellet/cme09l9xv00cm01ry4qva7ml6",
    center: steps[0].coordinate,
    zoom: 16,
    renderWorldCopies: false,
    attributionControl: false,
  });
  map.value.addControl(
    new mapboxgl.AttributionControl({
      compact: true,
    })
  );
  map.value.on("load", () => {
    // resize
    map.value!.resize();
    // init map
    initMap(map.value!);
    updateMapLine(map.value!);
  });
});

onBeforeUnmount(() => {
  emitter.off("flyTo", directFlight);
});
</script>

<template>
  <div v-bind="$attrs" id="map" class="relative">
    <transition
      enter-active-class="animate__animated animate__flipInX"
      leave-active-class="animate__animated animate__flipOutX"
    >
      <MapPane
        data-aos="flip-up"
        data-aos-delay="300"
        data-aos-duration="500"
        class="z-2 absolute left-2 top-2 h-72 w-64 max-lg:hidden"
        :visible="!hidePane"
        :step="steps[stepIndex]"
        :show-previous="stepIndex > 0"
        :show-next="stepIndex + 1 < steps.length"
      />
    </transition>
  </div>
</template>

<style>
#map {
  .mapboxgl-canvas-container {
    height: 100%;
    width: 100%;
  }

  .mapbox-improve-map {
    display: none;
  }
}
</style>
