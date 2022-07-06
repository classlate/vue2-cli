<script>
// import precess from 'process'
const env = process.env
// console.log(process)
export default {
  data() {
    return {
      env,
    }
  },
}
</script>

<template>
  <div class="container">
    <div class="box">
      这里是App; {{ env.NODE_DEV }}
    </div>
  </div>
</template>

<style lang="less">
.container {
  .box {
    width: 500px;
    height: 200px;
    color: #fff;
    background-color: #000;
  }
}
</style>
