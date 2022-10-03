/*
 * Battleships is a game played on a rectangular board. You are given a
 * representation of such a board of size N (height) x M (width) with
 * information about the locations of the ships.
 *
 * The board is given as an array B, whose every element is a string that
 * corresponds to one row of the game board. Each character of each string
 * represents a cell of the board and is either:
 *
 *  - a '#' character, marking a part of a ship; or
 *  - a '.' character, representing an empty cell
 *
 * Two cells that share a same side and have a value of '#' are parts of the
 * same ship. Cell (X,Y) shares a side with cells (X, Y-1), (X, Y+1), (X-1, Y)
 * and (X+1, Y).
 *
 * In the Battleships game there are three types of ships:
 *
 * Patrol Boats of size 1:
 *
 * ...
 * .#.
 * ...
 *
 * Submarines of size 2, which come in two shapes:
 *
 * ......
 * ....#.
 * .##.#.
 * ......
 *
 * Destroyers of size 3, which come in six shapes:
 *
 * ........................
 * .###..#..##..##..#....#.
 * ......#..#....#..##..##.
 * ......#.................
 * ........................
 *
 * Your task is to find the number of ships of each type ocurring on the board.
 */

function solution(B) {
    var patrols = 0, submarines = 0, destroyers = 0

    function scan(x, y) {
        cells = []

        function found(x, y) {
            if (x >= 0 && x < B.length && y >= 0 && y < B[x].length && B[x][y] == '#')
                return cells.push({x: x, y: y})
        }

        if (found(x, y))
            for (adj of [[0,-1], [-1,0], [0,1], [1,0]])
                if (found(x + adj[0], y + adj[1]) == 3) break

        return cells
    }


    for (x = 0; x < B.length; x++) {
        for (y = 0; y < B[x].length; y++) {

            boat = scan(x, y)

            if (boat.length == 1) patrols++
            if (boat.length == 2) {
                boat = scan(boat[1].x, boat[1].y)
                if (boat.length == 2) submarines++

            }
            if (boat.length == 3) destroyers++

            for (cell of boat)
                B[cell.x] = B[cell.x].replace(new RegExp('^(.{' + cell.y + '}).(.*)$'), '$1O$2')
        }
    }

    return [patrols, submarines, destroyers]
}

function printBoard(board) {
    for (line of board) print(line.replace(/(.)/g, "$1 "))
}

function genBoard(minwidth, maxwidth, minheight, maxheight, boat_chance) {
    width = Math.floor(Math.random() * (maxwidth - minwidth + 1) + minwidth)
    height = Math.floor(Math.random() * (maxheight - minheight + 1) + minheight)
    
    board = []
    for (r = 0; r < height; r++) {
        row = ''
        for (c = 0; c < width; c++)
            row += (Math.floor(Math.random() * ((width * height) - 1) + 1) > (width * height) * (boat_chance / 10)) ? "." : "#"

        board.push(row)
    }

    return board
}

function game(board) {
    print("BOARD:")
    printBoard(board)
    print("\nSOLUTION: " + solution(board))
    printBoard(board)
    print("------------------------------------------------------------")    
}

function test(games = 1, minwidth = 5, maxwidth = 0, minheight = 0, maxheight = 0) {
    while (games--)
        game(genBoard(minwidth, maxwidth || minwidth, minheight || minwidth, maxheight || minwidth, 4))
}

t1 = ['.##.#',
      '#.#..',
      '#...#',
      '#.##.']

t2 = ['....#',
      '#..##',
      '....#',
      '##..#',
      '####.']

t3 = ['##.#.', 
      '.#.##',
      '.#.#.', 
      '#..##',
      '#..#.']

t4 = ['##...',
      '..#.#',
      '###.#',
      '...##',
      '#.###']

//game(t1)
test(10)
