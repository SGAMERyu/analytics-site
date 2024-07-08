<template>
  <Tabs>
    <TabsList class="grid w-full grid-cols-4">
      <TabsTrigger value="summary"> summary </TabsTrigger>
      <TabsTrigger value="screenshot"> screenshot </TabsTrigger>
      <TabsTrigger value="favicon"> favicon </TabsTrigger>
      <TabsTrigger value="favicon"> palette </TabsTrigger>
    </TabsList>
    <TabsContent value="summary">
      <AnalysisInfo :info="props.info" />
    </TabsContent>
  </Tabs>
</template>

<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  info: {
    title: string;
    description: string;
    ip: string;
    summary: string;
  };
  screenshot: {
    smallDataUrl: string;
    bigDataUrl: string;
  };
}

const props = defineProps<Props>();
</script>
