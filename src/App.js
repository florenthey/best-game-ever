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
  let stars;
  let score = 0;
  let scoreText;
  let level = 1;
  let levelText;
  // let gameOver;

  function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.spritesheet("dude", "/assets/sprites/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  function create() {
    this.add.image(400, 300, "sky");

    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    levelText = this.add.text(625, 16, "level: 1", {
      fontSize: "32px",
      fill: "#000",
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

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

    this.physics.add.collider(stars, platform);
    this.physics.add.collider(dude, platform);

    this.physics.add.overlap(dude, stars, collectStar, null, this);

    function collectStar(dude, star) {
      star.disableBody(true, true);

      score += 10;
      scoreText.setText("Score: " + score);

      if (stars.countActive(true) === 0) {
        level += 1;
        levelText.setText("level: " + level);
      }
    }

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
