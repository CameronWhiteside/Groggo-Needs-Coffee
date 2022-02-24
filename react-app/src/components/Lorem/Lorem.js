const Lorem = ({ chars }) => {
    const text = `
    Groggo needs coffee as badly as Cameron Whiteside needs a job, and its your task to fix that.
     Each map begins as a rectangular grid of 2,450 nodes. Each pair of orthogonally and diagonally adjacent nodes are joined by an edge with
     a weight equal to the nodes' distance on screen. You can modify edge weights by adding, editing, and removing features. When finding a path,
     the application generates an adjancency list based on your unique map and animates the node visitation order and shortest path to the coffee shop according
        to Dijkstra's algorithm.
    `
    chars = parseInt(chars)

    return (
        <>
            {text.slice(0,chars)}
        </>
    )

}

export default Lorem
