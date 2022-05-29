stageList.push(function (id) {
  stage = stageGen({
    gridSize: [8, 8],
    blockSize: "small",
    message: `第${toChinese(id)}关 找零游戏 请点击数字 注：灰色方块的数字仅表示位置`,
    task: [
      [0, 1, equal],
      [0, 9, lessEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    this.fillNumber();
    data.L = 0;
    data.R = this.blockNum() - 1;
    data.tag = ArrayGen(this.blockNum(), null);
    data.Min = 0;
  };
  stage.click = function (x, y, id) {
    var data = this.data;
    var lside = (num) => {
      for (let i = num + 1; i <= data.R; i++)
        if (data.tag[i] !== null)
          data.Min = Math.max(data.Min, data.tag[i] + Math.abs(i - num));
      for (let i = 0; i < num; i++)
        if (data.tag[i] !== null)
          data.Min = Math.min(data.Min, data.tag[i] - Math.abs(i - num));
    };
    var rside = (num) => {
      for (let i = data.L; i < num; i++)
        if (data.tag[i] !== null)
          data.Min = Math.max(data.Min, data.tag[i] + Math.abs(i - num));
      for (let i = num + 1; i < this.blockNum(); i++)
        if (data.tag[i] !== null)
          data.Min = Math.min(data.Min, data.tag[i] - Math.abs(i - num));
    };
    if (data.tag[id] !== null) return;
    this.task[1].add(1);
    data.Min = 0;
    if (this.task[1].counter === 1) {
    } else if (data.R - data.L === 1 && data.L <= id && id <= data.R) {
      data.L = data.R = id;
      data.Min = 0;
    } else if (id > data.R) {
      rside(id);
    } else if (id < data.L) {
      lside(id);
    } else {
      var n2 = data.L;
      while (data.tag[n2] === null) { n2++; }
      var [l, r] = [id, n2]; if (l > r) [l, r] = [r, l];
      if ((data.R - r === l - data.L && random(2) === 0) || data.R - r > l - data.L) {
        data.L = l + 1;
        lside(id);
      } else {
        data.R = r - 1;
        rside(id);
      }
    }
    data.Min = Math.max(
      data.Min,
      2 * Math.abs(data.L - data.R) + Math.abs(data.L - id),
      2 * Math.abs(data.L - data.R) + Math.abs(data.R - id)
    );
    if (data.Min === 0) { this.task[0].set(1); }
    data.tag[id] = data.Min;
    this.arr[id].text = data.Min;
    this.arr[id].color = (data.Min === 0 ? red : blue);
  };
  stage.update = function () {
  };
  stage.INIT();
});