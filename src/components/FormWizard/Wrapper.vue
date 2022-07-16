/*
| ===================================================
| This File is for form wizard wrapper component
| ===================================================
*/
<template>
  <div>
    <h1
      v-if="tabs.length > 0"
      class="text-center mb-4 text-xl text-gray-400"
    >
      {{ tabs[currentTab].title }}
    </h1>
    <ul class="flex items-center justify-center mx-auto">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="relative mx-20 border font-medium w-[50px] h-[50px] rounded-full inline-flex items-center justify-center border-gray-400"
        :class="{
          'bg-indigo-400 text-white': currentTab >= index,
          'before:content-[` `] before:block before:absolute before:h-1 before:w-[160px] before:-right-[160px]':
            index < tabs.length - 1,
          'before:bg-indigo-400': currentTab >= index,
          'before:bg-gray-400': currentTab <= index,
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
        v-if="currentTab === 0"
        class="w-[214px]"
        @click="next"
      >
        Start
      </cg-button>
      <div
        v-else-if="currentTab === tabs.length - 1"
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
      tabs: [],
      currentTab: 0,
      totalTabs: 0,
      triggerError: false,
    };
  },

  mounted() {
    this.tabs = this.$children.filter((child) => child.title);
    this.currentTab = this.tabs.findIndex((tab) => tab.active);
    this.totalTabs = this.tabs.length;
  },

  methods: {
    async next() {
      if (this.tabs[this.currentTab].hasForm) {
        if (this.error) {
          this.errorChecker();
          return;
        }

        const getFields = this.tabs[this.currentTab].$children;
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
      if (this.currentTab < this.totalTabs - 1) {
        this.switchTab(this.currentTab + 1);
      }
    },

    errorChecker() {
      this.triggerError = true;
      this.tabs[this.currentTab].error = true;
    },

    prev() {
      if (this.currentTab > 0) {
        this.switchTab(this.currentTab - 1);
      }
    },

    switchTab(index) {
      this.tabs.forEach((tab) => {
        tab.active = false;
        tab.error = false;
      });
      this.currentTab = index;
      this.tabs[index].active = true;
    },

    reset() {
      this.switchTab(0);
      this.triggerError = false;
      this.$emit("reset", true);
    },
  },
};
</script>
