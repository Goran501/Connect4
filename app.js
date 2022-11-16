class Game {
    constructor() {
        this.turn = 0;
        this.turnColor = ["colorYellow", "colorRed"]
        this.columns = [...document.getElementsByClassName("column")];
    }

    move(field) {
        let fieldToChange = field;
        let currentColumn = this.columns[this.columns.indexOf(field.parentElement)].children

        for (let i = currentColumn.length - 1; i > 0; i--) {
            if (!(currentColumn[i].classList.contains("colorYellow") || currentColumn[i].classList.contains("colorRed"))) {
                fieldToChange = currentColumn[i];
                break;
            }
        }
        if (fieldToChange.classList.contains("colorYellow") || fieldToChange.classList.contains("colorRed")) {
            return;
        }
        fieldToChange.classList.add(this.turn % 2 ? "colorYellow" : "colorRed")
        this.turn++;

        this.winCheck(fieldToChange, currentColumn);
    }
//TODO clean up messy code and add diagonal check
    winCheck(field, currentColumn) {
        let counter = 0;
        let index = [...field.parentElement.children].indexOf(field);

        console.log(this.columns[currentColumn.length - 1].children[index])
        for (let i = currentColumn.length - 1; i > 0; i--) {
            if (currentColumn[i].classList.contains(this.turnColor[this.turn % 2])) {counter++;}
            else {counter = 1;}
            if (counter == 4) {this.playerWon(this.turn % 2); return}
        }
        counter = 0;
        for (let i = field.parentElement.children.length; i > 0; i--) {
            if (this.columns[i].children[index].classList.contains(this.turnColor[this.turn % 2])) {counter++;}
            else {counter = 1;}
            if (counter == 4) {this.playerWon(this.turn % 2); return}
        }

    }

    playerWon() {
        console.log("Win condition reached");
    }
}
//     //column
//     console.log(fields.indexOf(element.parentElement) + 1);
//     //row
//     console.log([...element.parentElement.children].indexOf(element) + 1);
currentGame = new Game;
