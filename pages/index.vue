<template>
  <h1 class="text-4xl mb-8">Extract information with Website</h1>
  <div class="flex">
    <UIInput v-model="refUrl"></UIInput>
    <UIButton @click="analyzeUrl">analyze</UIButton>
  </div>
  <section class="mt-8">
    <AnalysisImage :src="refData.screenshot"></AnalysisImage>
  </section>
</template>

<script lang="ts" setup>
import { Button as UIButton } from "@/components/ui/button";
import { Input as UIInput } from "@/components/ui/input";

const refUrl = ref("");
const refData = ref({
  info: {},
  screenshot: {},
});

async function analyzeUrl() {
  const data = await $fetch("/api/analyze", {
    method: "POST",
    body: {
      url: refUrl.value,
    },
  });
  refData.value = data;
}
</script>
