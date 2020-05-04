<template>
  <div class="call-add-form">
    <h3 class="call-add-form__title">Add form</h3>
    <form
      class="call-add-form__form"
      @submit.prevent="onSubmit()"
    >
      <input
        required
        class="call-add-form__input call-add-form__input_name"
        type="text"
        name="name"
        maxlength="30"
        v-model="name"
        placeholder="Name"
      />
      <masked-input
        required
        class="call-add-form__input call-add-form__input_phone form-control"
        type="text"
        name="phone"
        v-model="phone"
        :mask="['0', '0', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]"
        placeholderChar="X"
        placeholder="Phone Number"
      />
      <masked-input
        required
        class="call-add-form__input call-add-form__input_time form-control"
        type="text"
        name="time"
        v-model="time"
        :mask="[/[0-5]/, /\d/, ':', /[0-5]/, /\d/]"
        placeholderChar="X"
        placeholder="Time"
      />
      <span class="call-add-form__add-container">
        <label for="add" class="call-add-form__label">add </label>
        <button id="add" class="call-add-form__add-button" type="submit">+</button>
      </span>
    </form>
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask'

export default {
  name: 'CallAddForm',
  components: {
    MaskedInput
  },
  data() {
    return {
      name: '',
      phone: '',
      time: null,
    }
  },
  methods: {
    resetForm: function() {
      this.name = '';
      this.phone = null;
      this.time = null;
    },
    onSubmit: function () {
      let timeArr = this.time.split(':');
      let time = new Date();
      time.setMinutes(timeArr[0], timeArr[1]);

      this.$emit('add-call', {
        id: Math.random().toString(36).substring(7),
        name: this.name,
        phone: this.phone,
        time: time,
        pastCall: time < Date.now(),
      });
      this.resetForm();
    }
  }
}
</script>

<style lang="less">

  @import '../css/variables';

  .call-add-form {
    & {
      position: relative;
      border: @border_default;
    }

    .call-add-form__form {
      & {
        display: flex;
        padding: 50px 10px;
        justify-content: space-between;
        position: relative;
      }

    }

    .call-add-form__input {
      & {
        display: inline-block;
        max-width: 100px;
        border: @border_default;
        padding: 3px;
        margin-right: 10px;
      }

      &_time {
        margin-right: 0;
        max-width: 70px;
      }

      &::placeholder {
        font-weight: @font-weight_bold;
        color: @color_primary;
      }
    }

    .call-add-form__add-container {
      & {
        position: absolute;
        bottom: 10%;
        right: 10px;
      }

      .call-add-form__label {
        font-weight: @font-weight_bold;
        font-size: 13px;
        cursor: pointer;
      }

      .call-add-form__add-button {
        background: none;
        box-shadow: none;
        border: @border_default;
        cursor: pointer;
      }
    }

    .call-add-form__title {
      position: absolute;
      left: 10%;
      top: -14px;
      font-size: 14px;
      margin: 0;
      padding: 5px;
      background-color: #fff;
    }
  }
</style>
