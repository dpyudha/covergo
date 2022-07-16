/*
| ===================================================
| This File is for form select field component
| ===================================================
*/
<template>
  <div>
    <p
      class="text-sm mb-1"
      :class="{ 'text-red-400' : !valid && isTriggered }"
    >
      {{ !valid && isTriggered ? 'This field is required' : label }}
    </p>
    
    <select
      v-model="fieldValue"
      :name="name"
      class="px-4 h-12 py-2 bg-white border w-full focus:outline-none focus:border-black border-black rounded-md"
      :class="{ 'border-red-400': !valid && isTriggered, 'border-blue-500': valid && isTriggered }"
      @change="change"
    >
      <option
        v-for="(option, i) in options"
        :key="i"
        :value="option.value"
        :disabled="option.disabled"
        :selected="i === 0"
      >
        {{ option.label }}
      </option>
    </select>
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
    },
    label: {
      type: String,
      default: 'Label'
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
