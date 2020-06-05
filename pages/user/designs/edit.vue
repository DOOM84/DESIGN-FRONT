<template>
<div>
  <section class="hero text-center bg-secondary mb-4 text-white">
    <div class="container">
      <h1 class="font-28 fw-600 text-uppercase">
        Update design information
      </h1>
    </div>
  </section>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body p-1" v-if="design.image">
              <img :src="design.image.large" class="w-100 mb-4" alt="">
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="submit" class="auth-form">
                <alert-success :form="form">
                  Design successfully updated
                </alert-success>
                <div class="form-group">
                  <base-input
                    :form="form"
                    :field="'title'"
                    v-model="form.title"
                    :placeholder="'Enter a title'"
                  />
                </div>
                <div class="form-group">
                  <base-textarea
                    :form="form"
                    :rows="5"
                    :field="'description'"
                    v-model="form.description"
                    :placeholder="'Enter a description'"
                  />
                </div>
                <div class="form-group">
                  <input-tag placeholder="Tags separated by commas" v-model="form.tags"></input-tag>
                </div>
                <template v-if="teams.length">

                  <div class="form-group custom-control custom-checkbox">
                    <input type="checkbox"
                           class="custom-control-input"
                           id="assign_to_team"
                           v-model="form.assign_to_team"
                    />
                    <label class="custom-control-label" for="assign_to_team">
                      Assign to team
                    </label>
                  </div>
                  <div class="form-group">

                    <select
                      :disabled="!form.assign_to_team"
                      class="custom-select"
                      :class="{'is-invalid': form.errors.has('team')}"
                      v-model="form.team"
                    >
                      <option :value="null">Select a team</option>
                      <option v-for="team in teams" :key="team.id" :value="team.id">{{team.name}}</option>
                    </select>
                    <has-error :form="form" field="team"></has-error>
                  </div>
                </template>
                <div class="form-group custom-control custom-checkbox">
                  <input type="checkbox"
                         class="custom-control-input"
                         id="is_live"
                         v-model="form.is_live"

                  />
                  <label class="custom-control-label" for="is_live">
                    Is live
                  </label>
                </div>
                <div class="text-right">
                  <nuxt-link :to="{name: 'settings.designs'}">
                    Cancel
                  </nuxt-link>
                  <base-button :loading="form.busy">
                    Update design
                  </base-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
    export default {
      middleware: ['auth'],
      data(){
        return {
          form: this.$vform({
            title: '',
            description: '',
            is_live: false,
            tags: [],
            assign_to_team: false,
            team: null
          })
        }
      },

      async asyncData({$axios, params, error, redirect}){
        try{
          const design = await $axios.$get(`/designs/${params.id}/byUser`);
          const teams = await $axios.$get(`/users/teams`);

          return {design: design.data, teams: teams.data}
        }catch (err) {
          if(err.response.status === 404){
            error({statusCode: 404, message: "Design not found"})
          }
          else if(err.response.status === 401){
            redirect('/login');
          }
          else{
            error({statusCode: 500, message: "Internal server error"})
          }
        }


      },


      methods: {
        submit(){
          this.form.put(`/designs/${this.$route.params.id}`)
          .then(res => {
            setTimeout(() => {
              this.$router.push({name: 'settings.designs'})
            }, 1000);
          })
          .catch(err => console.log(err.response))
        }

      },
      mounted() {
        if(this.design){
        Object.keys(this.form).forEach(key => {
          if(this.design.hasOwnProperty(key)){
            this.form[key] = this.design[key]
          }
        });
        this.form.tags = this.design.tag_list.tags || [];
        if (this.design.team){
          this.form.team = this.design.team.id
          this.form.assign_to_team = true;
        }else{
          this.form.assign_to_team = false;
        }
        }
      }
    }
</script>

<style scoped>

</style>
