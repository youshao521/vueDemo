<template>
  <div class="demo-content">
    <div class="block">
      <span>正在建设中......</span>
      <div class="image"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo',
  methods: {
    foo() {
      return 42;
    },
  },
};
</script>

<style scoped>
.demo-content {
  box-sizing: border-box;
  padding-top: 68px;
  text-align: center;
  clear: both;
  height: 100%;
  width: 100%;
}
.demo-container {
  text-align: center;
}
.block {
  top: 50%;
  position: relative;
  margin-top: -238px;
  & .image {
    height: 440px;
    background: url(../../assets/non_page.png) no-repeat center;
  }
  & span {
    font-size: 32px;
    color: #666;
    font-weight: bold;
  }
}
</style>
