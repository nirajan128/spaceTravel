
const container = document.getElementById("game-space");
document.querySelector(".startButton").addEventListener('click', ()=>{
    console.log("clicked")
    document.getElementById("startScreen").style.display="none";
    document.getElementById("game-space").style.display="block";
    addStar(100);
    moveSpaceShip();
    createAsteroid();
})

/**
 * This method creates a div element add star class to it and random height width and position to create a star.
 * String literals is used when setting the style properties
 * @returns div element star
 * 
 */
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

/**
 * This method create number of start based on the parameter number of star,
 * it select the container first and uses for loop which runs numberOfSTart time and for each iteration
 * the container appends the child element hich isthe star, called from createStar() method
 * @param {} numberOfStar numbers of star
 */
function addStar(numberOfStar){
    const container = document.getElementById("game-space");
    for(let i=0;i<numberOfStar;i++){  
        container.appendChild(createStar());
    }
}


/**
 * This method moves the spaceship to right or left, it uses "keydown" eventlistner which is a listner for when user presses a key,
 * an arrow function used to determined what happens when a key is pressed by user.
 * 
 * the method gets the initial position of ship, widthth of the sipt, width of the screen and checks the condition that
 * if the key is ArrowRight change the position of space ship accordings and if it is ArrowLeft change the position accordingly
 */
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
          if(e.key==="ArrowLeft" && shipLeftPosition>0){ //ensures that the spaceship does not go off screen
            spaceShip.style.left = `${shipLeftPosition - movementValue}px` //shipsLeftposition - movement value which shifts the space ship to left
          }
          else if(e.key==="ArrowRight" && shipLeftPosition + shipWidth < screenWidth){ //ensures that the spaceship does not go off screen
            spaceShip.style.left = `${shipLeftPosition + movementValue}px` //shipsLeftPosition + movementValue which shifts the ship to the right
          }
    })
}

/* This method uses set interval, runs the code inside it every two second
   which creates an asteroid element using SVG, it creates two svg element, asteroid is the svg container and rock is the rect that is inside asteroid
   Then random height width and  radius is created. Attributes are added to asteroid element and  and its position is set randomly(between 0 and screen width) to left
   Then Atrributes for rext(rock) is added and, the rock element is added to asteroid element, which then is added to the container
*/
function createAsteroid(){

    setInterval(()=>{
      const asteroid = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
      const rock = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

      //random height,width, and radius for asteroid rock
      let randomRockHeight = Math.random()*5+30;
      let randomRockWidth = Math.random()*5+30;
      let randomRockRadius1 = Math.floor(Math.random()*3) + 6;
      let randomRockRadius2 = Math.floor(Math.random()*6) + 3;
     
      //svg element attributes
     asteroid.classList.add("asteroid", "svg-responsive");
     asteroid.setAttribute("width", "100");
     asteroid.setAttribute("height", "100");
     asteroid.setAttribute("viewBox", "0 0 100 100");

     //random position for svg - random sizes between 0 and windows(screen) width
     asteroid.style.left = `${Math.random() * window.innerWidth}px`;
     asteroid.style.top= "-100px";

     //asteroid rock attributes
     rock.setAttribute("height", `${randomRockHeight}`);
     rock.setAttribute("width", `${randomRockWidth}`);
     rock.setAttribute('fill', 'url(#asteroidGradient1)');
     rock.setAttribute("rx", `${randomRockRadius1}`);
     rock.setAttribute("ry", `${randomRockRadius2}`)
     
     
     rock.addEventListener("click", (e)=>{
        console.log("damn")
         let node = e.target;
         node.parentElement.removeChild(node)
     })
     

     asteroid.appendChild(rock); //adds rock element to asteroid(SVG)
     container.appendChild(asteroid); //adds astorid to container element
     asteroidFall(asteroid);
    
    },500)
}



function asteroidFall(asteroid){
    console.log("Fallllll")
    
    let asteroidFallSpeed = 2;

    const fallInterval = setInterval(()=>{
        let eachAsteroidPosition = parseFloat(asteroid.style.top);
        if(eachAsteroidPosition > window.innerHeight){
            container.removeChild(asteroid);
            clearInterval(fallInterval);
        }else{
            asteroid.style.top=`${eachAsteroidPosition+=asteroidFallSpeed}px`
        }
    }, 16)

   
   
}



