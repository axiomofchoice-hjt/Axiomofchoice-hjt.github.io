stageList.push(function (id) {
  stage = stageGen({
    gridSize: [8, 7],
    blockSize: "small",
    message: `第${toChinese(id)}关 吃金币游戏 请点击方向键 注意隐藏操作`,
    task: [
      [0, 2, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    this.fillNumber();
    data.player = [1, 1];
    data.coin = [[1, 3], [4, 5]];
    data.obstacle = [[3, 1], [3, 3], [2, 5]];
    data.broken = [0, 0, 0, 0];
  };
  stage.dirKeyDown = function(x, y, dir, v) {
    let _v = [[7, 4], [6, 3], [7, 2], [7, 3]][dir];
    this.CLICK(this.getId(_v));
  }
  stage.click = function (x, y, id, v) {
    var data = this.data;
    var dir = -1;
    if (x <= 5) {
      for (let i of [0, 1, 2, 3]) {
        let to = vecAdd(data.player, dn4[i]); to[1] = (to[1] + this.col) % this.col;
        if (vecEqual(to, v))
          dir = i;
      }
    } else {
      if (x == 7 && y == 4) dir = 0;
      if (x == 6 && y == 3) dir = 1;
      if (x == 7 && y == 2) dir = 2;
      if (x == 7 && y == 3) dir = 3;
    }
    if (dir === -1) return;
    if (data.broken[dir]) return;
    var to = vecAdd(data.player, dn4[dir]); to[1] = (to[1] + this.col) % this.col;
    if (!this.inArea(to)) return;
    if (to[0] == 6) return;
    if (data.obstacle.findIndex((value) => vecEqual(value, to)) !== -1) return;

    data.broken[dir] = 3;

    for (let i of [0, 1, 2, 3]) {
      if (data.broken[i]) data.broken[i]--;
    }
    data.player = to;
    let t = data.coin.findIndex((value) => vecEqual(value, to));
    if (t !== -1) {
      data.coin.splice(t, 1);
      this.task[0].add(1);
    }
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col; j++) {
        this.get(i, j).color = (i <= 5 ? grey : white);
        this.get(i, j).text = "";
      }
    for (let i of [0, 1, 2, 3]) {
      this.get([Math.min(7, 7 + dn4[i][0]), 3 + dn4[i][1]]).color =
        (data.broken[i] ? red : green);
    }
    for (let i of data.coin) {
      this.get(i).color = yellow;
      this.get(i).text = "Au";
    }
    for (let i of data.obstacle) {
      this.get(i).color = orange;
      this.get(i).text = "□";
    }
    this.get(data.player).color = blue;
    this.get(data.player).text = "P";
  };
  stage.INIT();
});