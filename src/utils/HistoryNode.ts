export type NodeNull = HistoryNode | null;
export class HistoryNode {
  data: number;
  index: [number, number];
  next: NodeNull;
  previous: NodeNull;

  constructor(data: number, index: [number, number]) {
    this.data = data;
    this.index = index;
    this.next = null;
    this.previous = null;
  }
  getNextNode(): NodeNull {
    return this.next;
  }
  getPreviousNode(): NodeNull {
    return this.previous;
  }
  getData() {
    return { data: this.data, index: this.index };
  }
  setNextNode(data: HistoryNode | { data: number; index: [number, number] }) {
    if (data instanceof HistoryNode) {
      this.next = data;
    } else {
      const newNode = new HistoryNode(data.data, data.index);
      this.next = newNode;
    }
  }
  setPreviousNode(
    data: HistoryNode | { data: number; index: [number, number] }
  ) {
    if (data instanceof HistoryNode) {
      this.previous = data;
    } else {
      const newNode = new HistoryNode(data.data, data.index);
      this.previous = newNode;
    }
  }
}
