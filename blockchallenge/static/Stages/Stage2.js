stageList.push(function (id) {
  stage = stageGen({
    gridSize: [4, 5],
    message: `第${toChinese(id)}关 填充游戏 请点击方块 注意隐藏操作`,
    task: [
      [0, 20, equal],
      [0, 3, lessEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.v = MatrixGen(this.row, this.col, 0);
    data.colorList = [grey, blue, yellow];
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (data.v[x][y] === 2) return;
    this.task[1].add(1);
    if (data.v[x][y] === 0) {
      for (let i = 0; i < this.row; i++) {
        data.v[i][y] = 1;
      }
      for (let i = 0; i < this.col; i++) {
        data.v[x][i] = 1;
      }
    } else {
      data.v[x][y] = 2;
      for (let i of dn8) {
        if (this.inArea(vecAdd(v, i))) {
          data.v[x + i[0]][y + i[1]] = 2;
        }
      }
    }
  };
  stage.update = function () {
    var data = this.data;
    this.task[0].set(0);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.get(i, j).color = data.colorList[data.v[i][j]];
        if (data.v[i][j] !== 0) {this.task[0].add(1);}
      }
    }
  };
  stage.INIT();
});