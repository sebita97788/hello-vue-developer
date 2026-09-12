<script setup>
import {ref} from "vue";
import DeveloperRegistration from "./greetings/presentation/components/developer-registration.vue";

const registeredDeveloper = ref(null);

function updateRegisteredDeveloperInfo(payload) {
  registeredDeveloper.value = payload.developer;
}
</script>

<template>
  <h1>Hello Vue Developer Application</h1>
  <developer-registration
      @developer-registered="updateRegisteredDeveloperInfo" />
</template>
