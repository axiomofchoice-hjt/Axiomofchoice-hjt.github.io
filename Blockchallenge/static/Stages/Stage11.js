stageList.push(function (id) {
  stage = stageGen({
    gridSize: [7, 7],
    message: `第${toChinese(id)}关 色彩游戏 请点击方块`,
    task: [
      [0, 13, greaterEqual],
      [0, 13, greaterEqual],
      [0, 13, greaterEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.mat = MatrixGen(this.row, this.col, 0);
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    data.mat[x][y] ^= 1;
  };
  stage.update = function () {
    var data = this.data;
    var s = MatrixGen(this.row, this.col, 0);
    this.task[0].set(0);
    this.task[1].set(0);
    this.task[2].set(0);
    for (let j = 0; j < this.col; j++)
      for (let i = 0; i < this.row && data.mat[i][j] === 0; i++)
        if (s[i][j] === 0) {
          s[i][j] = 1;
          this.get(i, j).color = yellow;
          this.get(i, j).text = "";
          this.task[2].add(1);
        }

    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col && data.mat[i][j] === 0; j++)
        if (s[i][j] === 0) {
          s[i][j] = 1;
          this.get(i, j).color = blue;
          this.get(i, j).text = "";
          this.task[1].add(1);
        }
    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col; j++)
        if (s[i][j] === 0) {
          if (data.mat[i][j] === 1) {
            this.get(i, j).color = orange;
            this.get(i, j).text = "□";
          } else {
            this.get(i, j).color = grey;
            this.get(i, j).text = "";
            this.task[0].add(1);
          }
        }
  };
  stage.INIT();
});