import "./App.css";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import { useEffect, useState } from "react";

const App = () => {
  const [initialize, setInitialize] = useState(false);
  const [game, setGame] = useState(null);

  let cursors;
  let dude;
  let platform;

  function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/plateform.png");
    this.load.image("star", "assets/star.png");
    this.load.spritesheet("dude", "/assets/sprites/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  function create() {
    this.add.image(400, 300, "sky");
    this.add.image(400, 100, "star");

    platform = this.physics.add.staticGroup();
    platform.create(400, 568, "ground").setScale(2).refreshBody();
    platform.create(600, 500, "ground");
    platform.create(700, 400, "ground");
    platform.create(500, 300, "ground");
    platform.create(400, 200, "ground");

    dude = this.physics.add.sprite(100, 450, "dude");

    dude.setBounce(0.2);
    dude.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(dude, platform);

    cursors = this.input.keyboard.createCursorKeys();
  }

  function update() {
    const onFloor = dude.body.onFloor();

    if (cursors.left.isDown) {
      dude.setVelocityX(-160);

      dude.anims.play("left", true);
    } else if (cursors.right.isDown) {
      dude.setVelocityX(160);

      dude.anims.play("right", true);
    } else {
      dude.setVelocityX(0);

      dude.anims.play("turn");
    }
    if (onFloor && cursors.up.isDown) {
      dude.setVelocity(0, -330);
    }
  }

  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: { gravity: { y: 450 }, debug: false },
    },
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
