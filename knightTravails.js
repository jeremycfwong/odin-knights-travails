const board = new Map();

const move = (x,y) => {
    let previousMove;

    const MOVESET = [ 
                    [ 1,  2], [ 2, 1],
                    [-1,  2], [-2, 1],
                    [ 1, -2], [ 2,-1],
                    [-1, -2], [-2,-1]
                    ];
    
    const getPrev = () => previousMove;
    const setPrev = (newPrev) => {previousMove ||= newPrev}

    const name = () => `[${x}, ${y}]`
    const createKnightMoves = () => {
        return MOVESET.map(newSquareGen).filter(Boolean);
    }

    const newSquareGen = ([xOffset, yOffset]) => {
        const [newX, newY] = [x + xOffset, y + yOffset];
        if (0 <= newX && newX < 8 && 0<= newY && newY <8) {
            return move(newX,newY)
        }
    }

    if(board.has(name())) {
        return board.get(name());
    } else {
        const newSquare = {name, getPrev, setPrev, createKnightMoves}
        board.set(name(), newSquare)
        return newSquare
    }
}



function knightTravails(start, end){
    board.clear();

    const from = move(...start);
    const target = move(...end);

    const queue = [target];
    while(!queue.includes(from)) {
        const current = queue.shift()

        const nextList = current.createKnightMoves();
        nextList.forEach(element => element.setPrev(current));
        queue.push(...nextList);
    }

    const path = [from]
    while(!path.includes(target)){
        const next = path.at(-1).getPrev();
        path.push(next)
    }

    console.log(`The shortest path was ${path.length - 1} moves!`);
    console.log("The moves were:");
    path.forEach(square => console.log(square.name()));
}

knightTravails([1,1],[7,6]);