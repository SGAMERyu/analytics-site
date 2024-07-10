<template>
  <div class="w-[800px]">
    <AspectRatio :ratio="1280 / 720">
      <img :src="props.src" alt="" srcset="" />
    </AspectRatio>
  </div>
</template>

<script setup lang="ts">
import { AspectRatio } from "~/components/ui/aspect-ratio";

interface Props {
  src: string;
}
const props = defineProps<Props>();
</script>
