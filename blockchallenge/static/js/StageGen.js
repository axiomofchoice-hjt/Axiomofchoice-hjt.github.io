function stagePrecreate(x) {
  var y = {
    message: x.message,
    row: x.gridSize[0],
    col: x.gridSize[1],
    blockSize: 73,
    gap: 6,
    arr: [],
    task: [],
    data: {},
  };
  if (x.blockSize === "small") {
    y.blockSize = 61;
    y.gap = 6;
  }
  for (let i = 0; i < x.task.length; i++) {
    y.task.push({
      init: x.task[i][0],
      counter: x.task[i][0],
      target: x.task[i][1],
      clear() { this.counter = this.init; },
      set(x) { this.counter = x; },
      add(x) { this.counter += x; },
      ok() { return x.task[i][2](this.counter, this.target); },
    });
  }
  return y;
}

var stageFunc = {
  // 抽象函数，按下方向键的事件
  dirKeyDown() { },
  // 抽象函数，初始化
  init() { },
  // 抽象函数，点击方块的事件
  click() { },
  // 抽象函数，更新
  update() { },
  // 挂载到 DOM 上
  show() {
    document.getElementById("app").innerHTML = HtmlGen(stage);
  },
  // 真正的初始化
  INIT() {
    this.clear();
    this.init();
    this.update();
    this.show();
  },
  // 真正的点击
  CLICK(id) {
    this.click(Math.floor(id / this.col), id % this.col, id, [Math.floor(id / this.col), id % this.col]);
    this.update();
    this.show();
    if (this.ok()) { stageOKList.set(stageId - 1); }
  },
  // 方块数
  blockNum() { return this.row * this.col; },
  // 清空
  clear() {
    this.arr = [];
    for (let i = 0; i < this.blockNum(); i++) {
      this.arr.push({ text: "", color: grey, });
    }
    for (let i of this.task) { i.clear(); }
    this.data = {};
  },
  // 得到方块
  get(x, y) {
    if (!this.inArea(x, y)) { throw new Error("get(): not in area"); }
    return this.arr[this.getId(x, y)];
  },
  // 得到方块编号
  getId(x, y) {
    if (y !== undefined) { return x * this.col + y; }
    if (typeof x === "number") { return x; }
    if (Array.isArray(x)) { return x[0] * this.col + x[1]; }
    throw new Error("getId(): type error");
  },
  // 得到方块坐标
  getXY(x, y) {
    if (y !== undefined) { return [x, y]; }
    if (typeof x === "number") { return [Math.floor(x / this.col), Math.floor(x % this.col)]; }
    if (Array.isArray(x)) { return x; }
    throw new Error("getXY(): type error");
  },
  // 所有坐标
  eachXY() {
    var res = [];
    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col; j++)
        res.push([i, j]);
    return res;
  },
  // 填上数字
  fillNumber() {
    for (let i = 0; i < this.blockNum(); i++) {
      this.get(i).text = i + 1;
    }
  },
  // 方块坐标 / 编号是否合法
  inArea(x, y) {
    [x, y] = this.getXY(x, y);
    return 0 <= x && x < this.row && 0 <= y && y < this.col;
  },
  // 方块是否在边上
  inBorder(x, y) {
    [x, y] = this.getXY(x, y);
    return x === 0 || x === this.row - 1 || y === 0 || y === this.col - 1;
  },
  // 方块是否在角上
  inCorner(x, y) {
    [x, y] = this.getXY(x, y);
    return (x === 0 || x === this.row - 1) && (y === 0 || y === this.col - 1);
  },
  // 任务是否完成
  ok() {
    var res = true;
    for (let i of this.task) if (!i.ok()) res = false;
    return res;
  },
};
// 生成一个关卡
function stageGen(x) {
  var result = Object.assign(stagePrecreate(x), stageFunc);
  result.clear();
  return result;
}