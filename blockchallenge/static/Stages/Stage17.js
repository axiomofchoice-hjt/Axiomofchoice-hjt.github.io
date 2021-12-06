stageList.push(function (id) {
  stage = stageGen({
    gridSize: [4, 7],
    // blockSize: "small",
    message: `第${toChinese(id)}关 化学游戏 请点击方块`,
    task: [
      [0, 4, greaterEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.bag = [0, 0, 0];
    data.L = [];
    data.R = [];
    data.check = function () {
      var data = this;
      if (data.R.length) return [-1];
      if (exEqual(data.L, [0, 0]))
        return [0, [1, 1, 1]];
      if (exEqual(data.L, [0, 1]))
        return [0, [2, 2]];
      if (exEqual(data.L, [1, 2]))
        return [0, [0, 0, 1]];
      if (exEqual(data.L, [2, 2]))
        return [1, []];
      if (exEqual(data.L, [2, 2, 2]))
        return [1, [2, 2]];
      return [-1];
    }
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (id >= 0 && id < data.L.length && data.bag.length < 21) {
      data.bag.push(data.L[id]);
      data.L.splice(id, 1);
    }
    if (id >= 4 && id - 4 < data.R.length && data.bag.length < 21) {
      data.bag.push(data.R[id - 4]);
      data.R.splice(id - 4, 1);
    }
    if (id >= 7 && id - 7 < data.bag.length && data.L.length < 3) {
      data.L.push(data.bag[id - 7]);
      data.bag.splice(id - 7, 1);
    }
    if (id == 3) {
      let c = data.check();
      if (c[0] !== -1) {
        data.L = [];
        data.R = c[1];
        this.task[0].add(c[0]);
      }
    }
    data.L.sort();
    data.R.sort();
    data.bag.sort();
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < this.blockNum(); i++) {
      this.get(i).text = "";
    }
    this.get(3).text = "=>";
    let c = data.check();
    this.get(3).color = (c[0] !== -1 ? yellow : white);
    var color = [green, purple, red, grey, white];
    for (let i = 0; i < 3; i++) {
      this.get(i).color = color[i < data.L.length ? data.L[i] : 3];
      this.get(i + 4).color = color[i < data.R.length ? data.R[i] : 3];
    }
    for (let i = 0; i < 21; i++) {
      this.get(i + 7).color = color[i < data.bag.length ? data.bag[i] : 4];
    }
  };
  stage.INIT();
});