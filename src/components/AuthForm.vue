<template>
  <form @submit.prevent class="form">
    <h2 class="form__title">description</h2>
    <div class="form__container">
      <p class="form__subtitle">description</p>
      <label class="form__group">
        <template v-if="$v.userName.$error">
          <p v-if="!$v.userName.required" class="errorMessage">
            Please enter username
          </p>
          <p v-else-if="!$v.userName.alpha" class="errorMessage">
            Only letters are allowed
          </p>
        </template>
        <input
          placeholder="Username"
          class="form__input"
          type="text"
          v-model="userName"
          @blur="$v.userName.$touch()"
        />
      </label>
      <label class="form__group">
        <template v-if="$v.phoneNumber.$error">
          <p v-if="!$v.phoneNumber.required" class="errorMessage">
            Please enter phoneNumber
          </p>
          <p v-else-if="!$v.phoneNumber.numAndSymbols" class="errorMessage">
            Only numbers and special symbols are allowed
          </p>
        </template>
        <input
          placeholder="Phone Number"
          class="form__input"
          type="tel"
          v-model="phoneNumber"
          @blur="$v.phoneNumber.$touch()"
        />
      </label>
      <button class="form__button" type="button" @click="submit"
        :disabled="$v.$error"
      >Register</button>
    </div>
  </form>
</template>

<script>
import { required, number, alpha, helpers } from "vuelidate/lib/validators";
const numAndSymbols = helpers.regex("numAndSymbols", /^[0-9x\-\(\)\s\.]*$/i);
export default {
  name: "AuthForm",
  data: () => ({
    userName: "Antonette",
    phoneNumber: '010-692-6593 x09125',
  }),
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const isLogined = await this.$store.dispatch("user/login", {
          userName: this.userName,
          phoneNumber: this.phoneNumber,
        });
        if (isLogined) {
          this.$router.push('/user-todos')
        }
      } else {
        this.$store.dispatch("notification/pushNotification", {
          type: "error",
          message: "Please check if all data are correct",
          timeout: 13000,
        });
      }
    },
  },
  validations: {
    userName: {
      required,
      alpha,
    },
    phoneNumber: {
      required,
      numAndSymbols
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/scss';
.form {
  max-width: 447px;
  width: 447px;
  display: flex;
  flex-direction: column;
  background-color: #c3c3c3;
  border-radius: 5px;
  overflow: hidden;

  &__title {
    background-color: #a5a5a5;
    color: #474747;
    font-size: 17px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.025em;
    padding: 15px 0px 15px 0px;
    text-align: center;
  }
  &__subtitle {
    padding: 15px 0px 15px 0px;
    font-size: 15px;
    font-weight: 400;
  }
  &__container {
    padding: 0 25px 30px 25px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    @include respond(tab-land) {
      padding: 0 20px 25px 20px;
    }
  }
  &__group {
    margin-bottom: 25px;
    width: 100%;

    @include respond(tab-land) {
      margin-bottom: 20px;
    }
  }
  &__label {
  }
  &__input {
    outline: none;
    color: #353535;
    border-radius: 5px;
    font-size: 17px;
    padding: 12px 17px;
    width: 100%;
    border: none;

    @include respond(tab-land) {
      font-size: 15px;
    }

  }
  &__button {
    background-color: #519945;
    border-radius: 5px;
    font-size: 17px;
    color: #fff;
    transition: all 0.2s;
    padding: 10px 0;
    border: none;

    @include respond(tab-land) {
      font-size: 15px;
    }

    &[disabled] {
      background-color: grey;
      cursor: not-allowed;
    }
    &:hover {
      transform: translate(1px, 1px);
    }
    &:active {
      transform: translate(2px, 2px);
    }
  }
}
.errorMessage {
  color: hsl(0, 100%, 50%);
  font-size: 14px;
  padding: 5px;

  @include respond(tab-land) {
    font-size: 13px;
  }
}
</style>
