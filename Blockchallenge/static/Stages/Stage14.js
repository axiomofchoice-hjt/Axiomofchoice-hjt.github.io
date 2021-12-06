stageList.push(function (id) {
  stage = stageGen({
    gridSize: [7, 9],
    // blockSize: "small",
    message: `第${toChinese(id)}关 找不同游戏 请点击左侧方块`,
    task: [
      [0, 18, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.larr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    data.rarr = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1];
    data.getIndex = function (x, y) {
      if (x < 0 || x >= 7 || y < 0 || y >= 4) return -1;
      if (x == 0) { return y; }
      if (y == 3) { return x + 3; }
      if (x == 6) { return 12 - y; }
      if (y == 0) { return 18 - x; }
      return -1;
    };
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    var index = data.getIndex(x, y);
    if (index === -1) return;
    if (data.larr[index] === 1) return;
    data.larr[index] = 1;
    if (ArraySum(data.larr) !== data.larr.length) {
      index = (index + 1) % data.larr.length;
      while (data.larr[index]) index = (index + 1) % data.larr.length;
      index = (index + 1) % data.larr.length;
      while (data.larr[index]) index = (index + 1) % data.larr.length;
      index = (index + 1) % data.larr.length;
      while (data.larr[index]) index = (index + 1) % data.larr.length;
      data.larr[index] = 1;
    }
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < 7; i++)
      for (let j = 0; j < 9; j++) {
        var l = data.getIndex(i, j);
        var r = data.getIndex(i, j - 5);
        if (l !== -1) {
          this.get(i, j).color = (data.larr[l] ? yellow : grey);
        } else if (r != -1) {
          this.get(i, j).color = (data.rarr[r] ? yellow : grey);
        } else {
          this.get(i, j).color = "";
          if (i === 3 && j === 4) this.get(i, j).text = "=>";
        }
      }
    this.task[0].set(0);
    for (let i = 0; i < 18; i++) this.task[0].add(data.larr[i] === data.rarr[i]);
  };
  stage.INIT();
});