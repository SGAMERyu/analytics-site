<template>
  <section class="flex mt-8">
    <ul class="flex flex-col">
      <li>
        <span>title</span><span>{{ props.info.title }}</span>
      </li>
      <li>
        <span>description</span><span>{{ props.info.description }}</span>
      </li>
    </ul>
    <AnalysisImage :src="props.screenshot"></AnalysisImage>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  info: any;
  screenshot: {
    smallDataUrl: string;
    bigDataUrl: string;
  };
}

const props = defineProps<Props>();
</script>
