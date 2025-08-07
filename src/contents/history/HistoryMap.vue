<script setup lang="tsx">
import mapboxgl, { GeoJSONSource, type LngLatLike } from "mapbox-gl";
import { createApp, onMounted, ref, watch } from "vue";
import MapPin from "@/icons/MapPin.png";
import type { JSX } from "vue/jsx-runtime";
import type { GeoJSON, LineString } from "geojson";
import MapPane from "@/contents/history/HistoryMapPane.vue";
import { useStore } from "@nanostores/vue";
import { historyStepStore } from "@/stores/historyStep.ts";
import { useDebounce } from "@vueuse/core";

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
const stepIndexRaw = useStore(historyStepStore);
const stepIndex = ref(stepIndexRaw.value);
const stepIndexDebounced = useDebounce(stepIndex, 1000);
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

// Step utils
function increaseStep() {
  setStep(stepIndexRaw.value + 1);
}
function decreaseStep() {
  setStep(stepIndexRaw.value - 1);
}
function setStep(idx: number) {
  historyStepStore.set(idx);
}

// Duration helper
function calculateDuration(step: number) {
  const isLastStep = step === stepIndexRaw.value;

  const target = mapboxgl.LngLat.convert(steps[step].coordinate);
  const distance = map.value!.getCenter().distanceTo(target);
  const normalizedDistance = Math.log(Math.max(distance, 1));

  const duration = normalizedDistance * (isLastStep ? 500 : 300);
  return Math.min(Math.max(duration, 500), isLastStep ? 8000 : 4000);
}

// Map flight helper
function flyTo(step: number, duration: number) {
  // Hide the pane for now
  hidePane.value = true;
  // Different logic when flying in intermediary step
  const isLastStep = step === stepIndexRaw.value;
  // Fly
  map.value!.flyTo({
    center: steps[step].coordinate,
    zoom: 12,
    duration,
    easing: isLastStep ? t => t * (2 - t) : t => t,
  });
  setTimeout(() => {
    // Update routes
    updateMapLine(map.value!);
  }, duration * 0.5);
  setTimeout(
    () => {
      // Restore pane
      hidePane.value = false;
    },
    duration * (isLastStep ? 0.75 : 0.5)
  );
}
function flyToStepIndex() {
  if (stepIndex.value < stepIndexRaw.value) {
    const duration = calculateDuration(stepIndex.value + 1);
    flyTo(stepIndex.value + 1, duration);
    stepIndex.value += 1;
    setTimeout(() => {
      flyToStepIndex();
    }, duration + 100);
  } else if (stepIndex.value > stepIndexRaw.value) {
    const duration = calculateDuration(stepIndex.value - 1);
    flyTo(stepIndex.value - 1, duration);
    stepIndex.value -= 1;
    setTimeout(() => {
      flyToStepIndex();
    }, duration + 100);
  }
}

watch(stepIndexRaw, flyToStepIndex);

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
</script>

<template>
  <div v-bind="$attrs" id="map" class="relative">
    <MapPane
      :visible="!hidePane"
      :show-previous="stepIndexDebounced > 0"
      :show-next="stepIndexDebounced + 1 < steps.length"
      :label="steps[stepIndexDebounced].label"
      :description="steps[stepIndexDebounced].description"
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

  .mapbox-improve-map {
    display: none;
  }
}
</style>
