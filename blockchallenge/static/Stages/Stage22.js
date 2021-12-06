stageList.push(function (id) {
  stage = stageGen({
    gridSize: [7, 11],
    // blockSize: "small",
    message: `第${toChinese(id)}关 寻宝游戏 请点击方块`,
    task: [
      [0, 2, equal],
      [0, 12, lessEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.vis = MatrixGen(7, 11, false);
    do {
      data.v1 = [random(7), random(11)];
      data.v2 = [random(7), random(11)];
    } while (Math.abs(data.v1[0] - data.v2[0]) <= 3
      || Math.abs(data.v1[1] - data.v2[1]) <= 3);
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (data.vis[x][y]) return;
    data.vis[x][y] = true;
    if (vecEqual(v, data.v1) || vecEqual(v, data.v2)) {
      this.task[0].add(1);
    }
    this.task[1].add(1);
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < 7; i++)
      for (let j = 0; j < 11; j++)
        if (data.vis[i][j] == false) {
          this.get(i, j).text = "";
          this.get(i, j).color = grey;
        } else if (vecEqual([i, j], data.v1) || vecEqual([i, j], data.v2)) {
          this.get(i, j).text = "☆";
          this.get(i, j).color = yellow;
        } else {
          this.get(i, j).text = "" + (mdist([i, j], data.v1) + mdist([i, j], data.v2));
          this.get(i, j).color = grey;
        }
  };
  stage.INIT();
});