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
var som_fundo, som_comendo, som_triste, som_ar, som_corte;
var soprador;

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
  som_corte = loadSound("images/rope_cut.mp3");

  coelho_feliz.playing = true;
  coelho_feliz.looping = true;
  coelho_comendo.playing = true;
  coelho_comendo.looping = false;
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW,canH);
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW,canH);
  }
  //createCanvas(500,700);
  frameRate(80); 

  som_fundo.play();
  som_fundo.setVolume(0.2);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,500,20);

  coelho_feliz.frameDelay = 20;
  coelho_comendo.frameDelay = 20;
  coelho_triste.frameDelay = 20;

  coelho = createSprite(200,canH-100,100,100);
  coelho.scale = 0.2;
  //coelho.addImage(coelho_1);
  coelho.addAnimation("feliz", coelho_feliz);
  coelho.addAnimation("comendo", coelho_comendo);
  coelho.addAnimation("triste", coelho_triste);

  botao_cortar = createImg("images/cut_btn.png");
  botao_cortar.position(50,80);
  botao_cortar.size(80,80);
  botao_cortar.mouseClicked(cair); //função callback
  botao_cortar2 = createImg("images/cut_btn.png");
  botao_cortar2.position(150,30);
  botao_cortar2.size(80,80);
  botao_cortar2.mouseClicked(cair2); //função callback
  botao_cortar3 = createImg("images/cut_btn.png");
  botao_cortar3.position(250,120);
  botao_cortar3.size(80,80);
  botao_cortar3.mouseClicked(cair3); //função callback
  botao_mudo = createImg("images/mute.png");
  botao_mudo.position(250,30);
  botao_mudo.size(70,70);
  botao_mudo.mouseClicked(mute); //função callback

  soprador = createImg("images/balloon.png")
  soprador.position(50,250);
  soprador.size(80,80);
  soprador.mouseClicked(soprar); //função callback
  

  rope = new Rope(6,{x:80,y:80});
  corda2= new Rope(6,{x:200,y:30});
  corda03= new Rope(6,{x:300,y:120});
  fruit = Bodies.circle(300,250,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  linkcorda2 = new Link (corda2,fruit);
  linkcorda3 = new Link (corda03,fruit);

  rectMode(CENTER);
  textSize(50);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(imagem_fundo,canW/2,canH/2,canW,canH);

  rope.show();
  corda2.show();
  corda03.show();
  if(fruit!= null){
  image(fruta,fruit.position.x,fruit.position.y,80,80);
  }
  Engine.update(engine);
  
  //ground.show();

  //chamada da função colidir
  if(colidir(fruit,coelho) == true){
    coelho.changeAnimation("comendo");
    som_comendo.play();
  }

  drawSprites();
  //if(colidir(fruit,ground.body) == true) ou...
  if(fruit!=null && fruit.position.y >= canH-100)
  {
    coelho.changeAnimation("triste");
    som_fundo.stop();
    som_triste.play();
    fruit = null;
  }
  
   
}

function cair(){
  som_corte.play();
  rope.break();
  fruit_con.soltar();
  fruit_con = null;
  
}
function cair2(){
  som_corte.play();
  corda2.break();
  linkcorda2.soltar();
  linkcorda2 = null;
  
}
function cair3(){
  som_corte.play();
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