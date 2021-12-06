stageList.push(function (id) {
  stage = stageGen({
    gridSize: [5, 6],
    message: `第${toChinese(id)}关 捡金币游戏 请点击方块`,
    task: [
      [0, 2000, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.mat = MatrixGen(5, 6, 0);
    var gen = (value, num) => {
      for (let i = 0; i < num; i++) {
        let x = random(5), y = random(6);
        while (data.mat[x][y]) {
          x = random(5), y = random(6);
        }
        data.mat[x][y] = value;
      }
    };
    gen(-1, 2);
    gen(1, 2);
    gen(2, 10);
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (data.mat[x][y] === 1) {
      this.task[0].add(1);
    } else if (data.mat[x][y] === -1) {
      this.task[0].add(-1);
    } else if (data.mat[x][y] === 2) {
      this.task[0].counter *= 2;
    }
    data.mat[x][y] = 0;
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.get(i, j).color = [red, grey, yellow, green][data.mat[i][j] + 1];
        this.get(i, j).text = ["-1", "", "+1", "Db"][data.mat[i][j] + 1];
      }
    }
  };
  stage.INIT();
});