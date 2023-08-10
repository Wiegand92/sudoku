import { HistoryNode } from "./HistoryNode";

type NodeNull = HistoryNode | null;
export class HistoryList {
  head: NodeNull;
  tail: NodeNull;
  currentNode: NodeNull;
  historyInUse: boolean;
  constructor() {
    this.head = null;
    this.tail = null;
    this.currentNode = null;
    this.historyInUse = false;
  }
  getHead() {
    return this.head;
  }
  getTail() {
    return this.tail;
  }
  getCurrentNode() {
    return this.currentNode;
  }
  addNode(data: { data: number; index: [number, number] }) {
    const currentNode = this.currentNode;
    const newNode = new HistoryNode(data.data, data.index);

    if (currentNode) {
      newNode.setPreviousNode(currentNode);
      currentNode.setNextNode(newNode);
    }

    this.currentNode = newNode;
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
  }
  //   unnecessary?!?
  //   addToTail(data: { data: number; index: [number, number] }) {
  //     const currentTail = this.tail;
  //     const newTail = new HistoryNode(data.data, data.index);

  //     if (currentTail) {
  //       newTail.setNextNode(currentTail);
  //       currentTail.setPreviousNode(newTail);
  //     }
  //     this.tail = newTail;
  //     if (!this.head) {
  //       this.head = newTail;
  //     }
  //   }

  findNextByIndex(index: [number, number]) {
    let nextToCheck = this.currentNode.getPreviousNode();
    let foundNode: NodeNull = null;
    while (nextToCheck) {
      console.log(nextToCheck);
      if (
        nextToCheck.index[0] === index[0] &&
        nextToCheck.index[1] === index[1]
      ) {
        foundNode = nextToCheck;
        break;
      } else {
        nextToCheck = nextToCheck.getPreviousNode();
      }
    }
    return foundNode;
  }

  moveForwards() {
    if (this.historyInUse) {
      this.currentNode = this.currentNode.getNextNode();
      if (this.currentNode.getNextNode() === null) {
        this.historyInUse = false;
      }
    }
  }
  moveBackwards() {
    if (this.currentNode.getPreviousNode()) {
      this.currentNode = this.currentNode.getPreviousNode();
      if (!this.historyInUse) this.historyInUse = true;
    }
  }
}
