<template>
  <nav>
    <router-link to="/">basicShape</router-link> |
    <router-link to="/mouseSelectorView">mouseSelectorView</router-link> |
    <router-link to="/animationExamplesView">animationExamplesView</router-link>
    |
    <router-link to="/allBasicShapeView">allBasicShapeView</router-link>
  </nav>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 10px;
  text-align: center;
}

.title {
  text-align: center;
}
</style>
