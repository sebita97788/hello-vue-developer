<script lang="js" setup>
/**
 * App component
 *
 * @component
 * @name app
 * @description
 * The main application part. Manages developer registration, greeting, and count.
 * Handles events from DeveloperRegistration and updates state accordingly.
 *
 * @example
 * <app />
 */
import DeveloperRegistration from "./greetings/presentation/components/developer-registration.vue";
import DeveloperGreeting from "./greetings/presentation/components/developer-greeting.vue";
import DeveloperCountShow from "./greetings/presentation/components/developer-count-show.vue";
import {Developer} from "./greetings/domain/model/developer.entity.js";
import {ref} from "vue";

/**
 * The registered developer entity.
 * @type {import('vue').Ref<Developer|null>}
 */
const registeredDeveloper = ref(null);

/**
 * The number of developers registered (excluding unknown developers).
 * @type {import('vue').Ref<number>}
 */
const developerCount = ref(0);

/**
 * Whether a developer has registered.
 * @type {import('vue').Ref<boolean>}
 */
const hasRegistered = ref(false);

/**
 * Handles the 'developer-registered' event. Updates developer info and count.
 * @param {{ developer: Developer }} payload - The registered developer payload.
 * @returns {void}
 */
function updateRegisteredDeveloperInfo(payload) {
  registeredDeveloper.value = payload.developer;
  hasRegistered.value = true;
  updateDeveloperCount(payload.developer);
}

/**
 * Handles the 'registration-deferred' event. Resets developer info.
 * @returns {void}
 */
function resetRegisteredDeveloperInfo() {
  registeredDeveloper.value = null;
  hasRegistered.value = false;
}

/**
 * Increments the developer count if the developer is not 'Unknown'.
 * @param {Developer} developer - The developer to check.
 * @returns {void}
 */
function updateDeveloperCount(developer) {
  if (developer.isRegisterable()) {
    developerCount.value++;
  }
}
</script>

<template>
  <h1>Hello Vue Developer Application</h1>
  <developer-registration
      @developer-registered="updateRegisteredDeveloperInfo"
      @registration-deferred="resetRegisteredDeveloperInfo"
  />
  <developer-greeting v-if="hasRegistered" :developer="registeredDeveloper"/>
  <developer-count-show :developer-count="developerCount"/>
</template>

<style>
</style>