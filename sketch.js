var knife, knifeImg;
var PLAY = 1;
var END =0;
var gameState = PLAY;
var monsterImg;
var score = 0;

function preload(){
  knifeImg = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImg = loadAnimation("alien1.png","alien2.png");
  gameOverImg = loadImage("gameover.png");
 
}

function setup(){
  knife = createSprite(40,200,20,20);
  knife.addImage(knifeImg);
  knife.scale = 0.7;
  fruitGroup = new Group();
  monsterGroup = new Group();
}
function draw(){
  background("lightblue");
  
  if(gameState === PLAY ){
    knife.x = mouseX;
    knife.y = mouseY;
    createFruits();
    createEnemy();
  }

  drawSprites();
  textSize(20);
  text("Score "+ score , 180,20);
  if(fruitGroup.isTouching(knife)){
    fruitGroup.destroyEach();
    score = score + 2;
  }
  
  
  if(monsterGroup.isTouching(knife)){
    gameState = END;
    knife.velocityX = 0;
    knife.addImage(gameOverImg);
    knife.x = 200;
    knife.y = 200;
    fruitGroup.destroyEach();
    monsterGroup.destroyEach();
  }
}

function createFruits(){
   
    if(World.frameCount % 80 === 0 ){
      var fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;
      var r = Math.round(random(1,4));
      if(r == 1){
        fruit.addImage(fruit1);
      } else if(r == 2){
        fruit.addImage(fruit2);
      } else if(r == 3){
        fruit.addImage(fruit3);
      } else if(r == 4){
        fruit.addImage(fruit4);
      }
      fruit.y  = Math.round(random(50,340));
      fruit.velocityX = -7;
      fruit.lifetime = 100;
      fruitGroup.add(fruit);
    }
}

function createEnemy(){
  if(World.frameCount % 200 === 0 ){
      var monster = createSprite(400,200,20,20);
      monster.addAnimation("mosterImage", monsterImg);
      monster.y  = Math.round(random(50,340));
      monster.velocityX = -7;
      monster.lifetime = 100;
      monsterGroup.add(monster);
    }
}
