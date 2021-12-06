stageList.push(function (id) {
  stage = stageGen({
    gridSize: [3, 4],
    message: `第${toChinese(id)}关 点灯游戏 请点击方块`,
    task: [
      [0, 12, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.mat = MatrixGen(3, 4, 2);
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (data.mat[x][y] !== 2) return;
    for (let i of dn8)
    if (this.inArea(x + i[0], y + i[1]) && data.mat[x + i[0]][y + i[1]] !== 0)
      data.mat[x + i[0]][y + i[1]] = 1 + (x + y) % 2;
    data.mat[x][y] = 0;
    this.task[0].add(1);
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        this.get(i, j).color = [white, grey, yellow][data.mat[i][j]];
        this.get(i, j).text = data.mat[i][j] ? ((i + j) % 2 ? "+":"-") : "";
      }
    }
  };
  stage.INIT();
});