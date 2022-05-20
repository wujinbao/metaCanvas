<template>
  <div ref="animationExamples">
    <h1 class="title">
      {{ Title }}
    </h1>
    <div class="content-container">
      <h3>{{ contentTitle }}</h3>
      <p v-for="(content, index) of contentArray" :key="index">
        {{ content }}
      </p>
      <h3>{{ describeTitle }}</h3>
      <p v-for="(content, index) of describeArray" :key="index">
        {{ content }}
      </p>
      <div class="form-container">
        <div>
          <h3>{{ animationTitle }}</h3>
          <form @submit.prevent="rectSubmit">
            <div>
              <span style="margin-right: 63px">direction</span>
              <select ref="select">
                <option>left</option>
                <option>right</option>
                <option>up</option>
                <option>down</option>
              </select>
            </div>
            <div v-for="(data, index) of rectFormData" :key="index">
              <div class="form-content-container">
                <span>{{ data.title }}: </span>
                <input type="text" v-model="data.value" />
              </div>
            </div>
            <input type="submit" value="设置完成" class="submit" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Canvas, Rect } from "@/modules/index";

export default defineComponent({
  name: "animationExamples",
  data() {
    return {
      rect: new Rect(),
      Title: "动画演示",
      contentTitle: "绘制图形步骤：",
      contentArray: [
        "第一步：创建画布 Canvas 实例 - let canvas = new Canvas()。",
        "第二步：创建矩形 Rect 实例 - let rect = new Rect()。",
        "第三步：通过画布上的 add 方法把图形 rect 添加到画布 Canvas 上 - canvas.add([rect])。",
      ],
      describeTitle: "添加动画效果及方法使用描述：",
      describeArray: [
        "1. 通过图形上的 animation 方法来添加动画效果 - rect.animation()。",
        "2. animation 方法：有三个参数，分别是动画方向、动画结束位置及动画速度参数对象",
        "3. 动画速度参数对象分别有: vx 横向速度; vy 纵向速度; sx 横向加速度; sy 纵向加速度。",
      ],
      animationTitle: "设置动画参数值：",
      rectFormData: [
        {
          title: "distance",
          value: 0,
        },
        {
          title: "vX",
          value: 0,
        },
        {
          title: "vY",
          value: 0,
        },
        {
          title: "sX",
          value: 0,
        },
        {
          title: "sY",
          value: 0,
        },
      ],
    };
  },
  // eslint-disable-next-line prettier/prettier
  methods: {
    drawShape: function () {
      let animationExamplesDOM = this.$refs.animationExamples;
      let canvas = new Canvas({
        dom: animationExamplesDOM,
      });
      let rect = new Rect({
        left: 50,
        top: 50,
        width: 50,
        height: 50,
        stroke: "red",
      });
      canvas.add([rect]);
      this.rect = rect;
    },
    rectSubmit: function (e) {
      let direction = this.$refs.select.value;
      let distance = 0;
      let animationOption = {};
      this.rectFormData.map((item, index) => {
        if (index > 0) {
          animationOption[item.title] =
            typeof item.value == "number" ? item.value : Number(item.value);
        } else {
          distance =
            typeof item.value == "number" ? item.value : Number(item.value);
        }
      });
      this.rect.animation(direction, distance, animationOption);
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
