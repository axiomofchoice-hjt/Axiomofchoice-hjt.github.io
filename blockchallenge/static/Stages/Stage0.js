stageList.push(function (id) {
  const col = 5;
  stage = stageGen({
    gridSize: [Math.floor((stageList.length - 1 + col - 1) / col), col],
    message: `请选择关卡`,
    task: [
      [0, stageList.length - 1, equal],
    ],
  });
  stage.init = function () {
    var data = this.data;
    this.fillNumber();
    for (let i = stageList.length - 1; i < this.blockNum(); i++) {
      this.get(i).text = "";
      this.get(i).color = "white";
    }
  };
  stage.click = function (x, y, id) {
    var data = this.data;
    if (id >= stageList.length - 1) {
      return;
    }
    stageId = id + 1;
    stageList[stageId](stageId);
  };
  stage.update = function () {
    this.task[0].set(0);
    for (let i = 0; i < stageList.length - 1; i++) {
      this.get(i).color = stageOKList.get(i) ? yellow : grey;
      this.task[0].add(stageOKList.get(i));
    }
  };
  stage.INIT();
});