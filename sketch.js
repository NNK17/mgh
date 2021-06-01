var monkey,
  monkeyAnim,
  ground,
  bananaGroup,
  obstacleGroup,
  survival,
  monkey_01,
  monkey_02,
  monkey_03,
  monkey_04,
  monkey_05,
  monkey_06,
  monkey_07,
  monkey_08,
  monkey_09,
  monkey_10;

function preload() {
  monkeyAnim = loadAnimation(
    "Monkey_01.png",
    "Monkey_02.png",
    "Monkey_03.png",
    "Monkey_04.png",
    "Monkey_05.png",
    "Monkey_06.png",
    "Monkey_07.png",
    "Monkey_08.png",
    "Monkey_09.png",
    "Monkey_10.png"
  );
  bananaimg = loadImage("banana.png");
  obsimg = loadImage("stone.png");
  monkimg = loadImage("Monkey_01.png");
  back = loadImage("jungle.jpg")
}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(70, 350, 20, 50);
  monkey.addAnimation("monkey", monkeyAnim);
  monkey.scale = 0.1;
  ground = createSprite(200, 384, 30000, 8);
  bananaGroup = createGroup();
  monkey.addImage("stopmonkey", monkimg);

  obstacleGroup = createGroup();
  survival = 0;
}

function draw() {
  background(back);
  drawSprites();
  ground.visible = false;

  if (World.frameCount % 30 === 0) {
    survival = survival + 1;
  }

  text(survival, 200, 40);

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

  if (World.frameCount % 80 === 0) {
    var banana = createSprite(random(0, 400), random(250, 300), 20, 20);

    banana.addImage("bana", bananaimg);
    banana.scale = 0.04;

    banana.velocityX = -2;
    bananaGroup.add(banana);
  }

  if (World.frameCount % 300 === 0) {
    var obstacle = createSprite(random(0, 400), 370, 20, 20);
    obstacle.addImage("obs", obsimg);
    obstacle.scale = 0.14;
    obstacle.velocityX = -2;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 400;
  }
  if (monkey.isTouching(obstacleGroup)) {
    monkey.velocityX = 0;
    monkey.changeImage("stopmonkey");
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    bananaGroup.velocityX = 0;
    survival = survival * 0;
  }
}
