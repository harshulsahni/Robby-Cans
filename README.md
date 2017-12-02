# Robby-Cans
Genetic Algorithm that finds the most efficient way to collect cans in a 10x10 field. Created by Harshul Sahni, but inspired by Melanie Mitchell's <i>Complexity: A Guided Tour </i>(chapter 6, to be exact).
##  Introduction
Robby is a robot that is forever stuck in a 10x10 field. His only job in life is to pick up cans, and find the most efficient way to do so. In a 10x10 field of randomly scattered cans, Robby can only move: up,down,left,right,stay put, or pick up can. I have designed a genetic algorithm to help Robby find the quickest way to pick up all of these cans in the least amount of moves. 
## Code
I will use an evolutionary algorithm, just like the one in the book I described above. 
I will generate 200 robots, each very dumb, and will play 100 games with each. 
Each robot will have a "genome." In this case, this genome will consist of 243 random integers from 0-6. <br/>
- 0: Move Up 
- 1: Move Down
- 2: Move Left
- 3: Move Right
- 4: Stay Put
- 5: Pick Up
- 6: Random Move from 0-5
### Note: where does 243 come from? 
243 comes from 243 different scenarios the robot can encounter when it is looking around. It can see a wall, empty space, or a can. And it can look at 5 different spaces at once (left, right, up, down, center), so it can see 3^5 or 243 different possible combinations. Each combination of wall, can, or empty space is then randomly linked with an integer (move). For example, `var moveList = {C,W,E,C,C}` would mean a robot has a can to the left of it, a wall to the right of it, an empty space above it, a can below it, and a can in the center (the space the robot is on). All `moveList` arrays follow the order of `{left, right, up, down, center}`. Then, each scenario is linked to a random move. There is a table that has all of these scenarios and has assigned a number to them. For example, lets say `CWECC` was 75 out of 243 on the move table. Then, the program tells the robot to look at the 75th integer on its genome and move according to that. So, if `genome(75)` was 2, then the robot would "move left". These moves start out as random assignments, but will develop as the algorithm goes on. 
### Games
For ever game, the robot gains points if it picks up a can and completes a game by picking up all the cans. It loses points if it hits a wall (move left when there is a wall on the left), picks up nothing (pick up on an empty space), or does not complete the game with all cans picked up. In the intial 200 robots, the scores will be terribly low since the robots have random move assignments for each situation. But, a couple robots will be a little better than the others. Let's say one robot accidentally does pick up a can. Yay!! This robot has gained points, and will become the cream of the crop (comparitively to the other robots, who keep running into walls). At the end of all of the generation's games, the robots will create offpspring. The best robots will create offsrping together, and will each contribute to half of the genome, while the worst ones will die and not reproduce. As you can see, the new generation will be better than the older one. After enough generations, the robots will "learn" through natural selection that picking up cans is favorable, running into walls is not favorable, etc. 
## Conclusion 
In her novel, Mitchell found that after a good amount of generations, the robots were outperforming even her man-made algorithm for picking up cans. The robots used techniques that Mitchell never even would have thought about, such as not picking up a can when the robot is on it as part of a strategy to get one far away and come back to this can later. In conclusion, genetic algorthims and simulations such as these can result in never-before thought of ways to conquer specific problems and tasks. 
