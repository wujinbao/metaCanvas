<template>
  <div ref="basicShape">
    <h1 class="title">
      {{ Title }}
    </h1>
    <div class="content-container">
      <h3>{{ contentTitle }}</h3>
      <p v-for="(content, index) of contentArray" :key="index">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  Canvas,
  Rect,
  Circle,
  Triangle,
  Ellipse,
  Picture,
} from "metacanvas-npm";

export default defineComponent({
  name: "basicShape",
  data() {
    return {
      rect: new Rect(),
      Title: "绘制基本形状",
      contentTitle: "绘制图形步骤：",
      contentArray: [
        "第一步：创建画布 Canvas 实例 - let canvas = new Canvas()。",
        "第二步：创建矩形 Rect 实例 - let rect = new Rect()。",
        "第三步：通过画布上的 add 方法把图形 rect 添加到画布 Canvas 上 - canvas.add([rect])。",
      ],
    };
  },
  // eslint-disable-next-line prettier/prettier
  methods: {
    drawShape: function () {
      let basicShapeDOM = this.$refs.basicShape;
      let canvas = new Canvas({
        dom: basicShapeDOM,
      });
      let rect = new Rect({
        left: 50,
        top: 50,
        width: 100,
        height: 100,
        // scaleWidth: 2,
        stroke: "red",
      });
      let circle = new Circle({
        left: 500,
        top: 300,
        radius: 50,
        stroke: "green",
      });
      let triangle = new Triangle({
        left: 150,
        top: 250,
        width: 50,
        height: 100,
        stroke: "blue",
      });
      let ellipse = new Ellipse({
        left: 350,
        top: 100,
        rX: 80,
        rY: 40,
        stroke: "yellow",
      });
      let picture = new Picture({
        left: 300,
        top: 250,
        width: 100,
        height: 100,
        imgSrc: "https://www.runoob.com/try/demo_source/img_the_scream.jpg",
      });
      canvas.add([rect, triangle, ellipse, picture]);
      this.rect = rect;
    },
  },
  mounted() {
    this.drawShape();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
