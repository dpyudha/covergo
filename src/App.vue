<template>
  <div id="app">
    <section class="max-w-screen-lg mx-auto px-4 py-10">
      <form-wizard-wrapper
        :error="ageChecker"
        @reset="reset"
      >
        <form-wizard-content
          :selected="true"
          title="Intro"
          :has-form="false"
        >
          <div class="text-center">
            <h1 class="text-3xl font-bold mb-4">
              Hello There !
            </h1>
            <p>Let's buy some insurance. It is going to take only few steps</p>
          </div>
        </form-wizard-content>
        <form-wizard-content
          title="About You"
        >
          <div class="max-w-sm mx-auto">
            <text-field
              v-model="formData.name"
              :value="formData.name"
              type="text"
              label="Name"
              placeholder="Name"
              class="mb-4"
              name="name"
              required
            />
            <text-field
              v-model="formData.age"
              :value="formData.age"
              type="number"
              label="Age"
              placeholder="Age"
              class="mb-4"
              name="age"
              required
            />
            <select-field
              v-model="formData.country"
              value="formData.country"
              label="Country"
              name="country"
              class="mb-4"
              required
              :options="[
                {
                  label: 'Hong Kong',
                  value: 'Hong Kong',
                },
                {
                  label: 'USA',
                  value: 'USA',
                },
                {
                  label: 'Australia',
                  value: 'Australia',
                },
              ]"
            />
            <radio-button
              v-model="formData.package"
              :value="formData.package"
              name="package"
              required
              :options="packages"
            />
          </div>
          <h1
            v-if="premium !== 0"
            class="text-2xl font-bold text-center mt-10"
          >
            Your Premium is: {{ premium }}
          </h1>
          <div
            v-else
            class="text-center mt-10"
          >
            <p>You will see the Premium after fill up all field</p>
          </div>
          <template #error>
            <h1 class="text-2xl font-semibold">
              Ooops
            </h1>
            <p>Your age is over our accepted limit.</p>
            <p>We are sorry but we cannot insure you now</p>
          </template>
        </form-wizard-content>
        <form-wizard-content
          title="Summary"
          :has-form="false"
        >
          <div class="text-center">
            <h1 class="text-2xl font-semibold">
              Summary
            </h1>

            <h3 class="text-lg font-semibold capitalize mt-5">
              Hi {{ formData.name }},
            </h3>
            <p>Name : {{ formData.name }}</p>
            <p>Age : {{ formData.age }}</p>
            <p>Where do you live : {{ formData.country }}</p>
            <p>Package : {{ packageLabel }}</p>
            <p>Premium : {{ premium }}</p>
          </div>
        </form-wizard-content>
      </form-wizard-wrapper>
    </section>
  </div>
</template>
<script>
import FormWizardWrapper from "./components/FormWizard/Wrapper.vue";
import FormWizardContent from "./components/FormWizard/Content.vue";
import TextField from "./components/form/TextField.vue";
import SelectField from "./components/form/SelectField.vue";
import RadioButton from "./components/form/RadioButton.vue";
import { COUNTRY_DATA, PREMIUM_CONSTANT, MAX_AGE } from "./constants";
export default {
  components: { FormWizardWrapper, FormWizardContent, TextField, SelectField, RadioButton },

  data() {
    return {
      formData: {
        name: "",
        age: "",
        country: "Hong Kong",
        package: "0",
      },
    };
  },

  computed: {
    ageChecker () {
      let error = false 
      if (this.formData.age !== '') {
        error = parseInt(this.formData.age) > MAX_AGE
      }
      return error
    },

    selected_country() {
      const findCountry = COUNTRY_DATA.filter(
        (data) => data.country === this.formData.country
      );
      return findCountry[0];
    },

    premium() {
      let price = 0;
      if (
        this.formData.age !== "" &&
        this.formData.country !== ""
      ) {
        price = 
          PREMIUM_CONSTANT *
            parseInt(this.formData.age) *
            parseFloat(this.selected_country.rate)

        if (this.formData.package !== '') {
          price = price + this.selected_country.base_price * parseFloat(this.formData.package)
        }

        price += ` ${this.selected_country.currency}`
      }
      return price;
    },

    packages() {
      const basePrice = this.selected_country.base_price;
      const currency = this.selected_country.currency;
      return [
        {
          label: "Standard",
          value: "0",
        },
        {
          label: `Safe (+${basePrice * 0.5}${currency}, 50%)`,
          value: "0.5",
        },
        {
          label: `Super Safe (+${basePrice * 0.75}${currency}, 75%)`,
          value: "0.75",
        },
      ];
    },

    packageLabel () {
      const findPackage = [...this.packages].findIndex(pckg => pckg.value === this.formData.package)
      return this.packages[findPackage].label
    }
  },

  methods: {
    reset () {
      this.formData = {
        name: "",
        age: "",
        country: "Hong Kong",
        package: "0",
      }
    }
  }
};
</script>
