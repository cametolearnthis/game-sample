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
      this.positionX ++;
    } else if (this.position >= 90) {
      this.positionX ;
    }
    //console.log("new position...." + this.positionX )
    this.domElement.style.left = this.positionX + "vw"; //always counting from the left
  }
  moveLeft() {
    if (this.positionX > 0) {
      this.positionX --;
    } else if (this.position <= 0) {
      this.positionX;
    }
    //console.log("new position...." + this.positionX )
    this.domElement.style.left = this.positionX + "vw";
  }
}
const player = new Player();

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    player.moveRight();
  } else if (event.key === "ArrowLeft") {
    player.moveLeft();
  }
});
