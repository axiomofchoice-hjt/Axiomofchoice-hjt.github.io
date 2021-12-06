stageList.push(function (id) {
  stage = stageGen({
    gridSize: [6, 6],
    message: `第${toChinese(id)}关 推箱子游戏 请点击黄色方块`,
    task: [
      [0, 9, greaterEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.mat = MatrixGen(this.row, this.col, 0);
    for (let [i, j] of [[1, 2], [2, 1], [2, 2], [4, 1], [4, 2], [4, 3], [1, 4], [2, 4], [3, 4]])
      data.mat[i][j] = 1;
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (x == 0 && y >= 1 && y <= 4 && data.mat[1][y] === 0) {
      for (let i of [1, 2, 3]) {
        data.mat[i][y] = data.mat[i + 1][y];
        data.mat[i + 1][y] = 0;
      }
    }
    if (x == 5 && y >= 1 && y <= 4 && data.mat[4][y] === 0) {
      for (let i of [3, 2, 1]) {
        data.mat[i + 1][y] = data.mat[i][y];
        data.mat[i][y] = 0;
      }
    }
    if (y == 0 && x >= 1 && x <= 4 && data.mat[x][1] === 0) {
      for (let j of [1, 2, 3]) {
        data.mat[x][j] = data.mat[x][j + 1];
        data.mat[x][j + 1] = 0;
      }
    }
    if (y == 5 && x >= 1 && x <= 4 && data.mat[x][4] === 0) {
      for (let j of [3, 2, 1]) {
        data.mat[x][j + 1] = data.mat[x][j];
        data.mat[x][j] = 0;
      }
    }
  };
  stage.update = function () {
    var data = this.data;
    this.task[0].set(0);
    for (let i of [0, 1, 2, 3, 4, 5])
      for (let j of [0, 1, 2, 3, 4, 5]) {
        if (this.inBorder(i, j) && !this.inCorner(i, j)) {
          this.get(i, j).color = yellow;
        }
        if (!this.inBorder(i, j)) {
          this.get(i, j).color = (data.mat[i][j] ? green : grey);
          this.get(i, j).text = (i <= 3 && j <= 3 ? "☆" : "");
          if (data.mat[i][j] && i <= 3 && j <= 3) this.task[0].add(1);
        }
        if (this.inCorner(i, j)) {
          this.get(i, j).color = white;
        }
      }
  };
  stage.INIT();
});