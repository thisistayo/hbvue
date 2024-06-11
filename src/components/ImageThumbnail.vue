<template>
  <div class="image-thumbnail" @click="handleClick">
    <img :src="imageUrl" @load="onImageLoad" alt="Thumbnail" />
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    onImageLoad() {
      //console.log(`Image displayed`);
    },
    handleClick() {
      //console.log("Thumbnail clicked:", this.imageUrl);
    },
  },
};
</script>

<style scoped>
.image-thumbnail {
  max-width: 100%;
  max-height: 200px;
  /* Set the maximum height of the images */
  overflow: hidden;
  border: 1px solid black;
  /* Add a 1-pixel black border */
  position: relative;
  cursor: pointer;
  /* Add this line to change cursor on hover */
}

.image-thumbnail img {
  width: 100%;
  height: auto;
  object-fit: contain;
  /* Preserve aspect ratio and fit within the container */
}
</style>
