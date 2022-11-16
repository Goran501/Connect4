class Game {
    constructor() {
        this.turn = 0;
        this.columns = [...document.getElementsByClassName("column")];
        this.gameBoard = this.fetchBoard();
    }

    fetchBoard() {
        let gameBoardPopulated = new Array;
        for(let i = 0; i < rowLength; i++) {
            gameBoardPopulated[i] = [];
            for(let j = 0; j < columnLength; j++) {
                gameBoardPopulated[i][j] = this.columns[i].children[j];
            }
        }
        return(gameBoardPopulated);
    }

    move(field) {
        let currentColumn = Array.from(this.columns[this.columns.indexOf(field.parentElement)].children);
        let indexOfField;

        //Load first element without a color class assigned
        field = currentColumn.findLast((element) => element.classList.length <= 1);

        //If the above statement did not find an element, the column is either full or empty. 
        //Following check returns if full, and if empty gets the first element of the column.
        if (!field) {
            if(currentColumn[currentColumn.length-1].classList.length == 1) {
                field = currentColumn[currentColumn.length-1];
            }
            else {
                return;
            }   
        }
        field.classList.add(this.turn % 2 ? "Yellow" : "Red");
        indexOfField = [this.columns.indexOf(field.parentElement), [...field.parentElement.children].indexOf(field)];
        this.turn++;

        this.horizontalWinCheck(indexOfField)
        this.verticalWinCheck(indexOfField)
        this.diagonalWinCheck(indexOfField, 'left')
        this.diagonalWinCheck(indexOfField, 'right')
    }
    
    playerWon() {
        setTimeout(() => alert("Win condition reached by " + turnColor[this.turn % 2], 0));
    }

    horizontalWinCheck(indexOfField) {
        let counter = 0;        
        for(let i = 0; i < rowLength; i++) {
            counter = this.gameBoard[i][indexOfField[1]].classList.contains(turnColor[this.turn % 2]) ? counter + 1 : 0;
            if (counter == 4) {
                this.playerWon(this.turn % 2);
                return(true);
            }
        }
    }
    verticalWinCheck(indexOfField) {
        let counter = 0;
        for(let i = 0; i < columnLength; i++) {
            counter = this.gameBoard[indexOfField[0]][i].classList.contains(turnColor[this.turn % 2]) ? counter + 1 : 0;
            if (counter == 4) {
                this.playerWon(this.turn % 2);
                return(true);
            }
        }
    }
    diagonalWinCheck(indexOfField, direction) {
        let counter = 0;
        let xAxis;
        let yAxis = 5;

        switch (direction) {
            case 'left':
                xAxis = (5 - indexOfField[1]) + indexOfField[0];
                break;
            case 'right':
                xAxis = (5 - indexOfField[1] - indexOfField[0]);
                break;
        }
        let maxHeight = xAxis;
        for(let i = 0; i < maxHeight; i++) {
            counter = this.gameBoard[xAxis][yAxis].classList.contains(turnColor[this.turn % 2]) ? counter + 1 : 0;
            if (counter == 4) {
                this.playerWon(this.turn % 2); 
                return(true);
            }
            if(direction == 'left') {
                --xAxis; }
            else {
                ++xAxis; }
            --yAxis
        }
    }
}

const rowLength = 7;
const columnLength = 6;
const turnColor = ["Yellow", "Red"];

currentGame = new Game;