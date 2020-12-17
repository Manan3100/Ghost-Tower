var ghost, ghostImage
var climber, climberImage
var door, doorImage
var tower, towerImage
var spookySound
var doorsGroup, climbersGroup, invisibleBlockGroup 
var gameState="play";

function preload(){
 ghostImage = loadImage("ghost-standing.png"); 
 climberImage = loadImage("climber.png"); 
 doorImage = loadImage("door.png");
 towerImage = loadImage("tower.png"); 
}

function setup(){
createCanvas(600, 600); 
  
tower=createSprite(300, 300);
tower.addImage(towerImage);  
tower.velocityY = 1; 
  
ghost=createSprite(300, 300);
ghost.addImage(ghostImage);
ghost.scale=0.3;
  
doorsGroup = new Group();
climbersGroup = new Group();
invisibleBlockGroup = new Group();  
  
}

function draw(){
background("blue");

if(gameState === "play"){

  
if(tower.y>400){
  tower.y=300;
}  
  
 if(keyDown("space")){
 ghost.velocityY=-10;     
 } 
  
 ghost.velocityY=ghost.velocityY+0.8;
  
if(keyDown("left")){
ghost.x=ghost.x-3;  
}
  
if(keyDown("right")){
ghost.x=ghost.x+3;  
}  

if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
 ghost.destroy(); 
 gameState="end"; 
}  
  
spawnDoors();
  
drawSprites(); 
}
  
if(gameState === "end"){
fill("white")  
textSize(30);
text("GAME OVER", 215, 300);  
  
}   
}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImage);
    climber.addImage(climberImage);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
