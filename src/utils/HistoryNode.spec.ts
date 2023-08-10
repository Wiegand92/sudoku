import { HistoryNode } from "./HistoryNode";

describe("HistoryNode", () => {
  test("should create a new node with the correct data and index", () => {
    const data = 42;
    const index: [number, number] = [0, 1];
    const node = new HistoryNode(data, index);

    expect(node.data).toBe(data);
    expect(node.index).toEqual(index);
    expect(node.next).toBeNull();
    expect(node.previous).toBeNull();
  });

  test("should set the next node correctly", () => {
    const node1 = new HistoryNode(1, [0, 0]);
    const node2 = new HistoryNode(2, [1, 1]);

    node1.setNextNode(node2);

    expect(node1.getNextNode()).toBe(node2);
  });

  test("should set the previous node correctly", () => {
    const node1 = new HistoryNode(1, [0, 0]);
    const node2 = new HistoryNode(2, [1, 1]);

    node2.setPreviousNode(node1);

    expect(node2.getPreviousNode()).toBe(node1);
  });

  test("should create and set a new node as next node if provided with data", () => {
    const node1 = new HistoryNode(1, [0, 0]);
    const data: { data: number; index: [number, number] } = {
      data: 2,
      index: [1, 1],
    };

    node1.setNextNode(data);

    expect(node1.getNextNode()?.getData()).toEqual(data);
  });

  test("should create and set a new node as previous node if provided with data", () => {
    const node1 = new HistoryNode(1, [0, 0]);
    const data: { data: number; index: [number, number] } = {
      data: 2,
      index: [1, 1],
    };

    node1.setPreviousNode(data);

    expect(node1.getPreviousNode()?.getData()).toEqual(data);
  });

  test("should get the correct data from the node", () => {
    const data = 42;
    const index: [number, number] = [0, 1];
    const node = new HistoryNode(data, index);

    expect(node.getData()).toEqual({ data, index });
  });
});
