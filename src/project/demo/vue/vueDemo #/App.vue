<template>
  <div>
    Hello Vue, I am {{`${name}`}} lalala
  </div>
</template>

<script>
export default {
  data: () => ({
    name: 'CJY'
  })
}

// var a = 1
</script>

<style lang="scss">

* {
  color: blue;
  font-size: 24px;
  // height: 100vh;
  div {
    color: red;
  }
}
</style>
