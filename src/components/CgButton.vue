<template>
  <button
    :class="themeClass"
    class="px-8 py-3 rounded-md"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
<script>
import { DEFAULT, LIGHT } from "../constants";
export default {
  props: {
    theme: {
      type: String,
      default: "default",
      validator: (value) => {
        return [DEFAULT, LIGHT].includes(value);
      },
    },
  },

  computed: {
    themeClass() {
      const themes = {
        [DEFAULT]: "bg-black text-white border border-black hover:bg-white hover:text-black",
        [LIGHT]: "bg-white border border-black text-black hover:bg-black hover:text-white",
      };
      return themes[this.theme];
    },
  },
};
</script>
