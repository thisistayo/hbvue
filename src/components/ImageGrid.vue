<template>
    <div class="image-grid">
        <div class="header">
            <button class="back-button" @click="goHome">
                <i class="fas fa-home"></i>
            </button>
            <div class="header-content">
                <div class="month-year">{{ getMonthName(month) }} {{ year }}</div>
                <div class="click-message">Click on the thumbnails for a full-size image</div>
            </div>
        </div>
        <div class="thumbnails">
            <ImageThumbnail v-for="(imageUrl, index) in imageUrls" :key="index" :imageUrl="imageUrl"
                @click="openImageOverlay(imageUrl)" />
            <div v-if="imageUrls.length === 0">Fetching....</div>
        </div>
        <ImageOverlay :showOverlay="showOverlay" :selectedImage="selectedImage" @close-overlay="closeOverlay" />
    </div>
</template>
  

  
<script>
/* eslint-disable no-unused-vars */

import ImageThumbnail from "@/components/ImageThumbnail";
import ImageOverlay from "@/components/ImageOverlay";
import axios from "axios";

export default {
    props: {
        month: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            imageUrls: [],
            showOverlay: false,
            selectedImage: "",
        };
    },
    components: {
        ImageThumbnail,
        ImageOverlay
    },
    mounted() {
        this.fetchImages();
    },
    methods: {
        async fetchImages() {
            console.log(this.year + '/' + this.month)
            const lastDay = new Date(this.year, this.month, 0).getDate();

            for (let day = 1; day <= lastDay; day++) {
                const formattedDay = day < 10 ? `0${day}` : `${day}`;
                const formattedMonth = this.month < 10 ? `0${this.month}` : `${this.month}`;
                const imageUrl = `https://objects.hbvu.su/blotpix/${this.year}/${formattedMonth}/${formattedDay}.jpeg`;

                try {
                    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
                    console.log(`Image received for day ${day}: ${imageUrl}`);

                    const base64 = btoa(
                        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    console.log(`Image converted to base64 for day ${day}`);

                    const dataUrl = `data:image/jpeg;base64,${base64}`;

                    this.imageUrls.push(dataUrl);
                    console.log(`Image fetched and displayed for day ${day}: ${imageUrl}`);
                } catch (error) {
                    console.error(`Error fetching image for day ${day}: ${imageUrl}`, error);
                }
            }
        },
        getMonthName(month) {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return monthNames[month - 1] || '';
        },
        goHome() {
            this.$emit('home');
            console.log("home pressed")

        },
        openImageOverlay(imageUrl) {
            console.log('Opening image overlay for:', imageUrl);
            this.selectedImage = imageUrl;
            this.showOverlay = true;
        },

        closeOverlay() {
            this.showOverlay = false;
            this.selectedImage = "";
        },
    },
};
</script>
  
<style scoped>
.image-grid {
    margin-top: 20px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.back-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
}

.month-year {
    font-size: 20px;
    font-weight: bold;
}

.thumbnails {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    /* Adjust the spacing between images and rows as needed */
}

.image-thumbnail {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    /* Maintain a 1:1 aspect ratio (square) */
    position: relative;
}

.image-thumbnail img {
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 100%;
    /* Ensure the image doesn't exceed the container width */
    max-height: 100%;
    /* Ensure the image doesn't exceed the container height */
    object-fit: cover;
    /* Maintain aspect ratio and cover the container */
    border: 1px solid black;
    /* Add a 1-pixel black border */
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.back-button {
  background-color: white;
  color: black;
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
}


.click-message {
    text-align: center;
    margin-top: 5px;
    font-size: 14px;
    color: #555;
    /* Adjust the color as needed */
}

/* ... existing styles ... */
</style>