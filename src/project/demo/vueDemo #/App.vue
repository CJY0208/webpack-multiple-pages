<template>
  <div>
    Hello Vue, I am {{`${name}`}}
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

<style>

* {
  color: blue;
  font-size: 24px;
}
</style>
