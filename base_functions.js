//
// JQuery Functions for Robby's Cans 
// Base  Functions; generate moveTable, canfield, etc.
// Harshul Sahni- 2017
//
function makeTable() { //make blank table. To be used for final/smartest robot; for show purposes
                var table = $('<table></table>').addClass('table');
                for(i=0; i<10; i++){
                    var row = $('<tr></tr>').addClass('rows');
                    for (a=1; a<11; a++) {
                        var cell = $('<td></td>').addClass(1);
                        row.append(cell);
                    };
                    table.append(row);
                };
                
                $('#here_table').append(table);
};

function generateCanField() { //making of the 10x10 array known as the canField
    var canField = {
        activePosition: [0,0],
        field: [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
                ],
        putCans: function(){ //0-> No can & robby, 1-> can, 2-> robby, 3-> robby and can
            canField.activePosition = [0,0];
            for (a=0; a<10; a++) {
                for (b=0;b<10;b++) {
                    if (a==0 && b==0) {
                        canField.field[a][b] = 2;
                    }
                    else{
                        canField.field[a][b] = 0;
                    };
                    if (canField.doesSpaceGetCan() == true) {
                        canField.field[a][b] += 1;
                    }
                    else{
                        canField.field[a][b] += 0;
                    };
                };
            
            };
        },
        doesSpaceGetCan: function(){ //50% chance that a space in the canField gets a can
            var chanceNum = generateDecimalNumber(0.0, 1.0);
            if (chanceNum < 0.5) {
                return true;
            }
            else{
                return false;
            };
        },
        
        moveUp: function(robot_number){
            if (canField.activePosition[0] > 0) {
                canField.field[canField.activePosition[0]][canField.activePosition[1]] -= 2;
                canField.activePosition[0] -= 1;
                //alert (canField.activePosition);
                canField.field[canField.activePosition[0]][canField.activePosition[1]] += 2;
                return canField.activePosition;
            }
            else{
                //robby hit a wall lol
                population.robots[robot_number].fitness -= 25;
                return false;
            }
        },
        moveDown: function(robot_number){
            if (canField.activePosition[0] < 9) {
                canField.field[canField.activePosition[0]][canField.activePosition[1]] -= 2;
                canField.activePosition[0] += 1;
                //alert(canField.activePosition);
                canField.field[canField.activePosition[0]][canField.activePosition[1]] += 2;
                return canField.activePosition;
            }
            else{
                //robby hit a wall lol
                population.robots[robot_number].fitness -= 25;
                return false;
            }
        },
        moveLeft: function(robot_number){
            canField.field[canField.activePosition[0]][canField.activePosition[1]] -= 2;
            if (canField.activePosition[1] > 0) {
                canField.activePosition[1] -= 1;
                //alert(canField.activePosition);
                canField.field[canField.activePosition[0]][canField.activePosition[1]] += 2;
                return canField.activePosition;
            }
            else{
                //robby hit a wall lol
                population.robots[robot_number].fitness -= 25;
                return false;
            }
            
        },
        moveRight: function(robot_number){
            if (canField.activePosition[1] < 9) {
                canField.field[canField.activePosition[0]][canField.activePosition[1]] -= 2;
                canField.activePosition[1] += 1;
                //alert(canField.activePosition);
                canField.field[canField.activePosition[0]][canField.activePosition[1]] += 2;
                return canField.activePosition;
            }
            else{
                //robby hit a wall lol
                population.robots[robot_number].fitness -= 25;
                return false;
            }
            
        },
        stayPut: function(robot_number){
            return canField.activePosition;
        },
        pickUp: function(robot_number){
            if (canField.field[canField.activePosition[0]][canField.activePosition[1]] > 2) {
                //robby picked a can!!!!
                population.robots[robot_number].fitness += 50;
                canField.field[canField.activePosition[0]][canField.activePosition[1]] -= 1;
            }
            else {
                //robby tried to pick up nothing lol
                population.robots[robot_number].fitness -= 15;
                return false;
            }
        },
        randomMove: function(robot_number){
            var randMove = generateDecimalNumber(0,1);
            if (randMove < (1/6)) {
                canField.moveUp(robot_number);
            }
            else if (randMove > (1/6) && randMove < (2/6)) {
                canField.moveDown(robot_number);
            }
            else if (randMove > (2/6) && randMove < (3/6)) {
                canField.moveLeft(robot_number);
            }
            else if (randMove > (3/6) && randMove < (4/6)) {
                canField.moveRight(robot_number);
            }
            else if (randMove > (4/6) && randMove < (5/6)) {
                canField.stayPut(robot_number);
            }
            else if (randMove > (5/6) && randMove < (6/6)) {
                canField.pickUp(robot_number);
            }
        },
        testIfEmpty: function(){
            var boolean = true;
            for (a=0;a<10;a++) {
                for (b=0;b<10;b++) {
                    if (canField.field[a][b] == 1 || canField.field[a][b] == 3) {
                        boolean = false;
                    };
                };
            };
            return boolean;
        }
        
    };
    
    canField.putCans();
    /*var initialCan = [];
    for (a=0;a<10;a++) {
        initialCan[a] = []; //10x10 array, blank
        for (b=0; b<10;b++) {
            if (canField.field[a][b] > 1) {
                canField.field[a][b] -= 2;
            }
            initialCan[a][b] = canField.field[a][b];
        }
    }*/
    return canField;
}

