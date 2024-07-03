<template>
  <div class="flex">
    <AspectRatio :ratio="1280 / 720" class="w-[400px]">
      <img :src="props.src.bigDataUrl" alt="" srcset="" />
    </AspectRatio>
    <AspectRatio :ratio="438 / 891" class="w-[400px]">
      <img :src="props.src.smallDataUrl" alt="" srcset="" />
    </AspectRatio>
  </div>
</template>

<script setup lang="ts">
import { AspectRatio } from "~/components/ui/aspect-ratio";

interface Props {
  src: {
    smallDataUrl: string;
    bigDataUrl: string;
  };
}
const props = defineProps<Props>();
</script>
