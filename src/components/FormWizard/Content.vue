<template>
  <div
    v-if="active"
    class="p-10"
  >
    <div v-if="!error">
      <slot />
    </div>
    <div
      v-else
      class="text-center"
    >
      <slot name="error" />
    </div>
  </div>
</template>
<script>
export default {
  name: "FormWizardContent",

  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    hasForm: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      active: false,
      error: false,
    };
  },

  created() {
    this.active = this.selected;
  },
};
</script>
