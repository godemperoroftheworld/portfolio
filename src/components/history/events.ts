import mitt, { type Emitter } from "mitt";
import type { MapEvents } from "@/components/history/types.ts";

const emitter: Emitter<MapEvents> = mitt<MapEvents>();

export default emitter;
