<!-- ImageOverlay.vue -->
<template>
  <div class="image-overlay" v-if="showOverlay">
    <span class="close-button" @click="closeImageOverlay"
      >Return to gallery</span
    >
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

.close-button {
  margin-top: 0.5rem;
  color: black;
  font-size: 20px;
  cursor: pointer;
  background-color: lightgray;
  padding: 8px;
  border-radius: 8px;

}

.close-button:hover {
  background-color: gray;
}

.close-button:active {
  background-color: darkgray;
}
</style>
