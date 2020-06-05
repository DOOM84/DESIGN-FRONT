<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Register
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-success :form="form">
          We have sent You an email to activate your account
        </alert-success>
        <div class="form-group">
          <base-input
            :form="form"
            :field="'name'"
            v-model.trim="form.name"
            :inputType="'name'"
            :placeholder="'Full Name'"></base-input>
          <!--<input
            type="text"
            v-model.trim="form.name"
            name="name"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('name') }"
            placeholder="Full Name"
          />
          <has-error :form="form" field="name"></has-error>-->
        </div>
        <div class="form-group">
          <base-input
            :form="form"
            :field="'username'"
            v-model.trim="form.username"
            :inputType="'username'"
            :placeholder="'Username'"></base-input>
          <!--<input
            type="text"
            name="username"
            v-model.trim="form.username"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('username') }"
            placeholder="Username"
          />
          <has-error :form="form" field="username"></has-error>-->
        </div>
        <div class="form-group">
          <base-input
            :form="form"
            :field="'email'"
            v-model.trim="form.email"
            :inputType="'email'"
            :placeholder="'Email'"></base-input>
          <!--<input
            type="text"
            name="email"
            v-model.trim="form.email"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('email') }"
            placeholder="Email"
          />
          <has-error :form="form" field="email"></has-error>-->
        </div>
        <div class="form-group">
          <base-input
            :form="form"
            :field="'password'"
            v-model.trim="form.password"
            :inputType="'password'"
            :placeholder="'Password'"></base-input>
          <!--<input
            type="password"
            name="password"
            v-model.trim="form.password"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('password') }"
            placeholder="Password"
          />
          <has-error :form="form" field="password"></has-error>-->
        </div>
        <div class="form-group">
          <base-input
            :form="form"
            :field="'password_confirmation'"
            v-model.trim="form.password_confirmation"
            :inputType="'password'"
            :placeholder="'Confirm Password'"></base-input>
          <!--<input
            type="password"
            name="password_confirmation"
            v-model.trim="form.password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Confirm Password"
          />-->
        </div>

        <div class="text-right">
          <base-button :loading="form.busy">
            Register
          </base-button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          Already have an account?
          <nuxt-link :to="{name: 'login'}" class="color-blue">
            Login
          </nuxt-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
    export default {
      middleware: ['guest'],
        data(){
          return {
            form: this.$vform({
              username: '',
              name: '',
              email: '',
              password: '',
              password_confirmation: '',
            })
          }
        },
      methods: {
          submit(){
            this.form.post(`/register`).then(res => {
              this.form.reset();
            }).catch(e => {
              console.log(e);
            })

          }
      }
    }
</script>

<style scoped>

</style>
