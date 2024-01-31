<template>
  <div class="landing-page">
    <div class="container">
      <!-- Column 1: Random Picture -->
      <div class="column picture-column">
        <RandomPicture @pictureFetched="updateRandomImage" />
      </div>

      <!-- Column 2: Form -->
      <div class="column form-column">
        <h1>EKSKOG 365</h1>
        <form @submit.prevent="submitForm" class="form">
          <div class="form-group">
            <label for="month">Select Month:</label>
            <select v-model="selectedMonth" id="month" required>
              <option v-for="month in months" :key="month.value" :value="month.value">
                {{ month.label }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="year">Select Year (From 2010):</label>
            <input type="number" v-model="selectedYear" id="year" placeholder="Enter Year" min="2010" :max="currentYear" required />
          </div>
          <button type="submit">Show Images</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import RandomPicture from "@/components/RandomPicture"; // Import the RandomPicture component

export default {
  components: {
    RandomPicture, // Register the RandomPicture component
  },
  data() {
    return {
      selectedMonth: "",
      selectedYear: "",
      currentYear: new Date().getFullYear(),
      months: [
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "September", value: "9" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
      ],
    };
  },
  methods: {
    updateRandomImage({ imageUrl, formattedDate }) {
      // Update the random image details on the landing page
      this.randomImageUrl = imageUrl;
      this.randomImageDate = formattedDate;
    },
    submitForm() {
      if (this.validateYear()) {
        // Emit an event to notify the parent component with selectedMonth and selectedYear
        this.$emit("form-submitted", {
          month: this.selectedMonth,
          year: this.selectedYear,
        });
      } else {
        alert("Please enter a valid year between 2010 and " + this.currentYear);
      }
    },
    validateYear() {
      const enteredYear = parseInt(this.selectedYear, 10);
      return !isNaN(enteredYear) && enteredYear >= 2010 && enteredYear <= this.currentYear;
    },
  },
};
</script>

<style scoped>
/* Your existing styles here */

.landing-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  display: flex;
}

.column {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form {
  width: 300px;
  /* Adjust the form width as needed */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

select,
input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  margin-bottom: 10px;
  box-sizing: border-box;
  /* Ensure padding and border don't affect the width */
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
}
</style>