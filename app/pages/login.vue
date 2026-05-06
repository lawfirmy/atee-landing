<script setup lang="ts">
import { ArrowLeft, LogIn } from 'lucide-vue-next'

const { login, isLoggedIn } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const isSubmitting = ref(false)
const error = ref('')

onMounted(() => {
  if (isLoggedIn.value) router.replace('/apply')
})

async function handleSubmit() {
  error.value = ''

  if (!form.email || !form.password) {
    error.value = '이메일과 비밀번호를 입력해주세요'
    return
  }

  isSubmitting.value = true
  try {
    await login(form.email, form.password)
    router.push('/apply')
  } catch (e: any) {
    error.value = e.message || '로그인에 실패했습니다'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen pt-20 pb-16 px-4 flex items-start justify-center">
    <div class="w-full max-w-md mt-8">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft class="w-4 h-4" />
        메인으로
      </NuxtLink>

      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2">로그인</h1>
        <p class="text-gray-400">계정에 로그인하세요</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-300 mb-1.5">이메일</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            required
            class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-300 mb-1.5">비밀번호</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="비밀번호 입력"
            required
            class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>

        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-600/25 flex items-center justify-center gap-2 mt-6"
        >
          <LogIn class="w-4 h-4" />
          {{ isSubmitting ? '로그인 중...' : '로그인' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-400 mt-6">
        계정이 없으신가요?
        <NuxtLink to="/register" class="text-brand-400 hover:text-brand-300 font-medium transition-colors">회원가입</NuxtLink>
      </p>
    </div>
  </div>
</template>
