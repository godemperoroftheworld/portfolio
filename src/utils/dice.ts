import DiceBox from "@3d-dice/dice-box";

const diceBox = new DiceBox({
  container: "#dice-box",
  assetPath: "/assets/",
  theme: "default",
  scale: 3,
  offscreen: false,
});

if (!import.meta.env.SSR) {
  diceBox.init();
}

export default diceBox;
