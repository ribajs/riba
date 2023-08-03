// Port of lower_bound from http://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion index to keep queue sorted after insertion
export function lowerBound(array: any, value: any, comp: any) {
  let first = 0;
  let count = array.length;

  while (count > 0) {
    const step = (count / 2) | 0;
    let it = first + step;

    if (comp(array[it], value) <= 0) {
      first = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }

  return first;
}

export class PriorityQueue {
  private _queue: Array<any>;

  constructor() {
    this._queue = [];
  }

  public enqueue(run: any, options: any) {
    options = Object.assign(
      {
        priority: 0,
      },
      options,
    );

    const element = { priority: options.priority, run };

    if (this.size && this._queue[this.size - 1].priority >= options.priority) {
      this._queue.push(element);
      return;
    }

    const index = lowerBound(
      this._queue,
      element,
      (a: any, b: any) => b.priority - a.priority,
    );
    this._queue.splice(index, 0, element);
  }

  public dequeue() {
    return this._queue.shift().run;
  }

  get size() {
    return this._queue.length;
  }
}
