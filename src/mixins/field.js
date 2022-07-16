import { validateRequired } from "../helpers/validator"

export default {
  props: {
    required: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      fieldValue: '',
      valid: false,
      isTriggered: false
    }
  },

  methods: {
    validation () {
      this.isTriggered = true
      this.valid = this.required ? validateRequired(this.fieldValue) : true
    }
  }
}