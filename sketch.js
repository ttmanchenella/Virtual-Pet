var dog;
var dogImage1;
var dogImage2;
var database;
var foodValue;

function preload(){
  dogImage1 = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  var reference = database.ref("food");
  reference.on("value", readFood);
  dog = createSprite(400, 350);
  dog.addImage("dog", dogImage1);
  dog.addImage("dog1", dogImage2);
}


function draw() {  
  background("black");
  if (keyDown(UP_ARROW)) {
    updateFood();
    dog.changeImage("dog1", dogImage2);
  }

  fill("white");
  textSize(20);
  text("Food: " + foodValue, 100, 100);

  drawSprites();
}

function readFood(data) {
  foodValue = data.val();
}

function updateFood() {
  if(foodValue > 0) {
    foodValue -= 1;
    var fjson = {
      food: foodValue
    }
    var reference = database.ref("/");
    reference.update(fjson);
  }
}