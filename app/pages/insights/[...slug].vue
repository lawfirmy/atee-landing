<script setup lang="ts">
import { ArrowLeft, CalendarDays } from 'lucide-vue-next'

const route = useRoute()
const slugPath = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug

const { data: post } = await useAsyncData(`insight-${slugPath}`, () =>
  queryCollection('insights')
    .path(`/insights/${slugPath}`)
    .first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useHead({
  title: post.value?.title ? `${post.value.title} - atee 인사이트` : 'atee 인사이트',
  meta: [
    { name: 'description', content: post.value?.description || '' },
  ],
})
</script>

<template>
  <div class="pt-24 pb-16 px-4">
    <article class="max-w-3xl mx-auto">
      <NuxtLink
        to="/insights"
        class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-400 transition-colors mb-8"
      >
        <ArrowLeft class="w-4 h-4" />
        인사이트 목록
      </NuxtLink>

      <header class="mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold leading-tight mb-4">
          {{ post?.title }}
        </h1>
        <p class="text-gray-400 text-lg mb-4">{{ post?.description }}</p>
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays class="w-4 h-4" />
          <time>{{ post?.date }}</time>
        </div>
      </header>

      <div class="prose prose-invert prose-lg max-w-none
        prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-300 prose-p:leading-relaxed
        prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white
        prose-blockquote:border-brand-600/50 prose-blockquote:text-gray-400
        prose-li:text-gray-300
        prose-hr:border-gray-800
      ">
        <ContentRenderer v-if="post" :value="post" />
      </div>
    </article>
  </div>
</template>
