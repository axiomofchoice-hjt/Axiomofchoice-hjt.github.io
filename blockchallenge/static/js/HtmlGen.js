function blockHtml(o) {
  return `
    <div class="block-outer" style="height: ${o.size}px; width: ${o.size}px; top: ${o.posX}px; left: ${o.posY}px;" onmousedown="if (event.button === 0) stage.CLICK(${o.id});">
      <div class="block-inner" style="height: ${o.size - o.gap}px; width: ${o.size - o.gap}px; line-height: ${o.size - o.gap}px; background-color: ${o.color}; font-size: ${o.size * 0.45}px;">
        ${o.text}
      </div>
    </div>
  `;
}

function blocksHtml(o) {
  var body = "";
  for (let i = 0; i < o.arr.length; i++) {
    body += blockHtml({
      id: i,
      text: o.arr[i].text,
      size: o.blockSize,
      gap: o.gap,
      color: o.arr[i].color,
      posX: (Math.floor(i / o.col)) * o.blockSize + o.gap / 2,
      posY: (i % o.col) * o.blockSize + o.gap / 2,
    });
  }
  return `
    <div class="blocks-inner" style="height: ${o.row * o.blockSize + o.gap}px; width: ${o.col * o.blockSize + o.gap}px; margin-top: ${-(o.row * o.blockSize + o.gap + 2) / 2}px; margin-left: ${-(o.col * o.blockSize + o.gap + 2) / 2}px;">
      ${body}
    </div>
  `;
}

// 页尾，显示类似“任务：[0/1][0/6]”的文字
// 对于每个子任务，会有绿色（符合要求）和红色（不符合要求）的变化
function footerHtml(o) {
  var content = "";
  for (let i of o.task) {
    content += `<span style="color: ${i.ok() ? tGreen : black}; font-weight: ${i.ok() ? "bold" : "none"};">[${i.counter}/${i.target}]</span>`;
  }
  return `
    <div class="footer-hint" style="background-color: ${o.ok() ? "#FFE300" : white};">
      任务：${content}
    </div>
  `;
}

// 输出总的一个 Html
function HtmlGen(o) {
  return `
      <div class="header-hint">${o.message}</div>
      ${blocksHtml(o)}
      ${footerHtml(o)}
      <div class="buttons-outer">
      <img class="button-inner" style="top: -80px" src="./static/img/back.png" alt="图标加载失败" onmousedown="if (event.button === 0) backEvent();" />
      <img class="button-inner" src="./static/img/restart.png" alt="图标加载失败" onmousedown="if (event.button === 0) restartEvent();" />
      <img class="button-inner" style="top: 80px" src="./static/img/info.png" alt="图标加载失败" onmousedown="if (event.button === 0) infoEvent();" title="功能未实现" />
      </div>
  `;
}