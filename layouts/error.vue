<!-- layouts/error.vue -->
<script setup>
import { useError } from '#app'

const error = useError()
</script>

<template>
  <div class="error-page">
    <h1>{{ error.statusCode || 'Error' }}</h1>
    <p>{{ error.message || 'Something went wrong' }}</p>
  </div>
</template>
