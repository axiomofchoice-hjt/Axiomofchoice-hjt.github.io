stageList.push(function (id) {
  stage = stageGen({
    gridSize: [1, 7],
    // blockSize: "small",
    message: `第${toChinese(id)}关 交换游戏 请点击方块`,
    task: [
      [0, 7, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.A = [1, 2, 3, 4, 5, 6, 7];
    var test = (A) => {
      for (let i = 0; i < A.length - 1; i++)
        if (Math.abs(A[i] - A[i + 1]) === 1)
          return false;
      return true;
    };
    while (!test(data.A)) ArrayShuffle(data.A);
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    data.A = data.A.slice(y + 1).concat(data.A.slice(y, y + 1).concat(data.A.slice(0, y)));
  };
  stage.update = function () {
    var data = this.data;
    this.task[0].set(0);
    for (let i = 0; i < this.col; i++) {
      this.get(i).text = data.A[i];
      this.get(i).color = grey;
      if (data.A[i] === i + 1) this.task[0].add(1);
    }
  };
  stage.INIT();
});