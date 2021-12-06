stageList.push(function (id) {
  stage = stageGen({
    gridSize: [5, 5],
    message: `第${toChinese(id)}关 布雷游戏 请点击方块`,
    task: [
      [0, 8, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.v = MatrixGen(this.row, this.col, 0);
    data.colorList = [grey, green];
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    data.v[x][y] ^= 1;
  };
  stage.update = function () {
    var data = this.data;
    var f = ArrayGen(8, 0);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.get(i, j).color = data.colorList[data.v[i][j]];
        this.get(i, j).text = "";
        if (data.v[i][j] === 0) {
          let cnt = 0;
          for (let dn of dn8) {
            cnt += (this.inArea(i + dn[0], j + dn[1]) && data.v[i + dn[0]][j + dn[1]] === 1);
          }
          if (cnt) {
            this.get(i, j).text = cnt;
            f[cnt - 1] = 1;
          }
        }
      }
    }
    this.task[0].set(ArraySum(f));
  };
  stage.INIT();
});