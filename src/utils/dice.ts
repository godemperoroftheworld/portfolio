import DiceBox from "@3d-dice/dice-box";
import { isClient } from "@vueuse/core";

const diceBox = new DiceBox({
  container: "#dice-box",
  assetPath: "/assets/",
  theme: "default",
  scale: 4,
  offscreen: false,
});

if (isClient) {
  diceBox.init();
}

export default diceBox;
