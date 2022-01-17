import Cell from '../models/shapes/cell';

/**
 * Node of the queue, containing value and links to the next and previous node
 */
class QueueNode<T> {
  constructor(
    public readonly value: T,
    public next?: QueueNode<T> | null,
    public previous?: QueueNode<T> | null
  ) {}
}

/**
 * Simple queue with possibility to add elements to the end of the queue
 * and retrieve elements from the beginning of the queue
 */
class Queue<T> {
  private _head: QueueNode<T> | null = null;
  private _tail: QueueNode<T> | null = null;
  private _length = 0;

  constructor(items?: T[]) {
    if (items && items.length > 0) {
      items.forEach((item) => this.enqueue(item));
    }
  }

  /**
   * Get current length of the queue
   */
  get length() {
    return this._length;
  }

  getTail(): T | null {
    return this._tail?.value ?? null;
  }

  /**
   * Get next element and remove it from the queue
   * @returns element of generic type T
   */
  dequeue(): T | null {
    if (this._head) {
      const result = this._head.value;
      this._head = this._head.next ?? null;
      this._length--;
      return result;
    }
    return null;
  }

  /**
   * Add value to the end of the queue
   * @param value generic T value
   */
  enqueue(value: T) {
    this._tail ? this._addNewTail(value) : this._addFirstNode(value);
    this._length++;
  }

  /**
   * Check if element with some condition exists inside of the queue
   * @param predicate - function, checking condition of contained element
   * @returns boolean true if satisfying element exists in queue and false in opposite case
   */
  contains(predicate: (value: T) => boolean): boolean {
    let current = this._head;
    while (current !== null) {
      if (predicate(current.value)) {
        return true;
      }
      current = current.next ?? null;
    }
    return false;
  }

  /**
   * Convert to array of T elements
   * @returns
   */
  toArray(): T[] {
    const resultArray: T[] = [];
    let current = this._head;
    while (current) {
      resultArray.push(current.value);
      current = current.next as QueueNode<T> | null;
    }
    return resultArray;
  }

  /**
   * Add value as next to existing tail
   * @param value T
   */
  private _addNewTail(value: T) {
    const newNode = new QueueNode(value, null, this._tail);
    if (this._tail) {
      this._tail.next = newNode;
    }
    this._tail = newNode;
  }

  /**
   * Add value to an empty queue
   * @param value T
   */
  private _addFirstNode(value: T) {
    this._head = new QueueNode(value, null, null);
    this._tail = this._head;
  }
}

export default Queue;
