const Lorem = ({ chars }) => {
    const text = `
    Groggo needs coffee as badly as Cameron Whiteside needs a job, and its your task to fix that.
     Each map consists of a 70 x 35 grid of nodes, with the weight of adjacent nodes being equal to their distance on screen.
     You can modify edge weights by adding, editing, and removing features. When searching for a path,
     the application will generate an adjancency list based on your unique map and animate the node visitation order and shortest path to the coffee shop according
     calculated with Dijkstra's algorithm.
    `
    chars = parseInt(chars)

    return (
        <>
            {text.slice(0,chars)}
        </>
    )

}

export default Lorem
