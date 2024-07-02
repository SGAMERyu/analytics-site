<template>
  <h1 class="text-4xl mb-8">Extract information with Website</h1>
  <div class="flex">
    <UIInput v-model="refUrl"></UIInput>
    <UIButton @click="analyzeUrl">analyze</UIButton>
  </div>
</template>

<script lang="ts" setup>
import { Button as UIButton } from "@/components/ui/button";
import { Input as UIInput } from "@/components/ui/input";

const refUrl = ref("");

async function analyzeUrl() {
  console.warn(1);
  const data = await $fetch("/api/analyze", {
    method: "POST",
    body: {
      url: refUrl.value,
    },
  });
}
</script>
