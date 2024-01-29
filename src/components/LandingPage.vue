<template>
  <div class="landing-page">
    <div class="container">
      <!-- Column 1: Random Picture -->
      <div class="column picture-column" :style="pictureColumnStyle">
        <RandomPicture @pictureFetched="updateRandomImage" />
      </div>

      <!-- Column 2: Form -->
      <div class="column form-column" :style="formColumnStyle">
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

<script setup>
import { ref } from 'vue';
import RandomPicture from "@/components/RandomPicture";

const currentYear = new Date().getFullYear();

const selectedMonth = ref("");
const selectedYear = ref("");
const months = [
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
];

const randomImageUrl = ref("");
const randomImageDate = ref("");

const updateRandomImage = ({ imageUrl, formattedDate }) => {
  // Update the random image details on the landing page
  randomImageUrl.value = imageUrl;
  randomImageDate.value = formattedDate;
};

const submitForm = () => {
  if (validateYear()) {
    // Emit an event to notify the parent component with selectedMonth and selectedYear
    this.$emit("form-submitted", {
      month: selectedMonth.value,
      year: selectedYear.value,
    });
  } else {
    alert("Please enter a valid year between 2010 and " + currentYear);
  }
};

const validateYear = () => {
  const enteredYear = parseInt(selectedYear.value, 10);
  return !isNaN(enteredYear) && enteredYear >= 2010 && enteredYear <= currentYear;
};

</script>

<!--
<script setup>
import { ref } from 'vue';
import { useVue3Mq } from 'vue3-mq';
import RandomPicture from "@/components/RandomPicture";

const { is } = useVue3Mq();
const currentYear = new Date().getFullYear();

const data = {
  selectedMonth: "",
  selectedYear: "",
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

const methods = {
  updateRandomImage({ imageUrl, formattedDate }) {
    // Update the random image details on the landing page
    data.randomImageUrl = imageUrl;
    data.randomImageDate = formattedDate;
    console.log('Çhanging Image')
  },
  submitForm() {
    if (validateYear()) {
      // Emit an event to notify the parent component with selectedMonth and selectedYear
      this.$emit("form-submitted", {
        month: data.selectedMonth,
        year: data.selectedYear,
      });
    } else {
      alert("Please enter a valid year between 2010 and " + currentYear);
    }
  },
  validateYear() {
    const enteredYear = parseInt(data.selectedYear, 10);
    return !isNaN(enteredYear) && enteredYear >= 2010 && enteredYear <= currentYear;
  },
};

const setup = () => {
  const pictureColumnStyle = is('sm') ? 'width: 100%;' : 'flex: 1;';
  const formColumnStyle = is('sm') ? 'width: 100%;' : 'flex: 1;';
  console.log('Is sm?', is('sm'));
  console.log('Is md?', is('md'));
  console.log('Is lg?', is('lg'));
  console.log('Picture column style:', pictureColumnStyle);
  console.log('Form column style:', formColumnStyle);
  return {
    ...data,
    ...methods,
    pictureColumnStyle,
    formColumnStyle,
  };
};
</script>
-->
<style scoped>
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
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
}

.picture-column {
  @media (max-width: 767px) {
    width: 100%;
  }
}

.form-column {
  @media (max-width: 767px) {
    width: 100%;
  }
}
</style>
