//coamndo pra fazer as variaveis do jogo
var rodrigo,rodrigo_run,rodrigoperde;
var bordas;
var piso, pisoimagem;
var pisoinvisivel;
var nuvem;
var nuvemimagem;
var obstaculo;
var gruponuvem;
var grupoobstaculo;
var PLAY = 1;
var GAMEOVER = 0;
var modo = PLAY;
var pontuacao = 0;
var restart;
var fim;
var fimimagem;
var restartimagem;
var sompulo;
var sommorte;
var somcheck;


//pré carrega as imagens do jogo
function preload(){      
  rodrigo_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  pisoimagem = loadImage("ground2.png")
  
  nuvemimagem = loadImage("cloud.png");;
  
  obstaculo1 = loadImage("obstacle1.png");
  
  obstaculo2 = loadImage("obstacle2.png");
  
  obstaculo3 = loadImage("obstacle3.png");
  
  obstaculo4 = loadImage("obstacle4.png");
  
  obstaculo5 = loadImage("obstacle5.png");
  
  obstaculo6 = loadImage("obstacle6.png");

  rodrigoperde = loadImage("trex_collided.png");

  restartimagem = loadImage("restart.png");

  fimimagem = loadImage("gameOver.png");

  sompulo = loadSound("jump.mp3")

  sommorte = loadSound("die.mp3")

  somcheck = loadSound("checkPoint.mp3")

}

//comando pra configirar tudo do jogo
function setup(){

  //comando para a tela do jogo para diferentes plataformas
  createCanvas(windowWidth,windowHeight);

  gruponuvem = new Group();
  
  grupoobstaculo = new Group();

  //comando pra fazer um numero ser aleatorio
  //aleatorio = Math.round(random(1,10));

  //configuracoes do rodrigo
  rodrigo = createSprite(50,height-100,20,20);
  rodrigo.addAnimation("running",rodrigo_run);
  rodrigo.scale = 0.5;
  rodrigo.addImage("morte",rodrigoperde)

  //coamndo pra fazer as boras/paredes do jogo/tela
  bordas = createEdgeSprites();
  
  //comando pra fazer os sprites do piso
  piso = createSprite(width/2,height-15,width,11);

  //fazer com q o piso comece no meio do jogo
  piso.x = piso.width/2;
  
  //fazer o piso ter imagem
  piso.addImage(pisoimagem);


  //piso invisivel do jogo pro rodrigo tocar 
  pisoinvisivel = createSprite(width/2,height-11,width,11); 

  // fazer com que o o piso invisivel fique invisivel
  // ava
  pisoinvisivel.visible = false;


  rodrigo.debug = false;

  //comando da colizao do rodrigo
  rodrigo.setCollider("circle",0,0,32);

  //comando pra o rodrigo enchergar o cacato(ta desligado)
  //rodrigo.setCollider("circle",100,0,32);

  fim = createSprite(width/2,height/2,10,10);
  fim.addImage(fimimagem);
  fim.visible = false;

  restart = createSprite(width/2,height/2+50,10,10);
  restart.addImage(restartimagem);
  restart.visible = false;
  
   
  

} 

