//Create variables here
var dog,happyDog,foodStock,dogI,database,food
var foodS,foodGG,timeta,bg,backgroundImg
var x =20


function preload()
{
	//load images here
  dogI = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  getbackgroundImg();
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
timeta = database.ref('time')
timeta.on("value",timestock)
  dog = createSprite(750,250,50,50);
  dog.scale = 0.3;
  dog.addImage(dogI)
  feed = createButton("Feed the dog");
  
  feed.position(700,95);
  
  feed.mousePressed(feedDog);

  addFoodd = createButton("Add Food");
  addFoodd.position(800,95);
 addFoodd.mousePressed(addFood)
  foodGGG = new Game();
  foodGG = new Game();
 // foodGGG.getState();
}


function draw() {  
   if(backgroundImg)
    background(backgroundImg);
if(keyWentDown(UP_ARROW)){
  writeStock(x-1);
  dog.addImage(happyDog)
}
foodGGG.display();
  drawSprites();
  //add styles here
  text("foodStock: "+foodStock , 100,100)
  text("time: " +timeta , 150,150)
}
function readStock(data){
  foodStock = data.val();
}
function timestock(data){
  timeta = data.val();
  console.log(timeta)
}

function writeStock(){


}
function feedDog(){
  dog.addImage(happyDog);

  //foodGGG.update(foodGGG.getState()-1);
database.ref('/').update({
  Food: foodStock=foodStock-1
})
}
function addFood(){
  dog.addImage(happyDog);


  database.ref('/').update({
    Food: foodStock=foodStock+1
  })
}
async function trial (){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
 // console.log(responseJSON);  
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  console.log(hour)
  if(feed.mousePressed){
  database.ref('/').update({
    time: hour

  })


}
}
async function getbackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  console.log(responseJSON);  
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  var currentTime = hour;
  console.log(currentTime-2);
  console.log(hour);


  if(timeta===(currentTime-1)){
    feed.hide();
    addFood.hide();
bg = "garden.png"
  }else
  if(timeta===(currentTime-2)){
    feed.hide();
    addFood.hide();
    bg = "bedRoom.png"
      }else
      if(timeta===(currentTime-2)&&timeta===(currentTime-4)){
        feed.hide();
        addFood.hide();
        bg = "washRoom.png"
      }else{
  
        bg = "download.png"
      }
 /* if(hour<=06 && hour>=19){
      bg = "bg1.png";
  }else
   {bg = "bg2.jpg" }*/
   backgroundImg = loadImage(bg);
}