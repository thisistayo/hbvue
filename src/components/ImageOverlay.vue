<template>
  <div class="image-overlay" v-if="showOverlay">
    <div class="image-card">
      <img :src="selectedImage" alt="Full Image" />
      <div class="image-footer">{{ selectedDate }}
      </div>
    </div>
    <div class="buttons-container">
      <span class="overlay-button" @click="prvImg">previous</span>
      <span class="overlay-button" @click="closeImageOverlay">back</span>
      <span class="overlay-button" @click="nxtImg">next</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showOverlay: {
      type: Boolean,
      required: true,
      selectedImage: String,
      selectedDate: String,
    },
    selectedImage: {
      type: String,
      required: true,
    },
    selectedDate: {
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
    handleEscapeKey(event) {
      if (event.key === "Escape") this.$emit("close-overlay");
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleEscapeKey);
    console.log("ImageOverlay mounted with date:", this.selectedDate);
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
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.image-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
}

.image-card img {
  max-width: 100%;
  max-height: calc(90vh - 60px);
  object-fit: contain;
}

.image-footer {
  padding: 15px;
  text-align: center;
  background-color: #f8f8f8;
  font-size: 16px;
  color: #333;
  font-family: Verdana, sans-serif;
}

.buttons-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.overlay-button {
  margin: 0 10px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px 15px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.overlay-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.overlay-button:active {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>