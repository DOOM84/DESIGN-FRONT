<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Reset password
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-success :form="form">
          {{status}}
          <p>
            <nuxt-link to="/login">Proceed to login</nuxt-link>
          </p>
        </alert-success>
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
            readonly
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
            :placeholder="'New password'"></base-input>
          <!--<input
            type="password"
            name="password"
            v-model.trim="form.password"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('password') }"
            placeholder="New password"
          />-->
          <has-error :form="form" field="password"></has-error>
        </div>
        <div class="form-group">
          <base-input
            :form="form"
            :field="'password_confirmation'"
            v-model.trim="form.password_confirmation"
            :inputType="'password'"
            :placeholder="'Confirm new password'"></base-input>
          <!--<input
            type="password"
            name="password_confirmation"
            v-model.trim="form.password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Confirm new password"
          />-->
        </div>
        <div class="text-right">
          <base-button :loading="form.busy">
            Reset password
          </base-button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
  export default {
    middleware: ['guest'],
    data(){
      return {
        status: '',
        form: this.$vform({
          email: '',
          password: '',
          password_confirmation: '',
          token: '',
        })
      }
    },

    methods: {
      submit(){
        this.form.post('/password/reset').then(res => {
          this.status = res.data.status;
          this.form.reset();
        }).catch(e => {
          console.log(e);
        })


      }
    },
    created() {
      this.form.email = this.$route.query.email
      this.form.token = this.$route.params.token
    }
  }
</script>

<style scoped>

</style>
