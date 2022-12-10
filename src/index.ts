import {Vertex, Graph, TraversalProcessFn} from './Graph';

const processFn: TraversalProcessFn = (v) => console.log(v.id);

function buildGraph(): Graph {
    // Define vertices
    const vA = new Vertex('A');
    const vB = new Vertex('B');
    const vC = new Vertex('C');
    const vD = new Vertex('D');
    const vE = new Vertex('E');
    const vF = new Vertex('F');
    const vG = new Vertex('G');
    const vH = new Vertex('H');
    const vI = new Vertex('I');
    // Build relationships
    vA.addChild(vB);
    vA.addChild(vC);
    vA.addChild(vD);

    vB.addChild(vE);
    vB.addChild(vA);
    vB.addChild(vC);

    vC.addChild(vB);
    vC.addChild(vA);
    vC.addChild(vD);
    vC.addChild(vF);

    vD.addChild(vA);
    vD.addChild(vC);
    vD.addChild(vG);

    vE.addChild(vB);

    vF.addChild(vC);
    vF.addChild(vI);

    vG.addChild(vC);
    vG.addChild(vD);
    vG.addChild(vH);

    vH.addChild(vG);

    vI.addChild(vF);

    // Initialize graph
    const graph = new Graph();
    for (const v of [vA, vB, vC, vD, vE, vF, vG, vH, vI]) {
        graph.addVertex(v);
    }

    return graph;
}

async function main() {
    const graph = buildGraph();

    console.log('--- DEPTH FIRST TRAVERSAL ---');
    graph.depthFirstTraversal('A', processFn);
    console.log('--- END ---');

    console.log('--- BREADTH FIRST TRAVERSAL ---');
    graph.breadthFirstTraversal('A', processFn);
    console.log('--- END ---');
}

main()
    .then(() => {
        console.log('Program finished.');
        return process.exit(0);
    })
    .catch((error: Error) => {
        console.log('Program exited with an error.');
        console.error(error);
        process.exit(1);
    });
