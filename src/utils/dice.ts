import DiceBox from "@3d-dice/dice-box";

const diceBox = new DiceBox({
  container: "#dice-box",
  assetPath: "/assets/",
  theme: "default",
  offscreen: true,
  scale: 3,
});

if (!import.meta.env.SSR) {
  diceBox.init().then(() => console.log("initialsied dice"));
}

export default diceBox;
