stageList.push(function (id) {
  stage = stageGen({
    gridSize: [6, 9],
    // blockSize: "small",
    message: `第${toChinese(id)}关 赛车游戏 请点击方块`,
    task: [
      [0, 5, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.pos = ArrayGen(5, 0);
    data.det = [8, 5, 7, 5, 8];
    data.locked = ArrayGen(5, false);
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (x == 5 && y == 4) {
    } else if (x < 5 && y == data.pos[x] && y < 5) {
      data.locked[x] ^= true;
    } else return;
    for (let i = 0; i < 5; i++)
      if (!data.locked[i])
        data.pos[i]++;
  };
  stage.update = function () {
    var data = this.data;
    this.task[0].set(0);
    for (let i = 0; i < 5; i++) {
      if (data.pos[i] == data.det[i])
        this.task[0].add(1);
      for (let j = 0; j < 9; j++) {
        this.get(i, j).color = (data.pos[i] != j ? grey : j < 5 ? yellow : blue);
        this.get(i, j).text = (data.det[i] == j ? "☆" : (data.pos[i] == j && data.locked[i]) ? "L" : "");
      }
    }
    for (let j = 0; j < 9; j++) {
      this.get(5, j).color = (j == 4 ? orange : white);
      this.get(5, j).text = (j == 4 ? "=>" : "");
    }
  };
  stage.INIT();
});