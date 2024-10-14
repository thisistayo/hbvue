<template>
    <div class="image-grid">
        <div class="header">
            <button class="back-button" @click="goHome">
                <i class="fas fa-home"></i>
            </button>
            <div class="header-content">
                <div class="month-year">
                    <span class="arrow" @click="previous">&larr;</span>
                    {{ getMonthName(month) }} {{ year }}
                    <span class="arrow" @click="next">&rarr;</span>
                </div>
                <div class="click-message">Click on the thumbnails for a full-size image</div>
            </div>
        </div>
        <div class="thumbnails">
            <!-- Loading indicator -->
            <div v-if="isLoading" class="loading-indicator">Loading images...</div>

            <!-- Image thumbnails -->
            <div v-else v-for="(imageUrl, index) in imageUrls" :key="index" class="image-card">
                <div class="image-thumbnail" @click="openImageOverlay(index)">
                    <img :src="imageUrl" :alt="`Image for ${formatDate(index + 1)}`">
                </div>
                <div class="image-footer">{{ formatDate(index + 1) }}</div>
            </div>

            <!-- Message when no images are available -->
            <div v-if="imageUrls.length === 0 && !isLoading">No images available.</div>
        </div>
        <ImageOverlay :showOverlay="showOverlay" :selectedImage="selectedImage" :selectedDate="selectedDate"
            @close-overlay="closeOverlay" @prvImg="prvImg" @nxtImg="nxtImg" />
    </div>
</template>

<script>
import ImageOverlay from "@/components/ImageOverlay";

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
            selectedDate: "",
            selectedIndex: 0,
            isLoading: true,
        };
    },
    components: {
        ImageOverlay
    },
    mounted() {
        this.fetchImages();
    },
    watch: {
        month: 'fetchImages',
        year: 'fetchImages',
    },
    methods: {
        fetchImages() {
            this.isLoading = true;
            this.imageUrls = [];

            const lastDay = new Date(this.year, this.month, 0).getDate();
            this.imageUrls = Array.from({ length: lastDay }, (_, index) => {
                const day = index + 1;
                const formattedDay = day < 10 ? `0${day}` : `${day}`;
                const formattedMonth = this.month < 10 ? `0${this.month}` : `${this.month}`;
                return `https://objects.hbvu.su/blotpix/${this.year}/${formattedMonth}/${formattedDay}.jpeg`;
            });

            this.isLoading = false;
        },
        getMonthName(month) {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return monthNames[month - 1] || '';
        },
        formatDate(day) {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const suffixes = ["st", "nd", "rd", "th"];

            let suffix;
            if (day >= 11 && day <= 13) {
                suffix = suffixes[3];
            } else {
                switch (day % 10) {
                    case 1: suffix = suffixes[0]; break;
                    case 2: suffix = suffixes[1]; break;
                    case 3: suffix = suffixes[2]; break;
                    default: suffix = suffixes[3];
                }
            }

            console.log(`${monthNames[this.month - 1]} ${day}${suffix}, ${this.year}`)

            return `${monthNames[this.month - 1]} ${day}${suffix}, ${this.year}`;
        },
        goHome() {
            this.$emit('home');
        },
        previous() {
            const previousMonth = this.month === 1 ? 12 : this.month - 1;
            const previousYear = this.month === 1 ? this.year - 1 : this.year;
            this.$emit('navigate', { month: previousMonth, year: previousYear });
        },
        next() {
            const nextMonth = this.month === 12 ? 1 : this.month + 1;
            const nextYear = this.month === 12 ? this.year + 1 : this.year;
            this.$emit('navigate', { month: nextMonth, year: nextYear });
        },
        openImageOverlay(index) {
            this.selectedIndex = index;
            this.selectedImage = this.imageUrls[index];
            const formattedDate = this.formatDate(index + 1);
            console.log("Date being sent to overlay:", formattedDate);
            this.selectedDate = formattedDate;
            this.showOverlay = true;
        },
        closeOverlay() {
            this.showOverlay = false;
            this.selectedImage = "";
            this.selectedDate = "";
            this.selectedIndex = 0;
        },
        prvImg() {
            if (this.selectedIndex > 0) {
                this.selectedIndex--;
                this.selectedImage = this.imageUrls[this.selectedIndex];
                this.selectedDate = this.formatDate(this.selectedIndex + 1);
            } else {
                alert("No previous day in the current month.");
            }
        },
        nxtImg() {
            if (this.selectedIndex < this.imageUrls.length - 1) {
                this.selectedIndex++;
                this.selectedImage = this.imageUrls[this.selectedIndex];
                this.selectedDate = this.formatDate(this.selectedIndex + 1);
            } else {
                alert("No next day in the current month.");
            }
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
    margin-bottom: 20px;
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
    border-radius: 4px;
}

.month-year {
    font-size: 24px;
    font-weight: bold;
}

.arrow {
    cursor: pointer;
    padding: 0 10px;
}

.thumbnails {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.image-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
}

.image-card:hover {
    transform: scale(1.05);
}

.image-thumbnail {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    position: relative;
    cursor: pointer;
}

.image-thumbnail img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-footer {
    padding: 10px;
    text-align: center;
    background-color: #f8f8f8;
    font-size: 16px;
    color: #333;
    font-family: Verdana, sans-serif;
}

.image-footer sup {
    font-size: 0.6em;
    vertical-align: super;
    margin-left: 1px;
}

.header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.click-message {
    text-align: center;
    margin-top: 5px;
    font-size: 14px;
    color: #555;
}

.loading-indicator {
    grid-column: 1 / -1;
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #555;
}
</style>