<script setup lang="js">
import {ref} from "vue";
import {Developer} from "../../domain/model/developer.entity.js";

const firstName = ref("");
const lastName = ref("");
const errorMessage = ref("");

const emit = defineEmits(["developer-registered"]);

function clearFields() {
  firstName.value = "";
  lastName.value = "";
  errorMessage.value = "";
}

function submitRegistrationRequest() {
  const developer = new Developer(firstName.value, lastName.value);
  if (developer.isRegisterable()) {
    emit("developer-registered", { developer });
    clearFields();
    errorMessage.value = "";
  } else {
    errorMessage.value = "Please provide both first name and last name.";
  }
}
</script>

<template>
  <!-- Developer Registration Form -->
  <div>
    <h2>New Developer</h2>
    <div>
      <form @submit.prevent="submitRegistrationRequest">
        <div class="field">
          <label for="firstName">First Name:</label>
          <input id="first-name" v-model="firstName" type="text"/>
        </div>
        <div class="field">
          <label for="lastName">Last Name:</label>
          <input id="last-name" v-model="lastName" type="text"/>
        </div>
        <div class="actions">
          <button type="submit">Register</button>
        </div>
      </form>
      <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
}

.error {
  color: #d32f2f;
  margin-top: 10px;
  font-size: 14px;
}

.field {
  margin-bottom: 10px;
}

.actions {
  margin-top: 10px;
}

label {
  margin-right: 5px;
}
</style>