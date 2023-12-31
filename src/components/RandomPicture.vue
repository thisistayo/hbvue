<template>
  <div class="container mt-4">
    <div v-if="imageUrl" class="card">
      <img :src="imageUrl" alt="Random Picture" class="card-img-top" />
      <div class="card-body">
        <p class="card-text">{{ formattedDate }}</p>
      </div>
    </div>
    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      formattedDate: null,
      error: null,
    };
  },
  mounted() {
    this.getRandomPicture();
  },
  methods: {
    async getRandomPicture() {
      try {
        // Define the bookends for available dates
        const startDate = new Date(2017, 0, 1); // 1st January 2017
        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 1); // Yesterday's date

        // Generate a random date within the specified range
        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

        // Format the date as Month DayST, Year
        this.formattedDate = this.formatDate(randomDate);

        // Construct the URL with the randomly generated date
        this.imageUrl = `https://s3.hbvu.su/blotpix/${randomDate.getFullYear()}/${String(randomDate.getMonth() + 1).padStart(2, '0')}/${String(randomDate.getDate()).padStart(2, '0')}.jpeg`;

        // Emit an event to inform the parent (App.vue) about the new picture
        this.$emit('pictureFetched', {
          imageUrl: this.imageUrl,
          formattedDate: this.formattedDate,
        });
      } catch (error) {
        console.error('Error fetching random picture:', error);
        this.error = 'Error fetching random picture. Please try again later.';
      }
    },
    formatDate(date) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const day = date.getDate();
      const suffix = this.getDaySuffix(day);
      const formattedDate = `${monthNames[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;
      return formattedDate;
    },
    getDaySuffix(day) {
      if (day >= 11 && day <= 13) {
        return 'th';
      }
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    }
  },
};
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.card {
  width: 500px;
  border: 1px solid #000; /* Black border */
  border-radius: 8px;
  overflow: hidden;
  font-family: Verdana, sans-serif;
}

.card-img-top {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.card-body {
  padding: 15px;
  text-align: center;
}

.card-text {
  margin: 0;
  font-size: 20px;
}
</style>
