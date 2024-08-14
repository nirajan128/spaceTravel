/* @Author: Nirajan Shrestha
   July 27,2024 
*/

/* Required HTML elemnts */
const container = document.getElementById("game-space");
const spaceShip = document.getElementById("spaceShip");
const leftArrow = document.getElementById("leftArrow");
const infoScreen = document.getElementById("gameInfo");
const rightArrow = document.getElementById("rightArrow");
const gameOver = document.getElementById("gameOver");
const restartBtn = document.getElementById("restart");
const distanceValueContainer = document.getElementById("travel");
const score = document.getElementById("distance");
const scoreDetail = document.getElementById("scoreDetail");
const matterDetail = document.getElementById("matterDetail");
const antiMatterElement = document.getElementById("antiMatter");
const anitMatterScore = document.getElementById("antiMatterValue");

/* Gloabl VAriables */
let distanceValue = 0.0;
let distanceInterval;
let matterValue = 0;
let fuelInterval;
let isGameOver = false;



//Calls startGame method when page is loaded
window.addEventListener("DOMContentLoaded", startGame)



/**
 * Starts the game when startButton is clicked, hides thestartScreen ,displays the info screen by setting display styles to none and block
 */
function startGame(){
    document.querySelector(".startButton").addEventListener('click', ()=>{
        console.log("clicked")
        document.getElementById("startScreen").style.display="none";  
        infoScreen.style.display="flex"
        playGame();
    })
}

/**
 * This method starts the game when playButton is clicked, sets the game-space display  to block to display the game screen
 * and dispalys the the value, spaceship, and antimatteer, hides the info screen and 
 * calls all required methods.
 */
function playGame(){
    document.querySelector(".playButton").addEventListener('click', ()=>{
        container.style.display="block";
        distanceValueContainer.style.display="block";
            antiMatterElement.style.display="flex";
            infoScreen.style.display="none"
            addStar(100);
            moveSpaceShip();
            createAsteroid();
            mobileControls();
            startDistanceScore();
            createAntiMatterElement()
    })  
}

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

/**This method contains click eventlistner for arrow left and right for mobile which changes the position of spacesphip according,
 * follows the same logic as moveSpaceShip.
 */
function mobileControls() {
    let shipWidth = spaceShip.offsetWidth; // width of the ship
    console.log(shipWidth);

    let screenWidth = window.innerWidth; // gets the width value of the whole screen
    console.log(screenWidth);

    let movementValue = 5; // value to move when a key is pressed

    leftArrow.addEventListener("click", () => {
        let shipLeftPosition = spaceShip.offsetLeft; // gets the initial left position of spaceShip
        console.log(shipLeftPosition);
        if (shipLeftPosition > 0) {
            spaceShip.style.left = `${shipLeftPosition - movementValue}px`;
        }
    });

    rightArrow.addEventListener("click", () => {
        let shipLeftPosition = spaceShip.offsetLeft; // gets the initial left position of spaceShip
        console.log(shipLeftPosition);
        if (shipLeftPosition + shipWidth < screenWidth) {
            spaceShip.style.left = `${shipLeftPosition + movementValue}px`;
        }
    });

}

/* This method uses set interval, runs the code inside it every two second
   which creates an asteroid element using SVG, it creates two svg element, asteroid is the svg container and rock is the rect that is inside asteroid
   Then random height width and  radius is created. Attributes are added to asteroid element and  and its position is set randomly(between 0 and screen width) to left
   Then Atrributes for rext(rock) is added and, the rock element is added to asteroid element, which then is added to the container
*/
function createAsteroid(){

    if(isGameOver)return; //if isGame over true dont create any asteroids

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
     asteroid.setAttribute("width", `${randomRockWidth}`);
     asteroid.setAttribute("height", `${randomRockHeight}`);
     asteroid.setAttribute("viewBox", `0 0 ${randomRockWidth} ${randomRockHeight} `);
     asteroid.style.animation="rotate 5s ease-in infinite"

    
     //random position for svg - random sizes between 0 and windows(screen) width
     asteroid.style.left = `${Math.random() * window.innerWidth}px`;
     asteroid.style.top= "-100px";

     //asteroid rock attributes
     rock.setAttribute("height", `${randomRockHeight}`);
     rock.setAttribute("width", `${randomRockWidth}`);
     rock.setAttribute('fill', 'url(#asteroidGradient1)');
     rock.setAttribute("rx", `${randomRockRadius1}`);
     rock.setAttribute("ry", `${randomRockRadius2}`)
     
   
     asteroid.appendChild(rock); //adds rock element to asteroid(SVG)
     container.appendChild(asteroid); //adds astorid to container element
     asteroidFall(asteroid);
    
    },2000)
}


/**
 * Same logic as creating asteroid, but a cick eventlistner is added to it  which incemremnts the matter value by 1 when clicked,
 * eanitimatter element is created in every 5sec.
 * finally calls antimatterfall method for each anitimatter element
 */
