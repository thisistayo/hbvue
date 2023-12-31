<template>
    <nav>
      <ul>
        <li><a href="#" @click.prevent="getRandomPicture">Get New Picture</a></li>
        <!-- Add other navbar links as needed -->
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    methods: {
      // Emit a custom event when the "Get New Picture" link is clicked
      getRandomPicture() {
        this.$emit('getNewPicture');
      },
    },
  };
  </script>
  
  <style>
  /* Add styling as needed */
  </style>
  