import { HistoryList } from "./HistoryList";

describe("HistoryList", () => {
  let historyList: HistoryList;

  beforeEach(() => {
    historyList = new HistoryList();
  });

  test("should add nodes correctly", () => {
    historyList.addNode({ data: 1, index: [0, 0] });
    historyList.addNode({ data: 2, index: [1, 1] });
    historyList.addNode({ data: 3, index: [2, 2] });

    expect(historyList.getHead()?.getData()).toEqual({
      data: 3,
      index: [2, 2],
    });
    expect(historyList.getTail()?.getData()).toEqual({
      data: 1,
      index: [0, 0],
    });
    expect(historyList.getCurrentNode()?.getData()).toEqual({
      data: 3,
      index: [2, 2],
    });
  });

  test("should move forwards and backwards correctly", () => {
    historyList.addNode({ data: 1, index: [0, 0] });
    historyList.addNode({ data: 2, index: [1, 1] });
    historyList.addNode({ data: 3, index: [2, 2] });

    historyList.moveBackwards();
    expect(historyList.getCurrentNode()?.getData()).toEqual({
      data: 2,
      index: [1, 1],
    });

    historyList.moveForwards();
    expect(historyList.getCurrentNode()?.getData()).toEqual({
      data: 3,
      index: [2, 2],
    });
  });

  test("should find nodes by index", () => {
    historyList.addNode({ data: 1, index: [0, 0] });
    historyList.addNode({ data: 2, index: [1, 1] });
    historyList.addNode({ data: 3, index: [2, 2] });

    const foundNode = historyList.findNextByIndex([1, 1]);
    expect(foundNode?.getData()).toEqual({ data: 2, index: [1, 1] });

    const notFoundNode = historyList.findNextByIndex([0, 2]);
    expect(notFoundNode).toBeNull();
  });

  test("should only return most recent move by index", () => {
    historyList.addNode({ data: 1, index: [0, 0] });
    historyList.addNode({ data: 2, index: [1, 1] });
    historyList.addNode({ data: 3, index: [1, 1] });
    historyList.addNode({ data: 3, index: [2, 2] });

    const foundNode = historyList.findNextByIndex([1, 1]);
    console.log(foundNode);
    expect(foundNode?.getData()).toEqual({ data: 3, index: [1, 1] });
  });

  test("when using history, should rewrite the head of the list", () => {
    historyList.addNode({ data: 1, index: [0, 0] });
    historyList.addNode({ data: 2, index: [1, 1] });
    historyList.addNode({ data: 3, index: [1, 1] });
    historyList.addNode({ data: 3, index: [2, 2] });

    historyList.moveBackwards();
    historyList.moveBackwards();
    historyList.addNode({ data: 4, index: [1, 3] });
    expect(historyList.getHead().getData()).toEqual({ data: 4, index: [1, 3] });
    expect(historyList.getCurrentNode().getData()).toEqual({
      data: 4,
      index: [1, 3],
    });
    expect(historyList.getHead().getNextNode()).toBeNull();
    expect(historyList.findNextByIndex([2, 2])).toBeNull();
  });
});
