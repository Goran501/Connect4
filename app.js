class Game {
    constructor() {
        this.turn = 0;
        this.columns = [...document.getElementsByClassName("column")];
        this.gameBoard = this.fetchBoard();
    }

    fetchBoard() {
        let gameBoardPopulated = [];
        for(let i = 0; i < ROWLENGTH; i++) {
            gameBoardPopulated[i] = [];
            for(let j = 0; j < COLUMNLENGTH; j++) {
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

        //Add so checks are made only is there are neighbouring fields with the same class, depending on direction different methods will be called
        this.horizontalWinCheck(indexOfField)
        this.verticalWinCheck(indexOfField)
        this.diagonalWinCheck(indexOfField, 'left')
        this.diagonalWinCheck(indexOfField, 'right')
    }
    
    //Will utilize the score board once it's made instead
    playerWon() {
        setTimeout(() => alert("Win condition reached by " + turnColor[this.turn % 2], 0));
    }

    horizontalWinCheck(indexOfField) {
        let counter = 0;        
        for(let i = 0; i < ROWLENGTH; i++) {
            counter = this.gameBoard[i][indexOfField[1]].classList.contains(turnColor[this.turn % 2]) ? counter + 1 : 0;
            if (counter == 4) {
                this.playerWon(this.turn % 2);
                return(true);
            }
        }
    }
    verticalWinCheck(indexOfField) {
        let counter = 0;
        for(let i = 0; i < COLUMNLENGTH; i++) {
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
        let yAxis;
        let maxHeight;

        switch (direction) {
            case 'left':
                if ((indexOfField[0] - indexOfField[1]) >= 2) {
                    xAxis = 6;
                    yAxis = indexOfField[1] + (xAxis - indexOfField[0]);
                    maxHeight = xAxis - indexOfField[0];
                } 
                else {
                    yAxis = 5;
                    xAxis = indexOfField[0] + (yAxis - indexOfField[1]);
                    maxHeight = xAxis;
                }
                break;
            case 'right':
                if ((indexOfField[0] + indexOfField[1]) <= 5) {
                    xAxis = 0;
                    yAxis = indexOfField[0] + indexOfField[1];
                    maxHeight = yAxis;
                } 
                else {
                    yAxis = 5;
                    xAxis = indexOfField[0] - (yAxis - indexOfField[1])
                    maxHeight = Math.abs(xAxis - ROWLENGTH);
                }
                break;
        }
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
            --yAxis;
        }
    }
}

const ROWLENGTH = 7;
const COLUMNLENGTH = 6;
const turnColor = ["Yellow", "Red"];

currentGame = new Game;