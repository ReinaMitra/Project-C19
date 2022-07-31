var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  if(gameState == "play"){
    background(200);
    if(tower.y > 400){
        tower.y = 300
      }
    ghost.velocityY = ghost.velocityY + 0.5;
    if(keyDown("space")){
      ghost.velocityY = -10; 
    }
    if(keyDown("right")){
      ghost.x = ghost.x + 5;
    }
    if(keyDown("left")){
      ghost.x = ghost.x - 5;
    }
    if(frameCount%200 == 0){
      spawnClimbers();
    }
      drawSprites();
    if(ghost.isTouching(climbersGroup)|| ghost.y>=590){
      gameState = "end";
    }
    if(ghost.isTouching(invisibleBlockGroup)){
      ghost.collide(invisibleBlockGroup);
    }
  }
  else if(gameState == "end"){
    background("black");
    textSize(35);
    fill("yellow");
    text("Game Over",220,250); 
     
  }
}

function spawnClimbers(){
  climber = createSprite(250,10,10,10);
  climber.addImage(climberImg);
  climber.velocityY = 1;
  climber.x =  random(150,450);
  climber.debug = true;
  climber.setCollider("rectangle",0,9,85,8);
  climber.depth = ghost.depth;
  ghost.depth = ghost.depth + 2;
  door = createSprite(250,10,10,10);
  door.addImage(doorImg);
  door.scale = 1; 
  door.x = climber.x;
  door.velocityY = 1;
  door.y = climber.y - 60;
  door.depth = climber.depth;
  climber.depth = climber.depth + 1;
  invisibleBlock = createSprite(250,10,80,10);
  invisibleBlock.velocityY = 1;  
  invisibleBlock.x = climber.x;
  invisibleBlock.y = climber.y - 10; 
  invisibleBlock.visible = false;
  invisibleBlock.debug = true;
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);
}