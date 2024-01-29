<!-- ImageOverlay.vue -->
<template>
    <div class="image-overlay" v-if="showOverlay">
        <span class="close-button" @click="closeImageOverlay">close this</span>
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
    align-items: center;
    justify-content: center;
}

.image-overlay img {
    max-width: 90%;
    max-height: 90%;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    font-size: 20px;
    cursor: pointer;
}
</style>
