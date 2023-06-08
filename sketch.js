const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;

var particle1
var plane
var plane2
var plane3
var plane4
var block1, block2;
var bkg,bkgIMG,birdIMG
var state=0
var spikes,spikes1,spikes2,spikes3,spikes4
var enemy_ball1
var ball
var lol=0
var box,box1
function preload(){
  bkgIMG = loadImage("thunda.png")
  birdIMG = loadImage("123.png")
  spikes = loadImage("spike.png")
  spikes1=loadImage("left.png")
  spikes2=loadImage("right.png")
  spikes3=loadImage("up.png")

  ball = loadImage("ball.png")
}
function setup(){
    var canvas = createCanvas(800,800);
    engine = Engine.create();
    world = engine.world;

    //created plane and block bodies
    var plane_options={
    //  isVisible:false
      isStatic:true
      
    }
    var box = Bodies.rectangle(590,500,200,10)
  World.add(world,box)
  rect(box.position.x,box.position.y,230,10)

  var box1 = Bodies.rectangle(190,500,200,10)
  World.add(world,box1)
  rect(box1.position.x,box1.position.y,200,10)
  
    plane = Bodies.rectangle(600,height,1200,20,plane_options);
    World.add(world,plane);
    plane2 = Bodies.rectangle(600,0,1200,20,plane_options);
    World.add(world,plane2);
    
    bkg=Bodies.rectangle(600,600,10,10)
 enemy_ball1= Bodies.circle(500,30,10,particle_options)
 World.add(world,enemy_ball1);
 

  
    block1=Bodies.rectangle(5,200,10,1000,plane_options);
    World.add(world,block1);
    block2=Bodies.rectangle(795,200,10,1000,plane_options);
    World.add(world,block2);

    //created multiple of particle bodies 
    var particle_options = {
      restitution:0.02,
      friction:0.02
    }

    particle1 = Bodies.circle(200,30,10,particle_options);
    World.add(world,particle1);

  
  
    //styling the bodies here
    fill("brown");
    rectMode(CENTER);
    ellipseMode(RADIUS);
   
}

function draw(){
    //background();
    background(bkgIMG)
  
    spawnObstacles()
    Engine.update(engine);
    ellipse(particle1.position.x,particle1.position.y,10);
  //created shape for plane and stand

if(particle1.position.y>=750|| particle1.position.x>=750 || particle1.position.x<=25 || particle1.position.y<=20  ){
  gameOver()
  state=1
  particle1.position.x=500
  particle1.position.y=250
  particle1.isStatic=true
 lol = 1
}

  rect(plane.position.x,plane.position.y,1200,20);
  rect(plane2.position.x,plane2.position.y,1200,20);

  rect(block1.position.x,block1.position.y,20,1200);

  rect(block2.position.x,block2.position.y,20,1200);



  //created shape for all the paticles
 

  
 
//console.log(particle1.velocity)
  if(particle1.velocity<1 || particle1.velocity>1 ){
    particle1.velocity=0.2
  }
  push();
  imageMode(CENTER);
  push()
  //image(bkgIMG,bkg.position.x-210,bkg.position.y-220,800,800);
  pop()
  image(birdIMG,particle1.position.x,particle1.position.y, 100, 100);
  image(spikes,plane.position.x-180,plane.position.y+20, 800, 300);
  image(spikes1,plane2.position.x-585,plane2.position.y+400,300,899);
  image(spikes2,block1.position.x+780,block2.position.y+170,300,899);
  image(ball,enemy_ball1.position.x,enemy_ball1.position.y,50,50);
  image(spikes3,block1.position.x+400,block2.position.y-200,1130,300);

  //image(spikes3,plane3.position.x-200,plane3.position.y);

  pop(); 
 

 // drawSprites()
}//function draw ends here

function gameOver() {
  particle1.isVisible=false
  swal(
    {
      title: `Game Over!!!`,

    

      text: "You collided with the spikes."+
      "'OUCH!!!'---BirdMan",
      
             
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
if(!lol===0){
  keyPressed()
  spawnObstacles()
}


if(lol===0){
  Start()
}

function Start() { 
prompt("Welcome to BIRDMAN !                                                                      "+
"try to help bird man escape by lasting as long as you can without dying")

  lol=1
}

function keyPressed(){
  if(keyIsPressed && state===0){
  
    if( keyCode=== UP_ARROW ){
     

      Matter.Body.applyForce(particle1,{x:0,y:0},{x:0,y:-0.008})
    

    }
 if( keyCode=== LEFT_ARROW){
 
  Matter.Body.applyForce(particle1,{x:0,y:0},{x:-0.0023,y:0})


}
if( keyCode=== RIGHT_ARROW){
  

  Matter.Body.applyForce(particle1,{x:0,y:0},{x:0.0023,y:0})
 
}
if( keyCode=== DOWN_ARROW){

  Matter.Body.applyForce(particle1,{x:0,y:0},{x:0,y:0.0023})
 
}
}
}


function spawnObstacles(){
  

  if (frameCount % 80 === 0){
    enemy_ball1= Bodies.circle(500,30,10,particle_options)
  
    World.add(world,enemy_ball1);

    var particle_options = {
      restitution:0.2,
      friction:0.02,
 
    }
    ellipse(particle1.position.x,particle1.position.y,10);
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1:  
       enemy_ball1= Bodies.circle(600,1,10,particle_options)
       World.add(world,enemy_ball1);
               break;
       case 2: 
       enemy_ball1= Bodies.circle(400,1,10,particle_options)
       World.add(world,enemy_ball1);
               break;
       case 3: 
       enemy_ball1= Bodies.circle(200,3,10,particle_options)
       World.add(world,enemy_ball1);
               break;
               case 4:
               enemy_ball1= Bodies.circle(30,1,10,particle_options)
               World.add(world,enemy_ball1);
                      break;
               case 5:
               enemy_ball1= Bodies.circle(500,1,10,particle_options)
               World.add(world,enemy_ball1);
                       break;
               case 6: 
               enemy_ball1= Bodies.circle(100,3,10,particle_options)
               World.add(world,enemy_ball1);
                       break;
      
       default: break;
     }
     
     //assign scale and lifetime to the obstacle           
    enemy_ball1.scale = 0.5;
    enemy_ball1.lifetime = 90000;
 
    //add each obstacle to the group

  }
 }