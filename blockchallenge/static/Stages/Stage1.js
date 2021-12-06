stageList.push(function (id) {
  stage = stageGen({
    gridSize: [7, 9],
    message: `第${toChinese(id)}关 猜数游戏 请点击数字`,
    task: [
      [0, 1, equal],
      [0, 6, lessEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    this.fillNumber();
    data.L = 0;
    data.R = 62;
  };
  stage.click = function (x, y, id) {
    var data = this.data;
    if (typeof (this.arr[id].text) !== "number") return;
    this.task[1].add(1);
    if (id === data.L && data.L == data.R) {
      this.arr[id].text = "ok";
      this.arr[id].color = red;
      this.task[0].set(1);
    } else if ((id * 2 === data.L + data.R && random(2) === 0) || id * 2 < data.L + data.R) {
      this.arr[id].text = ">";
      this.arr[id].color = yellow;
    } else {
      this.arr[id].text = "<";
      this.arr[id].color = blue;
    }
    if (data.L <= id && id <= data.R) {
      if (this.arr[id].text === ">") data.L = id + 1;
      if (this.arr[id].text === "<") data.R = id - 1;
    }
  };
  stage.update = function () {
  };
  stage.INIT();
});