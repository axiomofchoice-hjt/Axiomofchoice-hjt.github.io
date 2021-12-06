stageList.push(function (id) {
  stage = stageGen({
    gridSize: [6, 6],
    // blockSize: "small",
    message: `第${toChinese(id)}关 数间游戏 请点击方块`,
    task: [
      [0, 12, greaterEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.mat = MatrixGen(this.row, this.col, 0);
    data.vis = null;
  };
  stage.dfs = function (x, y) {
    let ans = 1;
    // console.log(this.data.vis, x, y)
    this.data.vis[x][y] = 1;
    for (let d of dn4) {
      let px = x + d[0], py = y + d[1];
      if (this.inArea(px, py) && !this.data.vis[px][py])
        ans += this.dfs(px, py);
    }
    return ans;
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (data.mat[x][y] == 1) {
      data.mat[x][y] = 0;
      this.task[0].add(-1);
    } else {
      for (let d of dn4) {
        let px = x + d[0], py = y + d[1];
        if (this.inArea(px, py) && data.mat[px][py])
          return;
      }
      data.mat[x][y] = 1;
      data.vis = copy(data.mat);
      let ans = (data.mat[0][0] ? this.dfs(1, 0) : this.dfs(0, 0));
      if (ans + this.task[0].counter + 1 < this.blockNum()) {
        data.mat[x][y] = 0;
        return;
      }
      this.task[0].add(1);
    }
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col; j++)
        this.get(i, j).color = (data.mat[i][j] ? yellow : grey);
  };
  stage.INIT();
});