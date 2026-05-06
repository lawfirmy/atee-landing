<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => {
  mobileMenuOpen.value = false
})

const navLinks = [
  { label: '프로세스', to: '/#process' },
  { label: '사례', to: '/#works' },
  { label: '가격', to: '/#pricing' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white font-sans">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight">
          <span class="text-brand-400">a</span>tee
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="hidden sm:flex items-center gap-8 text-sm text-gray-400">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="hover:text-white transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/apply"
            class="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-500 transition-colors duration-200"
          >
            신청하기
          </NuxtLink>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Menu v-if="!mobileMenuOpen" class="w-5 h-5" />
          <X v-else class="w-5 h-5" />
        </button>
      </div>

      <!-- Mobile menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="mobileMenuOpen"
          class="sm:hidden bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50 px-4 pb-4"
        >
          <div class="flex flex-col gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="text-gray-400 hover:text-white px-3 py-2.5 rounded-lg hover:bg-gray-900 transition-colors text-sm"
              @click="mobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <NuxtLink
              to="/apply"
              class="bg-brand-600 text-white text-center px-3 py-2.5 rounded-lg hover:bg-brand-500 transition-colors text-sm mt-1"
              @click="mobileMenuOpen = false"
            >
              신청하기
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>

    <NuxtPage />

    <!-- Footer -->
    <footer class="relative py-12 px-4 border-t border-gray-800/50">
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
      <div class="relative max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>&copy; 2026 atee. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-gray-300 transition-colors">이용약관</a>
          <a href="#" class="hover:text-gray-300 transition-colors">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>