function createAntiMatterElement(){
    setInterval(()=>{
        const antiMatterContainer = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        const antiMatter= document.createElementNS("http://www.w3.org/2000/svg", 'circle');

          //random height,width, and radius for asteroid rock
      let randomFuelHeight = Math.random()*5+30;
      let randomFuelWidth = Math.random()*5+30;
     antiMatterContainer.classList.add("fuel", "svg-responsive");
     antiMatterContainer.setAttribute("width", `${randomFuelWidth}`);
     antiMatterContainer.setAttribute("height", `${randomFuelHeight}`);
     antiMatterContainer.setAttribute("viewBox", `0 0 25 25`);
     antiMatterContainer.style.animation="scaleAnimation 2s ease-in infinite"


     antiMatter.setAttribute("r", "25");
     antiMatter.setAttribute("cx", `${randomFuelHeight}`);
     antiMatter.setAttribute("ry", `${randomFuelWidth}`);
     antiMatter.setAttribute("fill", "green")

     
     //random position for svg - random sizes between 0 and windows(screen) width
     antiMatterContainer.style.left = `${Math.random() * window.innerWidth}px`;
     antiMatterContainer.style.top= "-100px";


     //When an anttimatter is clicked add 1 to the matter value and remove it  
     antiMatterContainer.addEventListener("click", (e)=>{
        console.log("damnFuel");
        let node= e.target
         matterValue+=1;
         updateMatterScore();
         node.parentElement.removeChild(node)
     }) 

     antiMatterContainer.appendChild(antiMatter);
     container.appendChild(antiMatterContainer);
     antiMatterFall(antiMatterContainer)
    },5000) //5 sec
    
}

/**
 * This method makes the asteroid fall by adding falling speed to asteroid top position until each reaches the windows(screen) height
 * and removes the asteroid.
 * The method uses setInterval, in each interval it gets the top position of asteroid , height value of screen  reuns an if lese statment 
 * to check if asteroid top position is greater than windows height if it its it removes the asteroid from the container and stop the interval
 * if not the sets the top position of asteroid by adding top position with falling speed in eac
 * @param {} asteroid 
 */
function asteroidFall(asteroid){
    console.log("Fallllll")
    let asteroidFallSpeed = 2; //fall speed
    if(isGameOver) return;
    const fallInterval = setInterval(()=>{ 
        let eachAsteroidPosition = parseFloat(asteroid.style.top); //gets the top value of asteroid and converts it into float
        if(eachAsteroidPosition > window.innerHeight){ //if the top value is greater than inner height stops the inerval and remove thes the asteroid
            container.removeChild(asteroid);
            clearInterval(fallInterval);
        }else{ //else updates asteroid top value each time by adding fall speed
            asteroid.style.top=`${eachAsteroidPosition+=asteroidFallSpeed}px`
            if(hasCollided(spaceShip,asteroid)){
                gameIsOver();
                clearInterval(fallInterval);
            }
        }
    }, 16)  
}

function antiMatterFall(antiMatterContainer){
  console.log("fueeeel fall");
  let fallSpeed = 3;
  if(isGameOver) return;
  const fuelFallInterval = setInterval(()=>{
       let eachFuelPosition = parseFloat(antiMatterContainer.style.top);
       if(eachFuelPosition > window.innerHeight){
        if(container.contains(antiMatterContainer)){
            container.removeChild(antiMatterContainer)
        }
        clearInterval(fuelFallInterval)
       }else{
         antiMatterContainer.style.top = `${eachFuelPosition+=fallSpeed}px`
       }
  }, 20) 
}


/**
 * This method dispalys the distance travelled by spaceShip,
 * it uses setInterval method which  incremnet the display value by 0.1 and set the score innerHtml to the distance value evey 2 second
 */
 function startDistanceScore(){
    distanceInterval = setInterval(()=>{
         distanceValue+=0.1
         score.innerHTML= " " + distanceValue.toFixed(1) + " LY"; 
    },5000)
    
} 

/**
 * Updates the score by setting innerHTML of antiMatterScore to matterValue
 */
function updateMatterScore(){
    anitMatterScore.innerHTML = matterValue;
}

/**
 * This method stops the interval for distance and fuel
 */
function stopIntervals(){
    clearInterval(distanceInterval);
    clearInterval(fuelInterval)
}



/**
 * This method checks if the asteroid and spaceShip have collided meanin thier positions overlap each other.
 * getBoundingClientRect() is used, it is a javascript method which returens positions(left, right,buttom, and top) and size
 * of an element.
 * there are two parameter spaceShip and asteroid thier positions are extracted using getBoundingClientRect() and a 
 * boolean variable is craeated, if any of the condition meets the value becomes false since !() is used, which means there was no collison,
 * if no condition meets then it means there is a collison the value beacons true.
 * ANd finally the method returns the collison condition
 * @param {*} spaceShip  the spaceShip
 * @param {*} asteroid  the asteroid
 * @returns boolean
 */
function hasCollided(spaceShip, asteroid){
    let theShip = spaceShip.getBoundingClientRect();
    let theAsteroid = asteroid.getBoundingClientRect();
    let collisionCOndition  = !(
         theShip.left > theAsteroid.right ||
         theShip.right < theAsteroid.left ||
         theShip.top > theAsteroid.bottom ||
         theShip.bottom < theAsteroid.top
    );

    return collisionCOndition;
}

/**
 * This is gameoOver method , which displays the game over screen, set isGameOver to true,
 * sets the scoreDetail innerHtml to distanceValue, calls stopDistance() method and
 *  adds an click eventlister to restart button which calls restartGame method
 */
function gameIsOver(){
    isGameOver = true;
    gameOver.style.display = "block";
    scoreDetail.innerHTML = " You traveled " + distanceValue.toFixed(1) + " LY";
    matterDetail.innerHTML = " AntiMatters Collected: " + matterValue 
    restartBtn.addEventListener("click", restartGame);
    stopIntervals();
}


/**
 * This method restarts the game set the isGameOver to false and uses location.reload() method to restart the whole game
 */
function restartGame(){
isGameOver =false;
 location.reload(); //reload the whole page 
}





