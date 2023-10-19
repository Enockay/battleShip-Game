const grid = document.getElementById("grid");
const grid2 = document.getElementById("Grid");


function generateGrid(grid) {
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("tr");
      const header = document.createElement("td");
      header.textContent = String.fromCharCode(65 + i);
      row.appendChild(header);
  
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("td");
        cell.classList.add("class");
  
        // Generate the data-id attribute corresponding to the cell's textContent
        const dataId = `${String.fromCharCode(65 + i)}${j + 1}`;
        cell.setAttribute("data-id", dataId);
  
        cell.textContent = `${j + 1}${String.fromCharCode(65 + i)}`;
        row.appendChild(cell);
      }
      grid.appendChild(row);
    }
}


generateGrid(grid);

function generateAIGrid(grid){
    for(let i = 0;i < 10; i++){
        const row = document.createElement("tr");
        const header = document.createElement("td");
        header.textContent = String.fromCharCode(65 +i);
        row.appendChild(header);
        
        for(let j = 0; j < 10; j++){
            const cell = document.createElement("td");
            cell.classList.add("player")

            const dataId = `${j + 1}${String.fromCharCode(65 + i)}`;
            cell.setAttribute("data-id", dataId);
            
            cell.textContent =`${j+1}${String.fromCharCode(i + 65)}`;
            row.appendChild(cell);
        }
        grid.appendChild(row);
        
    }
};
generateAIGrid(grid2)



//table arrays to be used
  const playerGameBoard = [];
  const AIgameBoard = [];

  //red flag to check possibility of adding an item
  let canAdd = true;

  //take grid to add Event listeners
  let table = document.querySelectorAll('.class');
  let AItable = document.querySelectorAll(".player");

  //rows that the computer will produce randomly
  let numRows = 10;
  let numCols =  10;
  let clickCount = 0;

  //check the length of the array now
  const maximumArray = 10 // Adjust the number of columns as needed
  
  const computerCodes = document.getElementById("para");
  function createShip(grid1) {
    grid1.forEach((item) => {
      item.addEventListener("click", () => {
        let itemId = item.textContent;
        if (playerGameBoard.includes(itemId)) {
          alert("Cannot place a ship part in the same cell as an existing ship part.");
        } else {
          designShipLength(item, itemId);
        }
      });
    });
  }
  
  function designShipLength(item, itemId) {
    let shipParts = playerGameBoard.length;
    if (shipParts < maximumArray) {
      playerGameBoard.push(itemId);
      item.style.backgroundColor = "blue";
      item.style.borderRadius = "0.5rem";
    } else {
      canAdd = false;
      alert("Maximum ship parts reached.");
    }
  }
  
  // Function to place the computer's ships on the board
  function placeComputerShips() {
    const computerShipSizes = [5, 4, 3, 3, 2];
    let totalComputerShips = 0;
  
    for (const size of computerShipSizes) {
      for (let i = 0; i < size; i++) {
        if (totalComputerShips < 10) {
          let shipPlaced = false;
          while (!shipPlaced) {
            const randomRow = Math.floor(Math.random() * numRows);
            const randomCol = Math.floor(Math.random() * (numCols - size + 1));
  
            // Generate consecutive ship parts in a row
            const shipParts = [];
            for (let j = 0; j < size; j++) {
              shipParts.push((randomCol + j + 1) + String.fromCharCode(65 + randomRow));
            }
  
            // Check if all parts are available
            if (shipParts.every(part => !AIgameBoard.includes(part))) {
              AIgameBoard.push(...shipParts);
              shipPlaced = true;
              totalComputerShips += size;
            }
          }
        } else {
          break; // Stop placing ships when a total of 10 parts are placed
        }
      }
    }
  
    //display possible computer codes;
    computerCodes.textContent = `${AIgameBoard[0]}....${AIgameBoard[9]}`
    // Give a background color to the AI's ship parts
   /* AIgameBoard.forEach(itemId => {
      const cell = table.find(item => item.getAttribute("data-id") === itemId);
      cell.style.backgroundColor = "red";
      cell.style.borderRadius = "0.5rem";
    });
    */
  }
  console.log(AIgameBoard);
  console.log(playerGameBoard);
  // Example usage:
  createShip(table);
  placeComputerShips();

  //object to facilitate the movement of the object
  let operation={
    shoot(gameBoard,data,itemCell){
    if(gameBoard.includes(data)){
    // let newGameBoard = gameBoard.filter(item => item !== data);
        gameBoard.pop(data);
       // itemCell.style.backgroundColor = "red";
    }
   },
   //check length;
    shipLength(newGameBoard,player){
   let length = newGameBoard.length;
   if(length <= 0){
     return `${player}, Ship sunk Down`
   }
   }
 }
 


  //play the game now ;
   function playerPick(grid){
        grid.forEach(function(item) {
        item.addEventListener("click", () => {
          playerMove();
          incrementClickCount();
        let removed = item.textContent;
           decideShoot(removed,item);
  })})
}
let execute = playerPick(AItable);

 
//check the players board ;
function playerMove(){
  let playerGame = playerGameBoard.length;
  if(playerGame === 0 || playerGame < 10){
    alert("form your ship first before you start play");
  }else{
    execute = false;
  }
}

 //decide the player shoot first
    function decideShoot(removedItem,item){
      let itemPresent = AIgameBoard.includes(removedItem);
      if(itemPresent){
         operation.shoot(AIgameBoard,removedItem,itemPresent);
          removeItemFromAI(AIgameBoard,itemPresent);
          let newArray = AIgameBoard;
         checkWinner(newArray);
         numberOfShoots(removedItem,item);
         alert("its a nice shot!")
        
      }else if(item !== itemPresent){
        alert("missile missed the target try again");
      }
      }
     

  function checkWinner(newArray){
    let numberItem = newArray.length;
    if(numberItem === 0){
      alert(`player Won`)
    }
  };

  //function to remove specific item from the AIgameBoard;
  function removeItemFromAI(arr,data){
    let newItem = data.toString();
    let index = arr.indexOf(data);
    let newArray = arr.filter(item => item !==  newItem);
    console.log(newArray);
  }

  
   function clearPlayerShip(item){
      playerGameBoard.splice(0,playerGameBoard.length);
      removeBackground(item)
  }

  let shoot = 0;

  function incrementClickCount(){
      shoot ++;
      console.log(shoot);
      numberOfShoots(shoot);
   return shoot
  }


function numberOfShoots(shoot,item){
 
      if(shoot === 12){
         removeClick;
          clearPlayerShip(item);
          alert('AI KILLED YOU RESTART THE GAME');
    }else if(shoot === 5){
      alert("you are remaining with only 5 shoots")
    }
  }

//function remove the grid click
function removeClick(){
  let ans = AItable.forEach((item)=>item.removeEventListener('click'));
  return ans;
}

function removeBackground(item){
  return item.style.backgroundColor = "white";
}



