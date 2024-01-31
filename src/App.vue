<template>
  <div id="app">
    <LandingPage @form-submitted="setMonthAndYear" v-if="!showImages" />
    <ImageGrid v-if="showImages" :month="selectedMonth" :year="selectedYear" @home="goToLandingPage" />
  </div>
</template>

<script>
import LandingPage from "@/components/LandingPage";
import ImageGrid from "@/components/ImageGrid";

export default {
  data() {
    return {
      showImages: false,
      selectedMonth: null,
      selectedYear: null,
    };
  },
  methods: {
    setMonthAndYear({ month, year }) {
      this.selectedMonth = month;
      this.selectedYear = year;
      this.showImages = true;
    },
    goToLandingPage() {
      console.log("Received 'home' event in App.vue");
      this.showImages = false;
    },
  },
  components: {
    LandingPage,
    ImageGrid,
  },
};
</script>
