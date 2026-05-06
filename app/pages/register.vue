<script setup lang="ts">
import { ArrowLeft, UserPlus } from 'lucide-vue-next'

const { register, isLoggedIn } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: '',
})

const isSubmitting = ref(false)
const error = ref('')

onMounted(() => {
  if (isLoggedIn.value) router.replace('/apply')
})

async function handleSubmit() {
  error.value = ''

  if (!form.email) {
    error.value = '이메일을 입력해주세요'
    return
  }
  if (form.password.length < 6) {
    error.value = '비밀번호는 6자 이상이어야 합니다'
    return
  }
  if (form.password !== form.passwordConfirm) {
    error.value = '비밀번호가 일치하지 않습니다'
    return
  }

  isSubmitting.value = true
  try {
    await register(form.email, form.password, form.name || undefined, form.phone || undefined)
    router.push('/apply')
  } catch (e: any) {
    error.value = e.message || '회원가입에 실패했습니다'
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
        <h1 class="text-2xl sm:text-3xl font-bold mb-2">회원가입</h1>
        <p class="text-gray-400">계정을 만들고 서비스를 신청하세요</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-300 mb-1.5">이메일 <span class="text-red-400">*</span></label>
          <input
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            required
            class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-300 mb-1.5">비밀번호 <span class="text-red-400">*</span></label>
          <input
            v-model="form.password"
            type="password"
            placeholder="6자 이상"
            required
            class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-300 mb-1.5">비밀번호 확인 <span class="text-red-400">*</span></label>
          <input
            v-model="form.passwordConfirm"
            type="password"
            placeholder="비밀번호 재입력"
            required
            class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-300 mb-1.5">이름 <span class="text-gray-600">(선택)</span></label>
          <input
            v-model="form.name"
            type="text"
            placeholder="홍길동"
            class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-300 mb-1.5">연락처 <span class="text-gray-600">(선택)</span></label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="010-1234-5678"
            class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>

        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-600/25 flex items-center justify-center gap-2 mt-6"
        >
          <UserPlus class="w-4 h-4" />
          {{ isSubmitting ? '가입 중...' : '회원가입' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-400 mt-6">
        이미 계정이 있으신가요?
        <NuxtLink to="/login" class="text-brand-400 hover:text-brand-300 font-medium transition-colors">로그인</NuxtLink>
      </p>
    </div>
  </div>
</template>
