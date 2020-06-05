import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAABRtaOfffvWd7clMPqQnxhwPtNY4-c1M',
    libraries: 'places'
  }
})

