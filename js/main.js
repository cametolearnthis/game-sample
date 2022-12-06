class Game {
  constructor() {
    this.player = null;
    this.obstacles = [];
  }
  start() {
    this.player = new Player();
    this.attachEventListeners();
    //Create random obstacles
    setInterval(() => {
      const newObstacle = new Obstacle();
      this.obstacles.push(newObstacle);
    }, 3000);

    // Move obstacles & detect collisions
    setInterval(() => {
      //move all obstacles
      this.obstacles.forEach((obstacleInstance) => {
        //move current obstacle
        obstacleInstance.moveDown();
        //detect if there's a collision between player and current obstacle
        this.detectCollision(obstacleInstance);

        //check if we need to remove current obstacle
        this.removeObstacleIfOutside(obstacleInstance);
      });
    }, 50);
  }

  attachEventListeners() {
    //Attach event listeners
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        this.player.moveRight();
      } else if (event.key === "ArrowLeft") {
        this.player.moveLeft();
      }
    });
  }
  detectCollision(obstacleInstance) {
    if (
      this.player.positionX <
        obstacleInstance.positionX + obstacleInstance.width &&
      this.player.positionX + this.player.width > obstacleInstance.positionX &&
      this.player.positionY <
        obstacleInstance.positionY + obstacleInstance.height &&
      this.player.height + this.player.positionY > obstacleInstance.positionY
    ) {
      console.log("collision");
      //location.href = 'gameover.html';
    }
  }
  removeObstacleIfOutside(obstacleInstance) {
    if (obstacleInstance.positionY === 0 - obstacleInstance.height) {
      //console.log('remove obstacle with position...', obstacleInstance.positionY);
      obstacleInstance.domElement.remove();

      this.obstacles.shift();
      console.log(this.obstacles.length);
    }
  }
}
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
    this.width = 10;
    this.height = 20;
    this.positionX = Math.floor(Math.random() * 100 - this.width / 2); //50 - this.width / 2;//random value
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

const game = new Game();
game.start();
