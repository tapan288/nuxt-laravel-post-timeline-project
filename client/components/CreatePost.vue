<script setup>
const postStore = usePostStore();

const form = reactive({
  body: "",
});

const submit = async () => {
  await postStore.storePost(form).then(() => {
    form.body = "";
  });
};
</script>

<template>
  <form class="space-y-2" @submit.prevent="submit">
    <div>
      <label for="body" class="sr-only">Post body</label>
      <TextArea
        class="w-full h-28 p-4 mt-1 block mb-2"
        v-model="form.body"
        placeholder="What do you want to say?"
      />
      <p
        v-if="postStore.createErrors.body"
        class="mt-2 text-sm text-red-600"
        id="email-error"
      >
        {{ postStore.createErrors.body[0] }}
      </p>
    </div>
    <PrimaryButton>Post</PrimaryButton>
  </form>
</template>
