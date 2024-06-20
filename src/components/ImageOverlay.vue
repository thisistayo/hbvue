<!-- ImageOverlay.vue -->
<template>
  <div class="image-overlay" v-if="showOverlay">
    <div class="month-year">
      <span class="overlay-button" @click="prvImg">previous</span>
      <span class="overlay-button" @click="closeImageOverlay">Return to gallery</span>
      <span class="overlay-button" @click="nxtImg">next</span>
    </div>

    <img :src="selectedImage" alt="Full Image" />
  </div>
</template>

<script>
export default {
  props: {
    showOverlay: {
      type: Boolean,
      required: true,
    },
    selectedImage: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeImageOverlay() {
      this.$emit("close-overlay");
    },
    prvImg() {
      this.$emit("prvImg");

    },
    nxtImg() {
      this.$emit("nxtImg");
    },
    /* close button was annoying me so i added another way to close the picture ;P */
    handleEscapeKey(event) {
      if (event.key === "Escape") this.$emit("close-overlay");
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleEscapeKey);
  },
  unmounted() {
    document.removeEventListener("keydown", this.handleEscapeKey);
  },
};
</script>

<style scoped>
.image-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent black background */
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
}

.image-overlay img {
  max-width: 90%;
  max-height: 90%;
}

.overlay-button {
  margin-top: 0.5rem;
  margin-right: 10px; /* Add this line to create space between buttons */
  color: black;
  font-size: 20px;
  cursor: pointer;
  background-color: lightgray;
  padding: 8px;
  border-radius: 8px;

}

.overlay-button:hover {
  background-color: gray;
}

.overlay-button:active {
  background-color: darkgray;
}
</style>
