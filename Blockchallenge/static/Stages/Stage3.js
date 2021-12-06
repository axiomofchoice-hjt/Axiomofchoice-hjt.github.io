stageList.push(function (id) {
  stage = stageGen({
    gridSize: [6, 6],
    message: `第${toChinese(id)}关 铺地砖游戏 请点击方块`,
    task: [
      [0, 3, equal],
      [0, 3, equal],
      [0, 5, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.v = MatrixGen(this.row, this.col, 0);
    data.colorList = [grey, green, yellow, blue];
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    var check = (dx, dy) => {
      return this.inArea(x + dx, y + dy) && data.v[x + dx][y + dy] === 0;
    };
    if (!this.task[0].ok()) {
      if (check(-1, 0) && check(0, -1) && check(0, 1)) {
        data.v[x - 1][y] = 1;
        data.v[x][y - 1] = 1;
        data.v[x][y + 1] = 1;
        this.task[0].add(1);
      }
    } else if (!this.task[1].ok()) {
      if (check(-1, 0) && check(0, 0) && check(0, 1)) {
        data.v[x - 1][y] = 2;
        data.v[x][y] = 2;
        data.v[x][y + 1] = 2;
        this.task[1].add(1);
      }
    } else {
      if (check(0, -1) && check(0, 0) && check(0, 1)) {
        data.v[x][y - 1] = 3;
        data.v[x][y] = 3;
        data.v[x][y + 1] = 3;
        this.task[2].add(1);
      }
    }
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.get(i, j).color = data.colorList[data.v[i][j]];
      }
    }
  };
  stage.INIT();
});