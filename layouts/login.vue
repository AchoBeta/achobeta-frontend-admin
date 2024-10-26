<script lang="ts">

</script>

<template>
  <div class="main-container h-screen flex flex-col md:flex-row justify-start items-center w-screen">
    <div class="relative flex relative h-screen w-screen ">
      <div
        class="absolute top-0 right-0 left-0 bottom-0 bg-center bg-no-repeat bg-[length:100%_100%] -z-10 bg-[url('~/assets/img/login-bg.jpg')]"
      />
      <slot />
    </div>
  </div>
</template>
