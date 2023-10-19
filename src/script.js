let operation={
   shoot(gameBoard,data,item){
   if(gameBoard.includes(data)){
    let newGameBoard = gameBoard.filter(item => item !== data);
    item.style.backgroundColor = "red";
     return newGameBoard;
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



