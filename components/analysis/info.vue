<template>
  <div class="flex gap-4">
    <ul class="w-[600px] flex flex-col gap-2">
      <li class="flex-between">
        <span>title</span>
        <span>{{ props.info.title }}</span>
      </li>
      <li class="flex-between">
        <span>description</span>
        <span>{{ props.info.description }}</span>
      </li>
      <li class="flex-between">
        <span>Ip</span>
        <span>{{ props.info.ip }}</span>
      </li>
    </ul>
    <div class="w-[600px]">summary</div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  info: {
    title: string;
    description: string;
    ip: string;
    summary: string;
  };
}

const props = defineProps<Props>();
</script>
