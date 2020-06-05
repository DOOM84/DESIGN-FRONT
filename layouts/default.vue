<template>
  <div>
    <app-navigation></app-navigation>
    <div class="wrapper">
      <nuxt />
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppNavigation from './partials/navigation'
  import AppFooter from './partials/appFooter'

  export default  {
   components: {AppNavigation, AppFooter}
  }


</script>

<style>
</style>
