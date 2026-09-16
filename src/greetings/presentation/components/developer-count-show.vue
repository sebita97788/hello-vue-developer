<script lang="js" setup>
/**
 * DeveloperCountShow component
 *
 * @component
 * @name developer-count-show
 * @description
 * Displays the number of registered developers. Unknown developers are not considered in the count.
 *
 * @prop {number} developerCount - The number of developers registered.
 *
 * @example
 * <developer-count-show :developer-count="5" />
 * // Renders: Developers registered: 5
 */
const { developerCount } = defineProps({
  developerCount: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div>
    <p>Developers registered: {{ developerCount }}</p>
    <p><b>Note:</b> Unknown developers are not considered.</p>
  </div>
</template>

<style scoped>
</style>