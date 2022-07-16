/*
| ===================================================
| This File is for form wizard wrapper component
| ===================================================
*/
<template>
  <div>
    <h1
      v-if="steps.length > 0"
      class="text-center mb-4 text-xl text-gray-400"
    >
      {{ steps[currentStep].title }}
    </h1>
    <ul class="flex items-center justify-center mx-auto">
      <li
        v-for="(step, index) in steps"
        :key="index"
        class="relative mx-20 border font-medium w-[50px] h-[50px] rounded-full inline-flex items-center justify-center border-gray-400"
        :class="{
          'bg-indigo-400 text-white': currentStep >= index,
          'before:content-[` `] before:block before:absolute before:h-1 before:w-[160px] before:-right-[160px]':
            index < steps.length - 1,
          'before:bg-indigo-400': currentStep >= index,
          'before:bg-gray-400': currentStep <= index,
        }"
      >
        {{ index + 1 }}
      </li>
    </ul>
    <div>
      <form ref="form">
        <slot />
      </form>
    </div>

    <!-- controls -->
    <div
      v-if="error && triggerError"
      class="flex justify-center"
    >
      <cg-button
        class="w-[214px]"
        @click="reset"
      >
        Ok :(
      </cg-button>
    </div>
    <div
      v-else
      class="flex justify-center px-10 relative"
    >
      <cg-button
        v-if="currentStep === 0"
        class="w-[214px]"
        @click="next"
      >
        Start
      </cg-button>
      <div
        v-else-if="currentStep === steps.length - 1"
        class="flex justify-between w-full fixed max-w-screen-lg top-20"
      >
        <cg-button
          theme="light"
          class="mr-3"
          @click="prev"
        >
          Back
        </cg-button>
        <cg-button @click="reset">
          Buy
        </cg-button>
      </div>
      <div
        v-else
        class="flex justify-between w-full fixed max-w-screen-lg top-20"
      >
        <cg-button
          theme="light"
          class="mr-3"
          @click="prev"
        >
          Back
        </cg-button>
        <cg-button @click="next">
          Next
        </cg-button>
      </div>
    </div>
  </div>
</template>
<script>
import CgButton from "../common/CgButton.vue";
export default {
  name: "FormWizard",
  components: { CgButton },

  props: {
    error: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      steps: [],
      currentStep: 0,
      totalSteps: 0,
      triggerError: false,
    };
  },

  mounted() {
    this.steps = this.$children.filter((child) => child.title);
    this.currentStep = this.steps.findIndex((step) => step.active);
    this.totalSteps = this.steps.length;
  },

  methods: {
    async next() {
      if (this.steps[this.currentStep].hasForm) {
        if (this.error) {
          this.errorChecker();
          return;
        }

        const getFields = this.steps[this.currentStep].$children;
        let valid = true;
        await getFields.forEach((field) => {
          field.validation();
        });

        await getFields.forEach((field) => {
          if (!field.valid) {
            valid = false;
            return;
          }
        });

        if (!valid) {
          return;
        }
      }
      if (this.currentStep < this.totalSteps - 1) {
        this.switchStep(this.currentStep + 1);
      }
    },

    errorChecker() {
      this.triggerError = true;
      this.steps[this.currentStep].error = true;
    },

    prev() {
      if (this.currentStep > 0) {
        this.switchStep(this.currentStep - 1);
      }
    },

    switchStep(index) {
      this.steps.forEach((step) => {
        step.active = false;
        step.error = false;
      });
      this.currentStep = index;
      this.steps[index].active = true;
    },

    reset() {
      this.switchStep(0);
      this.triggerError = false;
      this.$emit("reset", true);
    },
  },
};
</script>
