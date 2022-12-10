import {Storage} from "./Storage";

export class Queue<T> extends Storage<T>{
    constructor(initial: Array<T> = []) {
        super(initial);
    }

    public next(): T|null {
        return this.data.shift() ?? null;
    }
}
