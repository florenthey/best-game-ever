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
  let platform2;
  let lava;
  let stars;
  let score = 0;
  let scoreText;
  let levelText;
  let finalMessage;
  let plouf;
  let cling;
  let music;
  let musicConfig = { volume: 0.6 };
  const scenes = {
    first: "FirstScene",
    second: "SecondScene",
  };

  const sceneOne = {
    create: function () {
      music = this.sound.add("music");
      music.play(musicConfig);
      cling = this.sound.add("cling");
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
        cling.play();
        star.disableBody(true, true);

        score += 10;
        scoreText.setText("Score: " + score);

        if (stars.countActive(true) === 0) {
          score = 0;
          this.scene.start(scenes.second);
        }
      }

      cursors = this.input.keyboard.createCursorKeys();
    },
  };

  const sceneTwo = {
    create: function () {
      plouf = this.sound.add("plouf");
      cling = this.sound.add("cling");
      this.add.image(400, 300, "sky");
      // lava.create(400, 568, "lava").setScale(2).refreshBody();

      // stars = this.physics.add.group({
      //   key: "star",
      //   repeat: 11,
      //   setXY: { x: 12, y: 0, stepX: 70 },
      // });

      scoreText = this.add.text(16, 16, "score: 0", {
        fontSize: "32px",
        fill: "#000",
      });

      levelText = this.add.text(625, 16, "level: 2", {
        fontSize: "32px",
        fill: "#000",
      });

      // stars.children.iterate(function (child) {
      //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      // });

      stars = this.physics.add.staticGroup();
      stars.create(550, 400, "star");
      stars.create(650, 300, "star");
      stars.create(100, 150, "star");
      stars.create(300, 250, "star");
      stars.create(500, 250, "star");

      platform2 = this.physics.add.staticGroup();
      // platform.create(400, 568, "ground").setScale(2).refreshBody();
      platform2.create(550, 450, "ground2");
      platform2.create(650, 350, "ground2");
      platform2.create(100, 200, "ground2");
      platform2.create(300, 300, "ground2");
      platform2.create(500, 300, "ground2");

      dude = this.physics.add.sprite(100, 100, "dude");

      dude.setBounce(0.2);
      dude.setCollideWorldBounds(true);

      lava = this.physics.add.staticGroup();
      lava.create(300, 595, "lava");
      lava.create(500, 595, "lava");
      lava.create(300, 580, "lava");
      lava.create(500, 580, "lava");
      lava.create(300, 565, "lava");
      lava.create(500, 565, "lava");
      lava.create(300, 550, "lava");
      lava.create(500, 550, "lava");

      this.physics.add.overlap(dude, lava, thisIsTheEnd, null, this);

      function thisIsTheEnd() {
        plouf.play();
        score = 0;
        this.scene.start(scenes.first);
      }

      this.physics.add.overlap(dude, stars, collectStar, null, this);

      function collectStar(dude, star) {
        cling.play();
        star.disableBody(true, true);

        score += 10;
        scoreText.setText("Score: " + score);

        if (stars.countActive(true) === 0) {
          finalMessage = this.add.text(200, 150, "BRAVISSIMO MY FRIEND!", {
            fontSize: "32px",
            fill: "#000",
          });
          // setTimeout(this.scene.start(scenes.first), 5000);
        }
      }

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

      this.physics.add.collider(stars, platform2);
      this.physics.add.collider(dude, platform2);

      cursors = this.input.keyboard.createCursorKeys();
    },
  };

  const bootScene = {
    preload: function () {
      this.load.audio("music", "assets/audio/music.ogg");
      this.load.audio("plouf", "assets/audio/plouf.ogg");
      this.load.audio("cling", "assets/audio/cling.ogg");
      this.load.image("sky", "assets/sky.png");
      this.load.image("ground", "assets/platform.png");
      this.load.image("ground2", "assets/platform2.png");
      this.load.image("star", "assets/star.png");
      this.load.spritesheet("dude", "/assets/sprites/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
      });
      this.load.image("lava", "assets/lava.png");
    },

    create: function () {
      this.scene.add(scenes.first, sceneOne, true);
      this.scene.add(scenes.second, sceneTwo, false);

      this.scene.run(scenes.first);
    },

    update: function () {
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
    },
  };

  // const sceneDisplay = () => {};

  // let gameOver;
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: { gravity: { y: 450 }, debug: false },
    },
    scene: bootScene,
    // scene: { preload, create, update },
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
