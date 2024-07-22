
document.querySelector(".startButton").addEventListener('click', ()=>{
    console.log("clicked")
    document.getElementById("startScreen").style.display="none";
    document.getElementById("game-space").style.display="block";
    addStar(100);
    moveSpaceShip();
})


function createStar(){
    const star = document.createElement("div"); //creates a div element
    star.classList.add("star"); //adds star class to the div element

    //Random height bewteen 1 and 4 for the star
    star.style.width = `${Math.random()*3 +1}px`;
    star.style.height = `${Math.random()*3 +1}px`;

    star.style.backgroundColor = "white";

    //Used string literals since top takes string but not integer, use Math.random() to generate random number between 1 and 100 for the start positon
    star.style.top = `${Math.random()*100}vh`;
    star.style.left = `${Math.random()*100}vw`;
    star.style.animation = `twinkle ${Math.random()*4+1}s infinite ease-in-out`

    return star;
}

function addStar(numberOfStar){
    const container = document.getElementById("game-space");
    for(i=0;i<numberOfStar;i++){  
        container.appendChild(createStar());
    }
}


function moveSpaceShip(){
    document.addEventListener("keydown", (e)=>{
          console.log(e.key); //check which key is pressed
          const spaceShip = document.getElementById("spaceShip");

          let shipLeftPosition = spaceShip.offsetLeft; //gets the initial oeft position of spaceShip
          console.log(shipLeftPosition);

          let shipWidth = spaceShip.offsetWidth; //width of the ship
          console.log(shipWidth);
          
          let screenWidth = window.innerWidth; //gets the width value of the whole screen
          console.log(screenWidth);

          let movementValue = 10; //value to move when a key is pressed
          
          //if event.key is arrowLeft and ships currnet position is gretaer tha 0 move the ship to left value (shipCurrentPosition - movement value)
          if(e.key==="ArrowLeft" && shipLeftPosition>0){
            spaceShip.style.left = `${shipLeftPosition - movementValue}px`
          }
          else if(e.key==="ArrowRight" && shipLeftPosition + shipWidth < screenWidth){
            spaceShip.style.left = `${shipLeftPosition + movementValue}px`
          }
    })
}