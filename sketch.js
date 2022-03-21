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
var fruit,rope;
var fruit_con;
var coelho, coelho_triste, coelho_comendo, coelho_feliz, fruta;
var imagem_fundo;
var botao_cortar;

function preload(){
  imagem_fundo = loadImage("images/background.png");
  fruta = loadImage("images/melon.png");
  coelho_1 = loadImage("images/Rabbit-01.png");
  coelho_feliz = loadAnimation("images/blink_1.png", "images/blink_2.png", "images/blink_3.png");

  coelho_feliz.playing = true;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80); 
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  coelho_feliz.frameDelay = 20;

  coelho = createSprite(420,620,100,100);
  coelho.scale = 0.2;
  //coelho.addImage(coelho_1);
  coelho.addAnimation("feliz", coelho_feliz);

  botao_cortar = createImg("images/cut_btn.png");
  botao_cortar.position(200,30);
  botao_cortar.size(80,80);
  botao_cortar.mouseClicked(cair); //função callback


  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

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

  image(fruta,fruit.position.x,fruit.position.y,70,70);
  Engine.update(engine);
  
  //ground.show();


  drawSprites();
 
   
}

function cair(){
  rope.break();
  fruit_con.soltar();
  fruit_con = null;
}