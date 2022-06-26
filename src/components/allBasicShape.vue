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
      <h3>{{ describeTitle }}</h3>
      <p v-for="(describe, index) of describeArray" :key="index">
        {{ describe }}
      </p>
      <h3>每个图形属性值的获取与设置通过 get 和 set 方法实现</h3>
      <p>get 方法: 参数是一个 string 类型</p>
      <p>set 方法: 参数是一个 PartialDrawParam 对象类型</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Canvas, Rect, Circle, Triangle, Ellipse } from "@/modules/index";

export default defineComponent({
  name: "basicShape",
  data() {
    return {
      rect: new Rect(),
      circle: new Circle(),
      Title: "绘制基本形状",
      contentTitle: "绘制图形步骤：",
      contentArray: [
        "第一步：创建画布 Canvas 实例 - let canvas = new Canvas()。",
        "第二步：创建矩形 Rect 实例和圆形 Circle 实例 - let rect = new Rect(); let rect = new Circle()。",
        "第三步：通过画布上的 add 方法把图形 rect 和 circle 添加到画布 Canvas 上 - canvas.add([rect, circle])。",
      ],
      describeTitle: "属性描述说明：",
      describeArray: [
        "Canvas 实例: 参数是一个对象类型，可以传入 width (类型 number)、height (类型 number) 去设置画布的大小，默认值 width 为 800, height 为 600。add 方法传入的参数类型是一个数组，数组里的类型为图形的实例对象。",
        "Rect 实例：参数是一个对象类型，可以传入 left (类型 number)、top (类型 number) 去设置矩形的摆放位置, width (类型 number)、height (类型 number) 去设置矩形的大小, stroke (类型 string)、fill (类型 string) 去设置矩形描边与填充的颜色，剩下属性可以自行去了解学习。",
        "Circle 实例：参数是一个对象类型，可以传入 left (类型 number)、top (类型 number) 去设置圆形的摆放位置, radius (类型 number) 去设置圆形的大小, stroke (类型 string)、fill (类型 string) 去设置圆形描边与填充的颜色，剩下属性可以自行去了解学习。",
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
      canvas.add([rect, triangle, ellipse]);
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
