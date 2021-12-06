stageList.push(function (id) {
  stage = stageGen({
    gridSize: [7, 7],
    // blockSize: "small",
    message: `第${toChinese(id)}关 对称游戏 请点击方块`,
    task: [
      [0, 12, greaterEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.mat = [
      [0, -1, -1, -1, -1, -1, 0],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, -1, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, -1],
      [0, -1, -1, -1, -1, -1, 0],
    ];
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    var vis = null;
    var nextMat = copy(data.mat);
    var rec = [];
    var dfs = (x, y) => {
      if (vis[x][y]) return false;
      vis[x][y] = true; rec.push([x, y]);
      let res = false;
      for (let [dx, dy] of dn4) if (this.inArea(x + dx, y + dy)) {
        if (nextMat[x + dx][y + dy] === 0) res = true;
        if (nextMat[x + dx][y + dy] === nextMat[x][y] && dfs(x + dx, y + dy)) res = true;
      }
      return res;
    };
    var kill = (label) => {
      vis = MatrixGen(this.row, this.col, false);
      for (let i = 0; i < this.row; i++)
        for (let j = 0; j < this.col; j++) {
          rec = [];
          if (nextMat[i][j] === label && !vis[i][j] && !dfs(i, j)) {
            for (let [rx, ry] of rec) nextMat[rx][ry] = 0;
          }
        }
    };
    let mid = (this.row - 1) / 2;
    if (nextMat[x][y] !== 0) return;
    nextMat[x][y] = 1;
    kill(-1); kill(1);
    if (nextMat[x][y] === 0) return; // 不能这么下
    if (nextMat[this.row - 1 - x][this.col - 1 - y] === 0) {
      nextMat[this.row - 1 - x][this.col - 1 - y] = -1;
      kill(1); kill(-1);
    }
    data.mat = nextMat;
  };
  stage.update = function () {
    var data = this.data;
    this.task[0].set(0);
    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col; j++) {
        this.get(i, j).color = [red, grey, blue][data.mat[i][j] + 1];
        if (data.mat[i][j] === 1)
        this.task[0].add(1);
      }
  };
  stage.INIT();
});