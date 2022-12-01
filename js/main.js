class Player {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.positionX = 50 - this.width / 2;
    this.positionY = 0;
    //the highest positionX, the more to the right it starts (100 is the maximum)

    this.domElement = null; // tiene que ir antes de this.createDomElement(), porque si no, borraria la informacion que se ha ido almacenando en createDomElement()

    this.createDomElement();
  }

  createDomElement() {
    // step1: create the element:
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveRight() {
    if (this.positionX < 90) {
      this.positionX++;
    } else if (this.position >= 90) {
      this.positionX;
    }
    //console.log("new position...." + this.positionX )
    this.domElement.style.left = this.positionX + "vw"; //always counting from the left
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
    } else if (this.position <= 0) {
      this.positionX;
    }
    //console.log("new position...." + this.positionX )
    this.domElement.style.left = this.positionX + "vw";
  }
}

class Obstacle {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 50 - this.width / 2;
    this.positionY = 80;
    //the highest positionX, the more to the right it starts (100 is the maximum)

    this.domElement = null;

    this.createDomElement();
  }
  createDomElement() {
    // step1: create the element:
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.bottom = this.positionY + "vh";
    this.domElement.style.left = this.positionX + "vw";

    //step3: append to the dom: `parentElm.appendChild()`
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
}
const player = new Player();
const obstacles = [];//will hold instances of the class Obstacle


//Attach event listeners
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    player.moveRight();
  } else if (event.key === "ArrowLeft") {
    player.moveLeft();
  }
});

//Create random obstacles
setInterval(() => {
  const newObstacle = new Obstacle();
  obstacles.push(newObstacle);
}, 3000)



// Move obstacles & detect collisions
setInterval(() => {
  //move all obstacles
  obstacles.forEach((obstacleInstance) => {
    //move current obstacle
    obstacleInstance.moveDown();
    //detect if there's a collision between player and current obstacle
    if (
      player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
      player.positionX + player.width > obstacleInstance.positionX &&
      player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
      player.height + player.positionY > obstacleInstance.positionY
    ) {
      console.log('collision')
    }
  });

  //collision detections

}, 50);




/*
let time = 0;

setInterval(() => {
  obstacles.forEach((obstacleInstance) => {
    time++;

    if (time % 10) {

    }
    obstacleInstance.moveDown();
  });
}, 50);
*/

//remove obstacles when they go down, a bonus

