// Historical record of all moves and their previous moves
const registeredMoves = new Map();

// Attached to a move is the ability to:
    // view/set their previous move (Parent list)
    // generate possible move （to be Queued)
    // fetch from registered moves if exist (Visted list)
const move = (x,y) => {
    let prev;
    const getPrev = () => prev;
    const setPrev = (newPrev) => {prev ||= newPrev};

    const MOVESET = [
        [1, 2], [2, 1],
        [-1,2], [-2,1],
        [1,-2], [2,-1],
        [-1,-2], [-2,-1]
    ]

    const name = () => `[${x}, ${y}]`

    const createMoves = () => {
        return MOVESET.map(generateMoves).filter(Boolean)
    }

    const generateMoves = ([xOffset, yOffset]) => {
        const [newX, newY] = [x + xOffset, y + yOffset];
        if(0 <= newX && newX < 8 && 0 <= newY && newY < 8){
            return move(newX, newY)
        }
    }

    if (registeredMoves.has(name())) {
        return registeredMoves.get(name())
    } else {
        const newMove = {name,createMoves,getPrev,setPrev}
        registeredMoves.set(name(), newMove)
        return newMove
    }
}

// Function to create two moves
// Look thorugh all possibility from final to reach beginning
    // Queue all possibility if haven't found whilst marking their prev
// With all previous moves recorded, extract the fastest path from beginning -> end from the last prev record
function knightTravails(start,end){
    registeredMoves.clear();

    const beginning = move(...start);
    const final = move(...end);

    const queue = [final];
    while(!queue.includes(beginning)){
        const current = queue.shift();

        const nextMove = current.createMoves();
        nextMove.forEach(element => element.setPrev(current))
        queue.push(...nextMove);
    }

    const path = [beginning]
    while(!path.includes(final)){
        const next = path.at(-1).getPrev()
        path.push(next)
    }

    console.log(`The shortest path was ${path.length - 1} moves!`)
    console.log('The moves were:')
    path.forEach((node) => console.log(node.name()))
}

knightTravails([1,1],[3,4])