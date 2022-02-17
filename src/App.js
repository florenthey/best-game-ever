import "./App.css";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import { useEffect, useState } from "react";

const App = () => {
  const [initialize, setInitialize] = useState(false);
  const [game, setGame] = useState(null);

  let cursors;
  let catFighter;

  function preload() {
    this.load.spritesheet("catFighter", "/sprites/catFighter.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  function create() {
    catFighter = this.physics.add.sprite(600, 370, "catFighter");
    catFighter.body.collideWorldBounds = true;
    catFighter.setScale(4);

    cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("catFighter", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("catFighter", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      }),
      frameRate: 12,
      repeat: -1,
    });

    catFighter.play("idle");
  }

  function update() {
    catFighter.setVelocityX(0);
    const onFloor = catFighter.body.onFloor();

    if (onFloor && cursors.up.isDown) {
      catFighter.setVelocity(0, -300);
    }
    if (onFloor && cursors.left.isDown) {
      catFighter.setVelocity(-300, 0);
    }
    if (onFloor && cursors.right.isDown) {
      catFighter.setVelocity(300, 0);
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

  return (
    <div>
      <h1>Phaser test</h1>
      <IonPhaser game={game} initialize={initialize} />
    </div>
  );
};

export default App;
