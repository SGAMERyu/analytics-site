<template>
  <div class="flex">
    <div class="w-[800px]">
      <AspectRatio :ratio="1280 / 720">
        <img :src="props.src.bigDataUrl" alt="" srcset="" />
      </AspectRatio>
    </div>
    <div class="w-[400px]">
      <AspectRatio :ratio="438 / 891">
        <img :src="props.src.smallDataUrl" alt="" srcset="" />
      </AspectRatio>
    </div>
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
