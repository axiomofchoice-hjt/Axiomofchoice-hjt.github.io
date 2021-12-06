stageList.push(function (id) {
  stage = stageGen({
    gridSize: [5, 5],
    // blockSize: "small",
    message: `第${toChinese(id)}关 吃银币游戏 请点击方块或方向键`,
    task: [
      [0, 7, greaterEqual],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.dir = [[-1, 0], [0, -1], [0, 1], [1, 0]];
    data.vertexPos = [[0, 2], [2, 0], [2, 4], [4, 2]];
    data.player = 0;
    data.edge = [
      [0, 0, 1, 4],
      [0, 0, "inf", 0],
      ["inf", 1, 0, 0],
      [0, 1, -2, 0]
    ];
  };
  stage.dirKeyDown = function(x, y, dir, v) {
    let _v = [x * 2 + 2, y * 2 + 2];
    this.CLICK(this.getId(_v));
  }
  stage.click = function (x, y, id, v) {
    var data = this.data;
    var to = -1;
    for (let i = 0; i < 4; i++) {
      if (vecEqual(data.vertexPos[i], v))
        to = i;
      if (vecEqual(vecAdd(data.vertexPos[data.player], data.dir[i]), v))
        to = i;
    }
    if (to == -1) return;
    var e = data.edge[data.player];
    if (e[to] == 0) return;
    if (e[to] !== "inf") {
      if (e[to] > 0) {
        e[to]--;
      } else {
        e[to]++;
        if (e[to] == 0) {
          for (let i = 0; i < 4; i++)
          for (let j = 0; j < 4; j++)
            if (data.edge[i][j] === "inf")
            data.edge[i][j] = 1;
        }
      }
    }
    data.player = to;
    this.task[0].set(7);
    for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
    if (data.edge[i][j] !== 0)
      this.task[0].add(-1);
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < this.blockNum(); i++) {
      this.get(i).color = white;
      this.get(i).text = "";
    }
    for (let i = 0; i < 4; i++) {
      this.get(data.vertexPos[i]).color = (data.player == i ? blue : grey);
      this.get(data.vertexPos[i]).text = (data.player == i ? "P" : "");
      for (let j = 0; j < 4; j++) if (i != j) {
        let k = this.get(vecAdd(data.vertexPos[i], data.dir[j]));
        if (data.edge[i][j] === "inf") {
          k.color = yellow;
          k.text = "∞";
        } else if (data.edge[i][j] == 0) {
          k.color = white;
        } else if (data.edge[i][j] > 0) {
          k.color = green;
          k.text = "" + data.edge[i][j];
        } else {
          k.color = orange;
          k.text = "" + (-data.edge[i][j]);
        }
      }
    }
  };
  stage.INIT();
});