stageList.push(function (id) {
  stage = stageGen({
    gridSize: [8, 11],
    blockSize: "small",
    message: `第${toChinese(id)}关 舞动的线条游戏 请点击方向键`,
    task: [
      [0, 3, equal],
      [0, 5, lessEqual],
    ],
  });
  stage.dirKeyDown = function (x, y, dir, v) {
    let _v = [Math.min(7, 7 + x), 5 + y];
    this.CLICK(this.getId(_v));
  };
  stage.init = function () {
    var data = this.data;
    data.star = [[3, 1], [4, 3], [1, 8]];
    data.instruction = [];
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (mdist(v, [7, 5]) > 1) return;
    if (data.instruction.length == 5) return;
    v = vecSub(v, [7, 5]);
    if (vecEqual(v, [0, 0])) v = [1, 0];
    data.instruction.push(v);
    this.task[1].add(1);
  };
  stage.update = function () {
    var data = this.data;
    this.task[0].set(0);
    for (let i = 0; i < this.row - 2; i++)
      for (let j = 0; j < this.col; j++)
        this.get(i, j).color = grey;
    for (let i of data.star) this.get(i).text = "☆";
    for (let i = this.row - 2; i < this.row; i++)
      for (let j = 0; j < this.col; j++)
        this.get(i, j).color = white;
    this.get(6, 5).color = orange;
    this.get(7, 5).color = orange;
    this.get(7, 4).color = orange;
    this.get(7, 6).color = orange;
    let player = [this.row - 3, 0];
    this.get(player).color = blue;
    let ok = [0, 0, 0];
    for (let i = 0; i < 20; i++)
      for (let d of data.instruction) {
        player = vecAdd(player, d);
        if (this.inArea(player) && player[0] < this.row - 2) {
          this.get(player).color = blue;
        }
        for (let i = 0; i < 3; i++) if (vecEqual(data.star[i], player)) ok[i] = 1;
      }
    this.task[0].set(ArraySum(ok));
  };
  stage.INIT();
});