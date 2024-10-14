<template>
  <div class="app-container">
    <div class="content-square">
      <h1 class="title">EKSKOG 365</h1>
      <div class="columns-container">
        <div class="column picture-column">
          <RandomPicture @pictureFetched="updateRandomImage" />
        </div>
        <div class="column form-column">
          <form @submit.prevent class="form">
            <div class="form-group">
              <label for="month">Select Month:</label>
              <select v-model="selectedMonth" id="month" required class="form-input">
                <option v-for="month in months" :key="month.value" :value="month.value">
                  {{ month.label }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="day">Enter Day (optional for month):</label>
              <input type="text" v-model="selectedDay" id="day" placeholder="Day" class="form-input"/>
            </div>
            <div class="form-group">
              <label for="year">Select Year (From 2010):</label>
              <input type="number" v-model="selectedYear" id="year" placeholder="Enter Year" min="2010" :max="currentYear" class="form-input"/>
            </div>
            <div class="button-group">
              <button @click="submitForm('month')">Show Month</button>
              <button @click="submitForm('dayAcrossYears')">Show Day Across Years</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RandomPicture from "@/components/RandomPicture";

export default {
  components: {
    RandomPicture,
  },
  data() {
    return {
      selectedMonth: "",
      selectedDay: "",
      selectedYear: "",
      currentYear: new Date().getFullYear(),
      months: [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
      ],
    };
  },
  methods: {
    updateRandomImage({ imageUrl, formattedDate }) {
      this.randomImageUrl = imageUrl;
      this.randomImageDate = formattedDate;
    },
    submitForm(viewType) {
      console.log("submitForm called with viewType:", viewType);
      console.log("Current form data:", {
        month: this.selectedMonth,
        day: this.selectedDay,
        year: this.selectedYear
      });

      if (this.validateInputs(viewType)) {
        console.log("Inputs validated successfully");
        if (viewType === 'month') {
          this.$emit("form-submitted", {
            type: 'month',
            month: this.selectedMonth,
            year: this.selectedYear,
          });
        } else {
          this.$emit("form-submitted", {
            type: 'dayAcrossYears',
            month: this.selectedMonth,
            day: this.selectedDay,
          });
        }
      } else {
        console.log("Input validation failed");
        
        if (viewType === 'month') {
          alert("Please enter valid month and year.");
        } else {
          alert("Please enter valid month and day.");
        }
      }
    },
    validateInputs(viewType) {
      const enteredMonth = parseInt(this.selectedMonth, 10);
      
      if (isNaN(enteredMonth) || enteredMonth < 1 || enteredMonth > 12) {
        return false;
      }

      if (viewType === 'month') {
        const enteredYear = parseInt(this.selectedYear, 10);
        return !isNaN(enteredYear) && enteredYear >= 2010 && enteredYear <= this.currentYear;
      } else if (viewType === 'dayAcrossYears') {
        const enteredDay = parseInt(this.selectedDay, 10);
        const daysInMonth = new Date(this.currentYear, enteredMonth, 0).getDate();
        
        return !isNaN(enteredDay) && enteredDay >= 1 && enteredDay <= daysInMonth;
      }

      return false;
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.content-square {
  width: 90vmin;
  height: 90vmin;
  max-width: 800px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  padding: 10px 0 5px 0; 
  margin: 0;
  font-size: 2rem;
}

.columns-container {
  display: flex;
  flex: 1;
  padding: 1px;
  margin-bottom: auto; /* This pushes the content up */
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}

.picture-column img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.form {
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  height: 40px;
  box-sizing: border-box;
  padding: 5px 10px;
  font-size: 16px;
  width: 100%;
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

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.button-group button {
  width: 48%;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 8px;
}

.button-group button:hover {
  background-color: green;
}

.button-group button:active {
  background-color: darkgreen;
}

/* Remove arrows/spinners from number input */
input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

/* Style for the select dropdown */
select.form-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;
  padding-right: 30px;
}

/* Remove the dropdown arrow in IE10+ */
select.form-input::-ms-expand {
  display: none;
}

@media (max-width: 600px) {
  .columns-container {
    flex-direction: column;
  }
  
  .column {
    padding: 10px 0;
  }
}
</style>