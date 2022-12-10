import {Storage} from "./Storage";

export class Stack<T> extends Storage<T>{
    constructor(initial: Array<T> = []) {
        super(initial);
    }

    public next(): T|null {
        return this.data.pop() ?? null;
    }
}
