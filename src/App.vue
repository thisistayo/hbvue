<template>
  <div id="app">
    <header class="header">
      <!-- <button @click.prevent="getRandomPicture" class="btn btn-link">Get New Picture</button> -->
      
    </header>
    
    <main class="main">
      <div class="content">
        <!-- Pass the pictureFetched method as a handler for the event -->
        <RandomPicture @pictureFetched="updatePicture" ref="randomPicture" />
      </div>
    </main>

    <footer class="footer">
      <!-- Replace the anchor with a button element -->
    </footer>
  </div>
</template>

<script>
import RandomPicture from "@/components/RandomPicture.vue";

export default {
  components: {
    RandomPicture,
  },
  methods: {
    // Remove the getRandomPicture method
    updatePicture({ imageUrl, formattedDate }) {
      this.imageUrl = imageUrl;
      this.formattedDate = formattedDate;
    },
    getRandomPicture() {
      // Call the getRandomPicture method directly on the child component
      this.$refs.randomPicture.getRandomPicture();
    },
  },
  data() {
    return {
      imageUrl: null,
      formattedDate: null,
    };
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header, .footer {
  flex: 0 0 5%;
  background-color: white;
  padding: 10px;
}

.main {
  flex: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.footer {
  text-align: center;
}

.btn-link {
  font-family: Verdana, sans-serif;
  text-decoration: none;
  cursor: pointer;
}
</style>