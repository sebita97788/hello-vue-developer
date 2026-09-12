<script lang="js" setup>
/**
 * DeveloperGreeting component
 *
 * @component
 * @name developer-greeting
 * @description
 * Greets a developer based on their name. If both names are empty, displays 'Welcome Anonymous Developer'.
 * Otherwise, congratulates the developer by their full name.
 *
 * @prop {Developer} developer - The developer entity to greet.
 *
 * @example
 * <developer-greeting :developer="developerInstance" />
 * // Renders: Congrats Ada Lovelace! Now you are a Vue Developer
 *
 * <developer-greeting />
 * // Renders: Welcome Anonymous Developer
 */
import {Developer} from "../../domain/model/developer.entity.js";
import {computed} from "vue";

const { developer } = defineProps({
  developer: {
    type: Developer,
    required: true,
  },
});

/**
 * Computes the greeting message for the developer.
 * @type {import('vue').ComputedRef<string>}
 */
const greeting = computed(() => {
  return (developer && developer.isRegisterable())
      ? `Congrats ${developer.fullName}! Now you are a Vue Developer, identified by ID: ${developer.id}`
      : "Welcome Anonymous Developer";
});
</script>

<template>
  <p>{{ greeting }}</p>
</template>

<style scoped>
</style>