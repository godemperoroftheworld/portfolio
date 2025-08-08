import type { LngLatLike } from "mapbox-gl";

export interface Step {
  label: string;
  description: string;
  coordinate: LngLatLike;
  icon: string;
  date: [Date, Date];
}
export type MapEvents = {
  flyTo: number;
};
