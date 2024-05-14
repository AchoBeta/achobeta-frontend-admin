<script lang="ts">
export default {
  props: {
    filled: {
      type: Boolean,
      required: false,
      default: true,
    },
    fontControlled: {
      type: Boolean,
      required: false,
      default: true,
    },
    icon: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
  },
}
</script>

<template>
  <component
    :is="icon" :class="{
      'nuxt-icon': fontControlled,
      'nuxt-icon--fill': !filled,
    }"
  />
</template>

<style>
.nuxt-icon {
    width: 1em;
    height: 1em;
    margin-bottom: 0.125em;
    vertical-align: middle;
}

.nuxt-icon--fill,
.nuxt-icon--fill * {
    fill: currentColor;
}
</style>
