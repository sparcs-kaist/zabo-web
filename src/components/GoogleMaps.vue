<template>
  <div>
    <h2>Your Address</h2>

    <vue-google-autocomplete ref="address" id="google-map" classname="form-control" placeholder="주소를 입력하세요." v-on:placechanged="getAddressData" country="kr">
    </vue-google-autocomplete>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  components: { VueGoogleAutocomplete },

  data: function () {
    return {
      address: ''
    }
  },

  mounted () {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    // this.$refs.address.focus();
  },

  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
    }
  }
}
</script>