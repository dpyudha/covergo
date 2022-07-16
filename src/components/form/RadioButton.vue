/*
| ===================================================
| This File is for form radio button component
| ===================================================
*/
<template>
  <div :class="{ 'text-red-400': !valid && isTriggered }">
    <div
      v-for="(option, i) in options"
      :key="i"
    >
      <input
        :id="`${name}-${option.value}`"
        v-model="fieldValue"
        type="radio"
        :name="name"
        :value="option.value"
        @change="change"
      >
      <label class="cursor-pointer" :for="`${name}-${option.value}`">
        {{ option.label }}
      </label>
    </div>
  </div>
</template>
<script>
import fieldMixins from '../../mixins/field'

export default {
  mixins: [fieldMixins],
  props: {
    options: {
      type: Array,
      required: true,
      validator: (arr) => {
        const checkKeys = arr.map(ar => typeof ar.label !== 'undefined' || typeof ar.value !== 'undefined')
        return !checkKeys.includes(false)
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  created () {
    this.fieldValue = this.value
  },
  methods: {
    change () {
      this.validation()
      this.$emit('input', this.fieldValue)
    }
  }
}
</script>