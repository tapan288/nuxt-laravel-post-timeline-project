<script setup>
const body = ref("");
</script>

<template>
  <form class="space-y-2">
    <div>
      <label for="body" class="sr-only">Post body</label>
      <TextArea
        class="w-full h-28 p-4 mt-1 block mb-2"
        v-model="body"
        placeholder="What do you want to say?"
      />
      <!-- <p
            v-if="errors.body"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ errors.body[0] }}
          </p> -->
    </div>
    <PrimaryButton>Post</PrimaryButton>
  </form>
</template>
