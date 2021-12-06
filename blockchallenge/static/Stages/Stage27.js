stageList.push(function (id) {
  stage = stageGen({
    gridSize: [6, 6],
    // blockSize: "small",
    message: `第${toChinese(id)}关 二逼青年游戏 请点击方向键`,
    task: [
      [0, 1, equal],
      [1, 4, lessEqual],
    ],
  });
  stage.dirKeyDown = function (x, y, dir, v) {
    let _v = vecAdd(this.data.player, v);
    if (this.inArea(_v))
      this.CLICK(this.getId(_v));
  };
  stage.init = function () {
    var data = this.data;
    data.player = [0, 0];
    data.counter = 1;
    data.movable = (v) => {
      return this.inArea(v)
        && mdist(data.player, v) == 1 && (
          (v[1] == data.player[1] - 1 && data.counter - 2 >= 0) ||
          (v[1] == data.player[1] + 1 && data.counter + 2 <= 4) ||
          (v[0] == data.player[0] - 1 && data.counter % 2 == 0) ||
          (v[0] == data.player[0] + 1 && data.counter * 2 <= 4)
        );
    };
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (!data.movable(v)) return;
    if (v[1] == data.player[1] - 1)
      data.counter -= 2;
    if (v[1] == data.player[1] + 1)
      data.counter += 2;
    if (v[0] == data.player[0] - 1)
      data.counter /= 2;
    if (v[0] == data.player[0] + 1)
      data.counter *= 2;
      data.player = v;
    this.task[1].set(data.counter);
  };
  stage.update = function () {
    var data = this.data;
    this.task[1].set(data.counter);
    this.task[0].set(vecEqual(data.player, [5, 5]) ? 1 : 0);
    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col; j++) {
        this.get(i, j).color = grey;
        this.get(i, j).text = "";
      }
    this.get(this.row - 1, this.col - 1).color = yellow;
    this.get(data.player).color = blue;
    this.get(data.player).text = "" + data.counter;
    if (data.movable(vecAdd(data.player, [0, -1])))
      this.get(vecAdd(data.player, [0, -1])).text = "-";
    if (data.movable(vecAdd(data.player, [0, 1])))
      this.get(vecAdd(data.player, [0, 1])).text = "+";
    if (data.movable(vecAdd(data.player, [-1, 0])))
      this.get(vecAdd(data.player, [-1, 0])).text = "/";
    if (data.movable(vecAdd(data.player, [1, 0])))
      this.get(vecAdd(data.player, [1, 0])).text = "*";
  };
  stage.INIT();
});