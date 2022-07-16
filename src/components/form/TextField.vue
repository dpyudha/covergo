<template>
  <div class="relative">
    <p
      class="text-sm mb-1"
      :class="{ 'text-red-400' : !valid && isTriggered }"
    >
      {{ !valid && isTriggered ? 'This field is required' : label }}
    </p>
    <input
      v-bind="$props"
      v-model="fieldValue"
      class="px-4 h-12 py-2 bg-white border w-full focus:outline-none border-black rounded-md"
      :class="{ 'border-red-400': !valid && isTriggered, 'border-blue-500': valid && isTriggered }"
      @input="input"
      @blur="validation"
    >
  </div>
</template>
<script>
import fieldMixins from '../../mixins/field'

export default {
  mixins: [fieldMixins],

  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    label: {
      type: String,
      default: 'Label'
    }
    
  },

  methods: {
    input () {
      this.isTriggered = false
      this.valid = false
      this.$emit('input', this.fieldValue)
    }
  }
}
</script>