stageList.push(function (id) {
  stage = stageGen({
    gridSize: [4, 7],
    message: `第${toChinese(id)}关 开关游戏 请点击左侧方块`,
    task: [
      [0, 12, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.rmat = MatrixGen(4, 3, 0);
    var find = (func) => {
      let x = random(4), y = random(3);
      while (!func(x, y)) {
        x = random(4), y = random(3);
      }
      return [x, y];
    };
    for (let i = 0; i < 6; i++) {
      let v = find((x, y) => (data.rmat[x][y] === 0));
      data.rmat[v[0]][v[1]] = 1;
    }
    data.lmat = copy(data.rmat);
    for (let i = 0; i < 5; i++) {
      let v = find((x, y) => (data.lmat[x][y] === data.rmat[x][y]));
      data.lmat[v[0]][v[1]] ^= 1;
    }
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (y >= 3) return;
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 3; j++)
        if (i != x || j != y)
          data.lmat[i][j] ^= 1;
  };
  stage.update = function () {
    var data = this.data;
    this.task[0].set(0);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < 3; j++) {
        this.get(i, j).color = grey;
        this.get(i, j).text = data.lmat[i][j] ? "1" : "";
        this.get(i, j + 4).color = grey;
        this.get(i, j + 4).text = data.rmat[i][j] ? "1" : "";
        if (data.lmat[i][j] === data.rmat[i][j])
          this.task[0].add(1);
      }
    }
    for (let i = 0; i < this.row; i++) {
      this.get(i, 3).color = white;
    }
    this.get(2, 3).text = "=>";
  };
  stage.INIT();
});