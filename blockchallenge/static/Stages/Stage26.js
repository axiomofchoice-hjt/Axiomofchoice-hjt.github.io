stageList.push(function (id) {
  stage = stageGen({
    gridSize: [7, 7],
    // blockSize: "small",
    message: `第${toChinese(id)}关 贪吃蛇游戏 请点击方向键`,
    task: [
      [0, 16, equal],
    ],
  });
  stage.dirKeyDown = function (x, y, dir, v) {
    let _v = vecAdd(this.data.head(), v);
    if (this.inArea(_v))
      this.CLICK(this.getId(_v));
  };
  stage.init = function () {
    var data = this.data;
    data.player = [[6, 6], [6, 5], [6, 4]];
    data.obstacle = [[0, 0], [0, 5], [5, 1], [5, 2],
    [5, 3], [5, 4], [5, 6], [3, 3]];
    data.food = [
      [6, 2], [6, 1], [5, 0],
      [5, 5], [0, 1], [0, 4], [0, 6],
      [4, 1], [1, 5], [2, 5], [1, 4], [1, 1],
      [3, 4], [3, 6], [3, 2], [4, 2]
    ];
    data.head = () => {
      return this.data.player[this.data.player.length - 1];
    };
    data.find = (A, v) => {
      for (let i = 0; i < A.length; i++)
        if (vecEqual(A[i], v))
          return i;
      return -1;
    };
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (mdist(data.head(), v) != 1) return;
    if (data.find(data.obstacle, v) != -1) return ;
    if (data.find(data.player, v) != -1) return ;
    if (data.find(data.food, v) != -1) {
      data.player.shift();
      data.food.splice(data.find(data.food, v), 1);
      this.task[0].add(1);
    }
    data.player.push(v);
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < this.row; i++)
      for (let j = 0; j < this.col; j++) {
        this.get(i, j).color = grey;
        this.get(i, j). text = "";
      }
    for (let i of data.player)
      this.get(i).color = blue;
    this.get(data.head()).text = "P";
    for (let i of data.obstacle) {
      this.get(i).color = orange;
      this.get(i).text = "□"
    }
    for (let i of data.food) {
      this.get(i).color = yellow;
      this.get(i).text = "Au"
    }
  };
  stage.INIT();
});