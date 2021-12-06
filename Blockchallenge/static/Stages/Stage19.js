stageList.push(function (id) {
  stage = stageGen({
    gridSize: [7, 5],
    // blockSize: "small",
    message: `第${toChinese(id)}关 博弈游戏 让对方无法操作 请点击方块`,
    task: [
      [0, 1, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    data.arr = [4, 5, 3, 2, 4];
    data.visited = [0, 0, 0, 0, 0];
    data.winState = () => {
      for (let i = 0; i < 5; i++) if (data.arr[i] % 2 == 1) return true;
      return false;
    };
  };
  stage.click = function (x, y, id, v) {
    var data = this.data;
    if (x == 6) {
      if (y != 2) return;
      if (ArraySum(data.visited) == 0) return;
      for (let i = 0; i < 5; i++) data.visited[i] = 0;
      if (ArraySum(data.arr) == 0) {
        this.task[0].set(1);
        return;
      }
      if (data.winState()) {
        for (let i = 0; i < 5; i++)
          if (data.arr[i] % 2 == 1)
            data.arr[i]--;
        return;
      } else {
        while (1) {
          let op = [random(2), random(2), random(2), random(2), random(2)];
          let ok = false;
          for (let i = 0; i < 5; i++) {
            if (op[i] && data.arr[i] != 0) ok = true;
          }
          if (ok) {
            for (let i = 0; i < 5; i++) {
              if (op[i] && data.arr[i] != 0) data.arr[i]--;
            }
            return;
          }
        }
      }
      return;
    }
    x = 5 - x;
    if (x != data.arr[y]) return;
    if (!data.visited[y] && x == 0) return;
    data.arr[y] += (data.visited[y] ? 1 : -1);
    data.visited[y] ^= 1;
  };
  stage.update = function () {
    var data = this.data;
    for (let i = 0; i < 6; i++)
    for (let j = 0; j < 5; j++) {
      this.get(i, j).text = "";
      this.get(i, j).color = grey;
    }
    for (let i = 0; i < data.arr.length; i++) {
      this.get(5 - data.arr[i], i).text = "P";
      this.get(5 - data.arr[i], i).color = (data.visited[i] ? blue : data.arr[i] != 0 ? yellow : grey);
    }
    for (let j = 0; j < 5; j++) {
      this.get(6, j).text = "";
      this.get(6, j).color = white;
    }
    this.get(6, 2).text = "=>";
    this.get(6, 2).color = (ArraySum(data.visited) != 0 ? yellow : grey);
    // for (let i = 0; i < data.arr.length; i++) {
    //   this.get(i).text = ["P", ""][data.arr[i]];
    //   this.get(i).color = [grey, yellow][data.ok(i)];
    // }
    // for (let i = 0; i < data.arr.length - 1; i++) this.get(1, i).color = white;
    // this.get(5, 5).text = data.state && ArraySum(data.arr) == 0 ? "☆" : "=>";
    // this.get(5, 5).color = data.state ? yellow : grey;
  };
  stage.INIT();
});