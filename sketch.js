const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var ground;
var fruit,rope,corda2,corda03;
var fruit_con,linkcorda2,linkcorda3;
var coelho, coelho_triste, coelho_comendo, coelho_feliz, fruta;
var imagem_fundo;
var botao_cortar, botao_mudo,botao_cortar2,botao_cortar3;
var som_fundo, som_comendo, som_triste, som_ar;
var soprador 
function preload(){
  imagem_fundo = loadImage("images/background.png");
  fruta = loadImage("images/melon.png");
  coelho_1 = loadImage("images/Rabbit-01.png");
  coelho_feliz = loadAnimation("images/blink_1.png", "images/blink_2.png", "images/blink_3.png");
  coelho_comendo = loadAnimation("images/eat_0.png", "images/eat_1.png", "images/eat_2.png", "images/eat_3.png", "images/eat_4.png");
  coelho_triste = loadAnimation("images/sad_1.png", "images/sad_2.png", "images/sad_3.png");
  som_fundo = loadSound("images/sound1.mp3");
  som_comendo = loadSound("images/Cutting Through Foliage.mp3");
  som_triste = loadSound("images/sad2.wav");
  som_ar = loadSound("images/air.wav");

  coelho_feliz.playing = true;
  coelho_comendo.playing = true;
  coelho_comendo.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80); 

  som_fundo.play();
  som_fundo.setVolume(0.2);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  coelho_feliz.frameDelay = 20;
  coelho_comendo.frameDelay = 20;
  coelho_triste.frameDelay = 20;

  coelho = createSprite(400,620,100,100);
  coelho.scale = 0.2;
  //coelho.addImage(coelho_1);
  coelho.addAnimation("feliz", coelho_feliz);
  coelho.addAnimation("comendo", coelho_comendo);
  coelho.addAnimation("triste", coelho_triste);

  botao_cortar = createImg("images/cut_btn.png");
  botao_cortar.position(200,30);
  botao_cortar.size(80,80);
  botao_cortar.mouseClicked(cair); //função callback
  botao_cortar2 = createImg("images/cut_btn.png");
  botao_cortar2.position(400,125);
  botao_cortar2.size(80,80);
  botao_cortar2.mouseClicked(cair2); //função callback
  botao_cortar3 = createImg("images/cut_btn.png");
  botao_cortar3.position(80,80);
  botao_cortar3.size(80,80);
  botao_cortar3.mouseClicked(cair3); //função callback
  botao_mudo = createImg("images/mute.png");
  botao_mudo.position(400,40);
  botao_mudo.size(80,80);
  botao_mudo.mouseClicked(mute); //função callback

  soprador = createImg("images/balloon.png")
  soprador.position(160,300);
  soprador.size(80,80);
  soprador.mouseClicked(soprar); //função callback
  

  rope = new Rope(7,{x:245,y:30});
  corda2= new Rope (8,{x:450,y:150})
  corda03= new Rope (7,{x:110,y:80})
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  linkcorda2 = new Link (corda2,fruit);
  linkcorda3 = new Link (corda03,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(imagem_fundo,250,350,500,700);

  rope.show();
  corda2.show();
  corda03.show();
  if(fruit!= null){
  image(fruta,fruit.position.x,fruit.position.y,70,70);
  }
  Engine.update(engine);
  
  //ground.show();

  //chamada da função colidir
  if(colidir(fruit,coelho) == true){
    coelho.changeAnimation("comendo");
    som_comendo.play();
  }

  drawSprites();
  if(colidir(fruit,ground.body) == true){
    coelho.changeAnimation("triste");
    som_triste.play();
  }
   
}

function cair(){
  rope.break();
  fruit_con.soltar();
  fruit_con = null;
  
}
function cair2(){
  corda2.break();
  linkcorda2.soltar();
  linkcorda2 = null;
  
}
function cair3(){
  corda03.break();
  linkcorda3.soltar();
  linkcorda3 = null;
  
}
function soprar(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05,y:0})
  som_ar.play();
}
function colidir(body,sprite){
  if(body!=null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(d <= 80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
    
  }
}

function mute(){
  if(som_fundo.isPlaying()){
    som_fundo.stop();
  }
  else{
    som_fundo.play();
  }
}