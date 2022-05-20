<template>
  <div ref="mouseSelector">
    <h1 class="title">
      {{ Title }}
    </h1>
    <div class="content-container">
      <h3>{{ contentTitle }}</h3>
      <p v-for="(content, index) of contentArray" :key="index">
        {{ content }}
      </p>
      <h3>{{ mouseSelectorTitle }}</h3>
      <p>{{ mouseSelectorContent }}</p>
      <div @click="isSelector">
        <div>
          <label>
            <span>false</span>
            <input type="radio" v-model="selectorValue" value="false" />
          </label>
        </div>
        <div>
          <label>
            <span>true</span>
            <input type="radio" v-model="selectorValue" value="true" />
          </label>
        </div>
      </div>
      <h3>{{ mouseOperation }}</h3>
      <p v-for="(content, index) of mouseOperationContent" :key="index">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Canvas, Rect, Circle } from "@/modules/index";

export default defineComponent({
  name: "mouseSelector",
  data() {
    return {
      rect: new Rect(),
      circle: new Circle(),
      Title: "鼠标操作图形",
      contentTitle: "绘制图形步骤：",
      contentArray: [
        "第一步：创建画布 Canvas 实例 - let canvas = new Canvas()。",
        "第二步：创建矩形 Rect 实例 - let rect = new Rect()。",
        "第三步：通过画布上的 add 方法把图形 rect 添加到画布 Canvas 上 - canvas.add([rect])。",
      ],
      mouseSelectorTitle: "鼠标控制器是否开启：",
      mouseSelectorContent:
        "通过属性 selectable 值为 false 或 true 来实现控制器的开启。",
      selectorValue: "false",
      mouseOperation: "鼠标操作描述：",
      mouseOperationContent: [
        "1. 图形内按下鼠标可以平移图形。",
        "2. 鼠标点击图形 8 个顶点分别可以左上、向上、右上、向右、右下、向下、左下、向左的放大与缩小图形。",
        "3. 鼠标点击图形上面顶点可以旋转图形。",
      ],
    };
  },
  // eslint-disable-next-line prettier/prettier
  methods: {
    drawShape: function () {
      let mouseSelectorDOM = this.$refs.mouseSelector;
      let canvas = new Canvas({
        dom: mouseSelectorDOM,
      });
      let rect = new Rect({
        left: 50,
        top: 50,
        width: 50,
        height: 50,
        stroke: "red",
        angle: 30,
      });
      canvas.add([rect]);
      this.rect = rect;
    },
    isSelector: function (e) {
      let selectorValue = this.selectorValue == "false" ? true : false;
      this.rect.set({
        selectable: selectorValue,
      });

      this.rect.canvas.renderAll();
    },
  },
  mounted() {
    this.drawShape();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.title {
  text-align: center;
}
.content-container {
  text-align: left;
}
.form-container {
  display: flex;
  width: 950px;
  justify-content: space-between;
}
.form-content-container {
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  width: 300px;
}
.submit {
  margin: 40px 100px;
  color: aliceblue;
  background-color: darkgreen;
}
</style>
