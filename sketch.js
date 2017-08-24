var w = 20;
var cols, rows;
var grid = [];
var disjointSet = new DisjointSet();
var walls = [];

function setup() {
    createCanvas(400, 400);

    cols = floor(width / w);
    rows = floor(height / w);

    for(var y = 0; y < rows; y++) {
        for(var x = 0; x < cols; x++) {
            var cell = new Cell(x, y);
            cell.index = grid.length;
            disjointSet.add(cell.index);
            grid.push(cell);
        }
    }

    for(var y = 0; y < rows; y++) {
        for (var x = 0; x < cols - 1; x++) {
            var wall = new Wall(index(x, y), index(x + 1, y));
            walls.push(wall);
        }
    }

    for(var x = 0; x < cols; x++) {
        for (var y = 0; y < rows - 1; y++) {
            var wall = new Wall(index(x, y), index(x, y + 1));
            walls.push(wall);
        }
    }

    disjointSet.show();
}

function draw() {
    background(51);

    for(var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    if(walls.length > 0) {
        var randomWall = chooseWall();

        if(!disjointSet.connected(randomWall.cell1Index, randomWall.cell2Index)) {
            var cell1 = grid[randomWall.cell1Index];
            var cell2 = grid[randomWall.cell2Index];

            removeWall(cell1, cell2);
            disjointSet.union(randomWall.cell1Index, randomWall.cell2Index);
        }
    } else {
        console.log('DONE!!!!');
    }
}

function removeWall(cell1, cell2) {
    var x = cell1.x - cell2.x;
    if(x === 1) {
        cell1.walls[3] = false;
        cell2.walls[1] = false;
    } else if (x === -1) {
        cell1.walls[1] = false;
        cell2.walls[3] = false;
    }

    var y = cell1.y - cell2.y;
    if(y === 1) {
        cell1.walls[0] = false;
        cell2.walls[2] = false;
    } else if (y === -1) {
        cell1.walls[2] = false;
        cell2.walls[0] = false;
    }
}

function chooseWall() {
    var r = floor(random(0, walls.length));

    return _.pullAt(walls, r)[0];
}

function index(x, y) {
    return x + y * cols;
}

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.index = undefined;
    this.walls = [true, true, true, true];

    this.show = function () {
        stroke(255);
        var x = this.x * w;
        var y = this.y * w;
        if(this.walls[0]) {
            line(x, y, x + w, y);
        }

        if(this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }

        if(this.walls[2]) {
            line(x + w, y + w, x , y + w);
        }

        if(this.walls[3]) {
            line(x, y + w, x , y);
        }
    }
}

function Wall(cell1Index, cell2Index) {
    this.cell1Index = cell1Index;
    this.cell2Index = cell2Index;
}