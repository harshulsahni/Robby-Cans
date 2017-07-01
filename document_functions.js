//
//JQuery Functions for Robby's Cans 
// Functions on the Document to test & start the Robby Program
//Harshul Sahni- 2017
//

$("#MOVEUP").click(function(){
    canField.moveUp(0);
});

$("#MOVED").click(function(){
    canField.moveDown(0);
});

$("#MOVEL").click(function(){
    canField.moveLeft(0);
});

$("#MOVER").click(function(){
    canField.moveRight(0);
});

$("#alertarray").click(function(){
    for (a=0;a<10;a++) {
        for (b=0;b<10;b++){
            if (canField.field[a][b] > 1) {
                alert("Your can is at " + a + " , " + b);
            };
        };
    };
});

$("#PICK").click(function(){
    canField.pickUp(0);
});

$("#look").click(function(){
    //robby.look();
});

$("#robbyMove").click(function(){
    //robby.move(population.genomes[0]);
});

$("#playGame").click(function(){
    playGame(10);
    console.log(population.fitness);
});

$("#testing").click(function(){
    alert(makePGeneration().genomes[200][224]);
});