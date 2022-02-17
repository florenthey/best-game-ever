import "./App.css";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import { useEffect, useState } from "react";

const App = () => {
  const [initialize, setInitialize] = useState(false);
  const [game, setGame] = useState(null);

  let hamster;
  let cursors;

  function preload() {
    this.load.image("hamster", "/sprites/hamster.png");
  }

  function create() {
    hamster = this.physics.add.image(200, 400, "hamster");
    hamster.body.collideWorldBounds = true;
    cursors = this.input.keyboard.createCursorKeys();
  }

  function update() {
    hamster.setVelocityX(0);
    if (cursors.up.isDown) {
      hamster.setVelocity(0, -300);
    }
    if (cursors.left.isDown) {
      hamster.setVelocity(-100, 0);
    }
    if (cursors.right.isDown) {
      hamster.setVelocity(100, 0);
    }
  }

  const config = {
    width: "100%",
    height: 550,
    type: Phaser.AUTO,
    physics: { default: "arcade", arcade: { gravity: { y: 450 } } },
    scene: { preload, create, update },
  };

  useEffect(() => {
    if (initialize === false) {
      setInitialize(true);
      setGame(config);
    }
  });

  console.log(game);
  return (
    <div>
      <h1>Phaser test</h1>
      <IonPhaser game={game} initialize={initialize} />
    </div>
  );
};

export default App;
