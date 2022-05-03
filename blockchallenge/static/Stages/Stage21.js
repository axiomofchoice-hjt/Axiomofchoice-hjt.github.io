stageList.push(function (id) {
  stage = stageGen({
    gridSize: [2, 11],
    // blockSize: "small",
    message: `第${toChinese(id)}关 Flip-Flop 游戏 请点击第一行方块`,
    task: [
      [0, 11, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.r = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];
    ArrayShuffle(data.r);
    data.l = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
    ArrayShuffle(data.l);
    for (let i = 0; i < 11; i++)
      data.l[i] ^= data.r[i];
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (x == 1) return;
    let flag = true;

    for (let i = 0; i <= id; i++) {
      if (data.l[i] !== data.l[0] || data.l[i] === 2) {
        flag = false;
      }
    }
    if (flag) {
      for (let i = 0; i <= id; i++) {
        data.l[i] ^= 1;
      }
    } else {
      for (let i = 0; i <= id; i++) {
        data.l[i] = 2;
      }
    }
  };
  stage.update = function () {
    var data = this.data;
    var color = [grey, yellow, red];
    this.task[0].set(0);
    for (let i = 0; i < 11; i++) {
      this.get(0, i).color = color[data.l[i]];
      this.get(1, i).color = color[data.r[i]];
      if (data.l[i] == data.r[i])
        this.task[0].add(1);
    }
  };
  stage.INIT();
});