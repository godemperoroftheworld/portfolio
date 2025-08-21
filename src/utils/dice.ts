import DiceBox from "@3d-dice/dice-box";
import {
  breakpointsTailwind,
  createSharedComposable,
  isClient,
  refDebounced,
  useDark,
  useWindowSize,
} from "@vueuse/core";
import { onMounted, toRef, watch } from "vue";

const DICE_COLOUR_DARK = "#007A55";
const DICE_COLOUR_LIGHT = "#150c73";

const useDiceBox = createSharedComposable(() => {
  const diceBox = new DiceBox({
    container: "#dice-box",
    assetPath: "/assets/",
    theme: "default",
    scale: 4,
    offscreen: false,
  });

  const isDark = useDark({
    disableTransition: false,
  });
  const { width } = useWindowSize();
  const scale = refDebounced(
    toRef(() => {
      if (width.value > breakpointsTailwind.md) {
        return 4;
      }
      return 3;
    }),
    500
  );

  watch(
    scale,
    value => {
      diceBox.config.scale = value;
    },
    { immediate: true }
  );
  watch(
    isDark,
    value => {
      diceBox.config.themeColor = value ? DICE_COLOUR_DARK : DICE_COLOUR_LIGHT;
    },
    { immediate: true }
  );

  onMounted(() => {
    if (isClient) {
      diceBox.init();
    }
  });

  return diceBox;
});

export default useDiceBox;
