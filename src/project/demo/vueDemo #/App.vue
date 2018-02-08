<template>
  <div>
    Hello Vue, I am {{`${name} lalala`}}
  </div>
</template>

<script>
export default {
  data: () => ({
    name: 'CJY'
  })
}
</script>

<style>

* {
  color: blue;
  font-size: 24px;
}
</style>

