<script lang="ts">
import { AxiosError } from "axios";

export default {
  data() {
    return {
      isLoading: false,
      prompt: "Thanks for call; We are busy; Email us",
      companyName: "Big Dentist Corp.",
      website: "www.big-corp.com",
      email: "hello@big-corp.com",
      responseText: "",
      error: "",
    };
  },
  methods: {
    async submitWait() {
      if (this.isLoading) return;
      await this.submit();
    },
    async submit() {
      this.isLoading = true;
      try {
        const response = await this.$axios.post(
          "/api/suggest",
          {
            prompt: this.prompt,
            companyName: this.companyName,
            website: this.website,
            email: this.email,
          },
          { timeout: 20000 }
        );

        this.responseText = response.data.result;
        this.error = "";
      } catch (err) {
        this.error = "Error: " + (err as AxiosError).message;
        this.responseText = "";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <div>
    <label for="companyName">Company Name:</label>
    <input type="text" id="companyName" v-model="companyName" />
    <br />
    <label for="website">Website:</label>
    <input type="text" id="website" v-model="website" />
    <br />
    <label for="email">Email Address:</label>
    <input type="email" id="email" v-model="email" />
    <br />
    <label for="prompt">Customer snippet:</label>
    <input type="text" id="prompt" v-model="prompt" />
    <br />
    <p v-if="isLoading">Loading...</p>
    <button v-if="!isLoading" @click="submit">Get prompt suggestion</button>
    <p v-if="responseText">
      <strong>What about this?:</strong> <br />
      {{ responseText }}
    </p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
