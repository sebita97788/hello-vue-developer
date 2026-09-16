<script setup>
/**
 * DeveloperRegistration component
 *
 * @component
 * @name developer-registration
 * @description
 * This component is responsible for registering a new developer. It provides buttons to register,
 * defer registration (later), or clear the form. It emits 'developer-registered' or 'registration-deferred' events
 * based on user actions. Shows feedback for invalid registration attempts.
 *
 * @example
 * <developer-registration @developer-registered="updateRegisteredDeveloperInfo" @registration-deferred="resetRegisteredDeveloperInfo" />
 */
import {ref} from 'vue';
import {Developer} from "../../domain/model/developer.entity.js";

/**
 * The first name input for the developer registration form.
 * @type {import('vue').Ref<string>}
 */
const firstName = ref("");

/**
 * The last name input for the developer registration form.
 * @type {import('vue').Ref<string>}
 */
const lastName = ref("");

/**
 * The error message to display for invalid registration attempts.
 * @type {import('vue').Ref<string>}
 */
const errorMessage = ref("");

/**
 * Emits events for registration actions.
 * The 'developer-registered' event is emitted with the developer entity when registration is successful.
 * The 'registration-deferred' event is emitted with a null developer when the user chooses to defer registration.
 * @type {(event: 'developer-registered' | 'registration-deferred',
 * payload: { developer: Developer | null }) => void}
 */
const emit = defineEmits(['developer-registered', 'registration-deferred']);

/**
 * Handles the registration form submission. Emits 'developer-registered' if valid, otherwise sets an error message.
 * @returns {void}
 */
function submitRegistrationRequest() {
  const developer = new Developer(firstName.value, lastName.value);
  if (developer.isRegisterable()) {
    emit("developer-registered", { developer });
    clearFields();
  } else {
    errorMessage.value = "Please provide both first name and last name.";
  }
}

/**
 * Defers the registration process by emitting 'registration-deferred' event with empty names. Clears the form and error message.
 * @returns {void}
 */
function deferRegistration() {
  emit("registration-deferred", {developer: null});
  clearFields();
}

/**
 * Clears the input fields and error message.
 * @returns {void}
 */
function clearFields() {
  firstName.value = "";
  lastName.value = "";
  errorMessage.value = "";
}
</script>

<template>
  <!-- Developer Registration Form -->
  <div>
    <h2>New Developer</h2>
    <div>
      <form @submit.prevent="submitRegistrationRequest">
        <div class="field">
          <label for="firstName">First Name:</label><input id="first-name" v-model="firstName" type="text"/>
        </div>
        <div class="field">
          <label for="lastName">Last Name:</label><input id="last-name" v-model="lastName" type="text"/>
        </div>
        <div class="actions">
          <button type="submit">Register</button>
          <button type="button" @click="deferRegistration">Later</button>
          <button type="button" @click="clearFields">Clear</button>
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