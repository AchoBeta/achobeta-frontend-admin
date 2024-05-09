<template>
  <header class="navbar bg-[#fbfbfb]">
    <!-- 更多 -->
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
    </div>
    <!-- 占位符 -->
    <div class="flex-1">
    </div>
    <!-- 消息栏 -->
    <div class="flex-none">
      <!-- 搜索框 -->
      <label class="input input-bordered flex items-center gap-2 mr-8">
        <input type="text" class="grow" placeholder="Search" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
      </label>
      <!-- 通知项 -->
        <block v-for="item in 3">
          <div class="indicator mx-4 mt-2 ">
            <span class="indicator-item badge badge-secondary badge-sm"></span> 
            <div class="grid w-10 h-10 rounded-full bg-base-300 place-items-center"> </div>
        </div>
      </block>
      <!-- 主题切换 -->
      <input  type="checkbox" value="synthwave" class="toggle theme-controller mx-3 mb-1"/>
      </div>
  </header>
</template>
<script setup>

</script>
