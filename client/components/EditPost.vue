<script setup>
const postStore = usePostStore();
const emit = defineEmits();

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const form = reactive({
  body: props.post.body,
});

const submit = async () => {
  await postStore.updatePost(props.post.id, form).then((response) => {
    emit("editCancel");
  });
};
</script>

<template>
  <form class="space-y-2" @submit.prevent="submit">
    <div>
      <label for="body" class="sr-only">Post body</label>
      <TextArea
        rows="2"
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
    <div class="flex items-center space-x-2">
      <PrimaryButton>Post</PrimaryButton>
      <button type="button" @click="$emit('editCancel')">Cancel</button>
    </div>
  </form>
</template>
