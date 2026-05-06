<template>
  <div class="min-h-screen bg-gray-950 text-white font-sans">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight">
          <span class="text-brand-400">a</span>tee
        </NuxtLink>
        <div class="hidden sm:flex items-center gap-8 text-sm text-gray-400">
          <NuxtLink to="/#process" class="hover:text-white transition-colors">프로세스</NuxtLink>
          <NuxtLink to="/#pricing" class="hover:text-white transition-colors">요금</NuxtLink>
          <NuxtLink
            to="/apply"
            class="hover:text-white transition-colors duration-200 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-500"
          >
            신청하기
          </NuxtLink>
        </div>
      </div>
    </nav>

    <NuxtPage />

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-gray-800/50">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
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
