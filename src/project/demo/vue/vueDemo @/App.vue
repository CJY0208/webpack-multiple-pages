<template>
  <div>
    Hello Vue, I am {{name}} lalala
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

<style lang="postcss">

:root {
  --mainColor: gray(70);
}

* {
  color: var(--mainColor);
  font-size: 24px;
  // height: 100vh;
  & div {
    color: red;
  }
}
</style>
