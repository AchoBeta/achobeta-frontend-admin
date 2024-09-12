<script setup>
</script>

<template>
  <main>
    <div
      class="card py-4 relative flex flex-col items-center min-w-40 h-68 bg-white shadow-lg rounded-2xl m-2 hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <!-- 更多 -->
      <div class="absolute top-4 right-4 hover:bg-pink-200">
        <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="2" r="2" fill="#666" />
          <circle cx="5" cy="9" r="2" fill="#666" />
          <circle cx="5" cy="16" r="2" fill="#666" />
        </svg>
      </div>
      <!-- 信息 -->
      <div class="flex flex-col info flex-wrap items-center ">
        <img
          class="w-16 rounded-xl mt-6 ring"
          src="https://raw.githubusercontent.com/singleeeee/imgStorage/main/img/202405121150054.jpg" alt="头像"
        >
        <h1 class="mb-1 mt-2 font-bold text-xlpo">
          半糖小子
        </h1>
        <span class="text-slate-500 text-sm">抽象</span>
      </div>
      <!-- bottom -->
      <div class="px-3">
        <!-- 联系方式 -->
        <div class="my-2">
          <i class="fa-solid fa-phone bg-[#ffe7ea] p-2 rounded-full text-pink-500 mr-2" />
          <span class="font-bold text-[13px]">+12 345 6789 0</span>
        </div>
        <!-- email -->
        <div class="my-2">
          <i class="fa-solid fa-envelope bg-[#ffe7ea] p-2 rounded-full text-pink-500 mr-2" />
          <span class="font-bold text-[13px]">bantang123@mail.com</span>
        </div>
      </div>
    </div>
  </main>
</template>
