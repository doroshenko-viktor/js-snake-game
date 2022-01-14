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

  /**
   * Get next element and remove it from the queue
   * @returns element of generic type T
   */
  dequeue(): T | null {
    if (this._head) {
      const result = this._head.value;
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
