export abstract class Storage<T> {
    protected data: Array<T>;

    protected constructor(initial: Array<T> = []) {
        this.data = initial;
    }

    public abstract next(): T|null;

    public add(element: T): void {
        this.data.push(element);
    }

    public empty(): boolean {
        return this.data.length === 0;
    }
}
