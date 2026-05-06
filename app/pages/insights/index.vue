<script setup lang="ts">
import { CalendarDays } from 'lucide-vue-next'

const { data: posts } = await useAsyncData('insights', () =>
  queryCollection('insights')
    .order('date', 'DESC')
    .all()
)
</script>

<template>
  <div class="pt-24 pb-16 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="mb-12">
        <p class="text-brand-400 font-medium text-sm mb-3 uppercase tracking-wide">Insights</p>
        <h1 class="text-3xl sm:text-4xl font-bold mb-4">인사이트</h1>
        <p class="text-gray-400 max-w-xl">
          사업과 제품에 대한 생각을 나눕니다.
        </p>
      </div>

      <div v-if="posts?.length" class="grid gap-6">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="group relative bg-gray-900/60 border border-gray-800/80 rounded-2xl p-6 sm:p-8 hover:border-brand-600/50 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-brand-900/10 hover:-translate-y-0.5"
        >
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div class="relative">
            <h2 class="text-xl sm:text-2xl font-bold mb-3 group-hover:text-brand-400 transition-colors">
              {{ post.title }}
            </h2>
            <p class="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              {{ post.description }}
            </p>
            <div class="flex items-center gap-2 text-xs text-gray-500">
              <CalendarDays class="w-3.5 h-3.5" />
              <time>{{ post.date }}</time>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center py-20 text-gray-500">
        아직 작성된 글이 없습니다.
      </div>
    </div>
  </div>
</template>
