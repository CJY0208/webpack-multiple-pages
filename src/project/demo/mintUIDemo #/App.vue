<template>
  <div>
    <button @click="openPicker()">打开DateTime Picker</button>
    <mt-datetime-picker
      ref="picker"
      type="time"
      v-model="pickerValue"
      @confirm="handleConfirm()">
    </mt-datetime-picker>
    <div>{{pickerValue}}</div>
  </div>
</template>

<script>
export default {
  methods: {
    openPicker() {
      this.$refs.picker.open()
    },
    handleConfirm() {
      console.log(this.pickerValue)
    }
  }
}
</script>
