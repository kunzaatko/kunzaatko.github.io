import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/dice-box.es.min.js";

// drdreo/dice-box-threejs (Use this for deterministic results)

let Box = new DiceBox("#dice-box", {
  assetPath: "assets/",
  origin: "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/",
  theme: "default",
  themeColor: "#000000",
  offscreen: true,
  scale: 5
});

Box.init().then(async (world) => {
  Box.roll(["2d20", "2d12", "10d10", "2d8", "10d6"]);
});
