<script>
export default {
  // 获取错误信息
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<template>
  <div class="error-page">
    <h1 v-if="error.statusCode">
      {{ error.statusCode }}
    </h1>
    <h1 v-else>
      Oops! Something went wrong.
    </h1>
    <p>{{ error.message }}</p>
    <nuxt-link to="/">
      Go back to the homepage
    </nuxt-link>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 80px;
  margin-bottom: 20px;
}

p {
  font-size: 24px;
  margin-bottom: 40px;
}

a {
  font-size: 18px;
  color: #007bff;
  text-decoration: none;
}
</style>
