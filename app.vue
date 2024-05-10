<template>
  <div class="flex flex-col items-center justify-center text-center">
    <header class="bg-pink-200 w-full">
      <NuxtLink to="/" class="text-2xl underline text-bule-600 mr-2">
        首页
      </NuxtLink>
      <NuxtLink to="/user" class="text-2xl underline text-bule-600 mr-2">
        用户
      </NuxtLink>
    </header>
    <NuxtPage />
  </div>
</template>

<style>

</style>
