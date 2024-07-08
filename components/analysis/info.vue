<template>
  <Tabs>
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="summary"> Account </TabsTrigger>
      <TabsTrigger value="screenshot"> Password </TabsTrigger>
    </TabsList>
    <TabsContent value="summary">
      <ul>
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
  };
  screenshot: {
    smallDataUrl: string;
    bigDataUrl: string;
  };
}

const props = defineProps<Props>();
</script>