//comando pra fazer o jogo funcionar
function draw(){

  //comando pra fazer a cor do fundo do jogo
  background('white');

   //concatenacao de strings e som do check point quando chega a 100 pontos
   textSize(20);
   text("pontuação: "+pontuacao, 50,50);
  if(modo===PLAY){
   if(pontuacao%100===0 && pontuacao >0){
   somcheck.play();
   }
   
  
   //comando pra criar a nuvem do jogo
   criarnuvem();

   //comando pra criar o obstaculo no jogo
   criarobstaculo();

  
   //comando pro rodrigo pular e o som do pulo
    if(touches.length>0 && rodrigo.isTouching(piso)){
     rodrigo.velocityY = -13;
     sompulo.play();
     touches=[];
    }
   
   
    //gravidade do rodrigo e do jogo
   rodrigo.velocityY = rodrigo.velocityY + 0.9;

   //fazer o rodrigo chegar e andar no piso/chão
   rodrigo.collide(pisoinvisivel);
    
   //velocidade do chão do jogo
   piso.velocityX = -(5+pontuacao/100);

   //faz com q o chão fique infinito
   if(piso.x <0){   
     piso.x = piso.width /2
    }

  // comando da ponuação do jogo
   pontuacao = pontuacao+Math.round(frameRate()/60);

   if (rodrigo.isTouching(grupoobstaculo)){
   //rodrigo.velocityY=-10;
   //sompulo.play();  
   modo = GAMEOVER
   sommorte.play();
   }
  }
  else if(modo===GAMEOVER){
  
     piso.velocityX = 0;

     grupoobstaculo.setVelocityXEach(0);

     gruponuvem.setVelocityXEach(0); 

     rodrigo.velocityY = 0; 
     
     grupoobstaculo.setLifetimeEach(-1);

     gruponuvem.setLifetimeEach(-1);

     rodrigo.changeAnimation("morte");

     restart.visible = true;

     fim.visible = true;

     //comando para dar o restart no jogo
     if(touches.length>0){
     reset();
     touches=[];
     }
     
  }

  // desenhas os sprites na tela
  drawSprites();
}

// funcão de criar nuvens no jogo
function criarnuvem(){
   //que a cada 60 frames criar uma nuvem no jogo
  if(frameCount%60 === 0){

   //criar a sprite da nuvem
    nuvem = createSprite(width+20,30,20,20);

   //velocidade da nuvem   
   nuvem.velocityX = -(3+pontuacao/300);

   //adicionar uma imgem na nuvem 
   nuvem.addImage(nuvemimagem);

   //o tamanho da imgem da nuvem
   nuvem.scale = 0.9;
    
   //fazendo com a nuvem fique as posicoes Y(de cima pra baixo) dela fique aleatorio
   nuvem.y = Math.round(random(height-180,height-110));

   //rodrigo na mesma camda da nuvem
   rodrigo.depth = nuvem.depth;
   
   //rodrigo fique na frente da nuvem
   rodrigo.depth = rodrigo.depth +1;  
   
   //comando pra faer a nuvem ter um tempo de vidar(para não fritar o computador)
   nuvem.lifetime = width+20;

   gruponuvem.add(nuvem);

  }  
}
function criarobstaculo(){
   //
   if(frameCount%60 === 0){
  
   //
   obstaculo = createSprite(width+20,height-27,10,10);
  
   //obstaculo faica se mechendo e fiaca mais rapido com o tempo
   obstaculo.velocityX = -(5+pontuacao/100);

   //
   var aleatorio = Math.round(random(1,6));

    //
     switch(aleatorio){
     
     //
     case 1: obstaculo.addImage(obstaculo1);
     break;
     
     //
     case 2: obstaculo.addImage(obstaculo2);
     break;

     //
     case 3: obstaculo.addImage(obstaculo3);
     break;

     //
     case 4: obstaculo.addImage(obstaculo4);
     break;

     //
     case 5: obstaculo.addImage(obstaculo5);
     break;
 
     //
     case 6: obstaculo.addImage(obstaculo6);
     break;

     //
     default: break;
     
    }

   //
   obstaculo.scale = 0.5;

   //tempo de vida do cacto(pra não fitrar o computador)
   obstaculo.lifetime = width+20;

   grupoobstaculo.add(obstaculo);

  }
  
  
}
 //comandos para fazer o jogo se reiniciar
  function reset(){
  modo=PLAY 

 //comando para as nuvems sumirem e voltar quando se reiniciar o jogo
  grupoobstaculo.destroyEach();

  //comando para os cactos sumirem e voltar quando se reinicar o jogo
  gruponuvem.destroyEach();

  //comando para o gameover sumir e voltar quando o jogo reiniciar
  fim.visible=false ;

 //comando para o desenho gameover sumi e voltar quando o jogo reiniciar
  restart.visible=false;

  //comando pra pontuacão for 0 quando o jogo reiniciar
  pontuacao=0;

 // comando pro rodrigo ficar na sua animação de correr quando o jogo reiniciar
  rodrigo.changeAnimation("running");
  }
 
  

