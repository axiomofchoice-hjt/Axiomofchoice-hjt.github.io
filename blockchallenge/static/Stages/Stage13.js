stageList.push(function (id) {
  stage = stageGen({
    gridSize: [8, 11],
    blockSize: "small",
    message: `第${toChinese(id)}关 地图游戏 请点击绿色方块 注：点击黄色方块撤回操作`,
    task: [
      [0, 1, lessEqual],
      [0, 11, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.mat = [
      [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
      [0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1],
    ];
    data.height = [];
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (y < data.height.length && x === data.height[y]) {
      data.height.length = y;
    } else if (y === data.height.length && data.mat[x][y] === 1) {
      data.height.push(x);
    }
  };
  stage.update = function () {
    var data = this.data;
    var sgn = (x) => ((x > 0) - (x < 0));
    this.task[0].set(0);
    for (let i = 1; i < data.height.length - 1; i++) {
      this.task[0].add(sgn(data.height[i - 1] - data.height[i]) != sgn(data.height[i] - data.height[i + 1]));
    }
    this.task[1].set(data.height.length);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (data.mat[i][j] === 0) {
          this.get(i, j).color = white;
        } else if (j == data.height.length) {
          this.get(i, j).color = green;
          this.get(i, j).text = "";
        } else if (j < data.height.length && i === data.height[j]) {
          this.get(i, j).color = yellow;
          this.get(i, j).text = "√";
        } else {
          this.get(i, j).color = grey;
          this.get(i, j).text = "";
        }
      }
    }
  };
  stage.INIT();
});