stageList.push(function (id) {
  stage = stageGen({
    gridSize: [4, 6],
    // blockSize: "small",
    message: `第${toChinese(id)}关 水滴游戏 请点击方块`,
    task: [
      [0, 12, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.mat = [
      [-1, -1, 2, -1, -1, -1],
      [2, 2, 2, 2, 2, 2],
      [-1, 2, 2, -1, 2, 2],
      [-1, -1, 2, -1, -1, -1]
    ];
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (data.mat[x][y] <= 0) return;
    if (data.mat[x][y] === 1) {
      data.mat[x][y] = 2;
    } else if (data.mat[x][y] <= 3) {
      data.mat[x][y] = 0;
      for (let [dx, dy] of dn4) {
        if (this.inArea(x + dx, y + dy) && data.mat[x + dx][y + dy] != -1) {
          data.mat[x + dx][y + dy] = Math.min(4, data.mat[x + dx][y + dy] + 1);
        }
      }
    } else {
      data.mat[x][y] = 0;
    }
  };
  stage.update = function () {
    var data = this.data;
    this.task[0].set(0);
    for (let [i, j] of this.eachXY()) {
      this.get(i, j).color = [white, grey, yellow][Math.min(1, data.mat[i][j]) + 1];
      this.get(i, j).text = (data.mat[i][j] !== -1 ? data.mat[i][j] : "");
      if (data.mat[i][j] === 0) this.task[0].add(1);
    }
  };
  stage.INIT();
});