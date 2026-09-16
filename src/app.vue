<script setup>
import {ref} from "vue";
import DeveloperRegistration from "./greetings/presentation/components/developer-registration.vue";
import DeveloperGreeting from "./greetings/presentation/components/developer-greeting.vue";
import DeveloperCountShow from "./greetings/presentation/components/developer-count-show.vue";

const registeredDeveloper = ref(null);
const hasRegistered = ref(false);
const developerCount = ref(0);

function updateRegisteredDeveloperInfo(payload) {
  registeredDeveloper.value = payload.developer;
  hasRegistered.value = true;
  updateDeveloperCount(payload.developer);

}

function updateDeveloperCount(developer) {
  if (developer.isRegisterable()) {
    developerCount.value++;
  }
}
</script>

<template>
  <h1>Hello Vue Developer Application</h1>
  <developer-registration
      @developer-registered="updateRegisteredDeveloperInfo" />

  <developer-greeting v-if="hasRegistered" :developer="registeredDeveloper"/>
  <developer-count-show :developer-count="developerCount" />
</template>
