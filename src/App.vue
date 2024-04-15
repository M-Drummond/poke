<script lang="ts">

</script>

<script setup lang="ts">

</script>

<template>
  <form>
    <label for="x">
      <input id="x" />
    </label>
    <label for="y">
      <input id="y" />
    </label>
    <label for="z">
      <input id="z" />
    </label>
  </form>
</template>
<style scoped>
label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input {
  font-size: theme('fontSize.sm');
  color: theme('colors.black');
  background-color: theme('colors.white');
  border: 1px solid current;
}

@media (min-width: 767px) {
  input {
    font-size: 20px;
  }
}
</style>