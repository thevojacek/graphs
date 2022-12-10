import {Storage} from './storage/Storage'
import {Stack} from './storage/Stack';
import {Queue} from './storage/Queue';

export type TraversalProcessFn = (v: Vertex) => void;

export class Vertex {
    public readonly id: string;
    private childVertices: Array<Vertex>;

    constructor(id: string, initial: Array<Vertex> = []) {
        this.id = id;
        this.childVertices = initial;
    }

    get children() {
        return [...this.childVertices];
    }

    public addChild(child: Vertex): void {
        this.childVertices.push(child);
    }

    public *iterate(): Generator<Vertex> {
        let current = 0;
        let next = 1;
        while (current < this.childVertices.length) {
            const reset = yield this.childVertices[current];
            current++;
            next++;
            if (reset) {
                current = 0;
                next = 1;
            }
        }
    }
}

export class Graph {
    public readonly vertices: Array<Vertex> = [];

    private traversal(fn: TraversalProcessFn, store: Storage<Vertex>): void {
        const traversedIds: Array<string> = [];
        while(!store.empty()) {
            const next = store.next();
            if (!next) break;
            if (traversedIds.includes(next.id)) continue;
            for (const v of next.iterate()) {
                store.add(v);
            }
            traversedIds.push(next.id);
            fn(next);
        }
    }

    public depthFirstTraversal(start: string, fn: TraversalProcessFn): void {
        const startVertex = this.getVertex(start);
        if (!startVertex) return;
        const stack = new Stack([startVertex]);
        this.traversal(fn, stack);
    }

    public breadthFirstTraversal(start: string, fn: TraversalProcessFn): void {
        const startVertex = this.getVertex(start);
        if (!startVertex) return;
        const queue = new Queue([startVertex]);
        this.traversal(fn, queue);
    }

    public addVertex(vertex: Vertex): void {
        if (!this.getVertex(vertex.id)) {
            this.vertices.push(vertex);
        }
    }

    public getVertex(id: string): Vertex|null {
        const vertex = this.vertices.find((v: Vertex) => v.id === id);
        return vertex ?? null;
    }
}
