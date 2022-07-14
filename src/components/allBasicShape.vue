<template>
  <div>
    <h1 class="title">
      {{ Title }}
    </h1>
    <div class="content-container">
      <h3>{{ contentTitle }}</h3>
      <p v-for="(content, index) of contentArray" :key="index">
        {{ content }}
      </p>
    </div>
    <canvas ref="basicShape"></canvas>
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
      Title: "绘制基本形状",
      contentTitle: "绘制图形步骤：",
      contentArray: [
        "第一步：创建画布 Canvas 实例 - let canvas = new Canvas()。",
        "第二步：创建矩形 Rect 实例 - let rect = new Rect()；创建圆形 Circle 实例 - let circle = new Circle()；创建三角形 Triangle 实例 - let triangle = new Triangle()；创建椭圆 Ellipse 实例 - let ellipse = new Ellipse()；创建图片 Picture 实例 - let picture = new Picture()。",
        "第三步：通过画布上的 add 方法把图形 rect、circle、triangle、ellipse、picture 添加到画布 Canvas 上 - canvas.add([rect, circle, triangle, ellipse, picture])。",
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
        stroke: "red",
      });
      let circle = new Circle({
        left: 400,
        top: 300,
        radius: 50,
        stroke: "green",
      });
      let triangle = new Triangle({
        left: 80,
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
        left: 200,
        top: 250,
        width: 100,
        height: 100,
        imgSrc: "https://www.runoob.com/try/demo_source/img_the_scream.jpg",
      });
      canvas.add([rect, circle, triangle, ellipse, picture]);
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