function generateMoveTable(){
    var moveTable = {
        table: [],
        size: 0,
        decodeMoveTable: function(number){ //change Numbers from the MoveTable into letters
            var character;

            if (number == 0) {
                character = "E"
            }
            else if (number == 1) {
                character = "C"
            }
            else{
                character = "W"
            };
            return character;
        }
    };
    
    for (a=0; a<3; a++) //Yes, you need this many loops to create all the possibilites of the moveTable
    {
      for (b=0; b<3; b++)
      {
        for (c=0; c<3; c++)
        {
          for (d=0; d<3; d++)
          {
            for (e=0; e<3; e++)
            {
                moveTable.table[moveTable.size] = moveTable.decodeMoveTable(a) + moveTable.decodeMoveTable(b) + moveTable.decodeMoveTable(c) + moveTable.decodeMoveTable(d) + moveTable.decodeMoveTable(e);
                moveTable.size += 1;
            };
          };
        };
      };
    };
    
   return moveTable;
};

function makeRobots(size) { //200 robots that will be used; format: population.robots[0] = [0, [genome], 0]
    var population = {
        size: size,
        robots: [],
        makeGenomes: function(){ //Random Genomes for all the robots
            for (a=0; a<population.size; a++) {
                for (b=0; b<243; b++){
                    population.robots[a].genome[b] = generateRandomInt(0,6);
                };
            };
        },
        createOffspring: function(){
            //sort by best fitness = first
            population.robots.sort(compareFitness);
            //make babies
            for (a=0; a<2; a++)
            {
                for (b=0; b<population.size-1; b+=2){
                    var arrayToBeSpliced_Mother = population.robots[b].genome.slice();
                    var arrayToBeSpliced_Father = population.robots[b+1].genome.slice();
                    population.robots[b+a].genome.push(population.mergeGenomes(arrayToBeSpliced_Mother, arrayToBeSpliced_Father));
                };
            };
        },
        mergeGenomes: function(genomeArray_Mother, genomeArray_Father){
            var whichArrayToUse; var offspringGenome = []; var mutationChance; 
            
            whichArrayToUse = generateRandomInt(118,126);
            genomeArray_Mother.splice(whichArrayToUse, 243);
            genomeArray_Father.splice(0, whichArrayToUse);
            offspringGenome = genomeArray_Mother.concat(genomeArray_Father); //splice both genomes at a random point in the string, put them together to create a child
            
            for (mutationNumber=0; mutationNumber<243; mutationNumber++){
                mutationChance = generateDecimalNumber(0, 1);
                if (mutationChance > 0.997){ //0.3% chance of mutation
                    offspringGenome[mutationNumber] = generateRandomInt(0,6);
                };
            };
            return offspringGenome;
        }
    };
    for (a=0; a<population.size; a++) {
        population.robots[a] = {
            number: a,
            genome: [],
            fitness: 0,
            look: function(){
                var moveArray = ""; //Up,Down,Left,Right,Center
                //up
                if (canField.activePosition[0] > 0) {
                    if (canField.field[(canField.activePosition[0]) - 1][canField.activePosition[1]] > 0) {
                        //can
                        moveArray += "C";
                    }
                    else {
                        moveArray += "E";
                    }
                }
                else{
                    moveArray += "W";
                }
                
                //down
                if (canField.activePosition[0] < 9) {
                    if (canField.field[(canField.activePosition[0]) + 1][canField.activePosition[1]] > 0) {
                        //can
                        moveArray += "C";
                    }
                    else {
                        moveArray += "E";
                    }
                }
                else{
                    moveArray += "W";
                }
                //right
                if (canField.activePosition[1] < 9) {
                    if (canField.field[(canField.activePosition[0])][canField.activePosition[1] + 1] > 0) {
                        //can
                        moveArray += "C";
                    }
                    else {
                        moveArray += "E";
                    }
                }
                else{
                    moveArray += "W";
                }
                //left
                if (canField.activePosition[1] > 0) {
                    if (canField.field[(canField.activePosition[0])][canField.activePosition[1] - 1] > 0) {
                        //can
                        moveArray += "C";
                    }
                    else {
                        moveArray += "E";
                    }
                }
                else{
                   moveArray += "W"; 
                }
                //center
                if (canField.field[(canField.activePosition[0])][canField.activePosition[1]] > 2) {
                    moveArray += "C";
                }
                else {
                    moveArray += "E";
                }
                return moveArray;
            },
            move: function(){
                var moveNumber;
                var moveArray = population.robots[a].look();
                    for (genomeNumber=0; genomeNumber<243; genomeNumber++) {
                        if (moveArray == (moveTable.table[genomeNumber])) {
                            //moveNumber = population.genomes[a][genomeNumber];
                            moveNumber = population.robots[a].genome[genomeNumber];
                            break;
                        };
                    };
                if (moveNumber == 0) {
                    canField.moveUp(a);
                }
                else if (moveNumber == 1) {
                    canField.moveDown(a);
                }
                else if (moveNumber == 2) {
                    canField.moveLeft(a);
                }
                else if (moveNumber == 3) {
                    canField.moveRight(a);
                }
                else if (moveNumber == 4) {
                    canField.stayPut(a);
                    return "LOOP";
                }
                else if (moveNumber == 5) {
                    canField.pickUp(a);
                }
                else if (moveNumber == 6) {
                    canField.randomMove(a);
                };
            }
        };
    };
    
    population.makeGenomes();
    return population;
};

function playGame(generation_number) {
    //for x amount of generations
        //for 200ppl
            //for 100 games
                //for 200 moves a game
                    //robot makes a move
                        //*if there's a stayPut() loop, then -500 points
                        //*if canField is empty, add (100 * number of moves left) points, end the game
                        //else, if the robot couldn't clear the board, subtract 10 from total
                //regenerate canField after game
            //average the fitness points up (add and divide by 100) for each person
        //after everything is done, make offspring and restart the game
    
    for (generation=0; generation<generation_number; generation++)
    {
        for (individual=0; individual<population.size; individual++)
        {
            for (game=0; game<100; game++)
            {
                for (move=0; move<200; move++)
                {
                    if (population.robots[individual].move() == "LOOP") {
                        population.robots[individual].fitness -= 500;
                    };
                    if (canField.testIfEmpty == true) {
                        population.robots[individual].fitness += (100* (move - 200));
                        move = 199;
                    }
                    else{
                        population.robots[individual].fitness -= 10;
                    }
                };
                canField.putCans();
            };
            population.robots[individual].fitness =  (population.robots[individual].fitness / 10);
        };
        population.createOffspring();
    };
};
