import Queue from './queue';

describe('linked list tests', () => {
  it('should create empty linked list', () => {
    const list = new Queue<number>();
    expect(list.length).toBe(0);
  });

  it('should create linked list with one element', () => {
    const list = new Queue<number>([1]);
    expect(list.length).toBe(1);
  });

  it('should create linked list with several elements', () => {
    const list = new Queue<number>([1, 2, 3, 4, 5]);
    expect(list.length).toBe(5);
  });

  it('should enqueue, when queue is empty', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    expect(queue.length).toBe(1);
  });

  it('should enqueue, when queue is not empty', () => {
    const queue = new Queue<number>([1]);
    queue.enqueue(2);
    expect(queue.length).toBe(2);
  });

  it('should enqueue, when queue contains many elements', () => {
    const queue = new Queue<number>([1, 2, 3, 4, 5]);
    queue.enqueue(6);
    expect(queue.length).toBe(6);
  });

  it('should enqueue, when queue is not empty', () => {
    const queue = new Queue<number>([1]);
    queue.enqueue(2);
    expect(queue.length).toBe(2);
  });

  it('should dequeue and return null, when empty queue', () => {
    const queue = new Queue<number>();
    const result = queue.dequeue();
    expect(result).toBeNull();
  });

  it('should dequeue, when queue is not empty', () => {
    const queue = new Queue<number>([1]);
    const result = queue.dequeue();
    expect(result).toBe(1);
  });

  it('should dequeue, when queue is empty and length should be 0', () => {
    const queue = new Queue<number>();
    queue.dequeue();
    expect(queue.length).toBe(0);
  });

  it('should dequeue, when queue is not empty and length should decrease', () => {
    const queue = new Queue<number>([1, 2, 3]);
    queue.dequeue();
    expect(queue.length).toBe(2);
  });
});
