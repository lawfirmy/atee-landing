<script setup lang="ts">
import {
  FileText,
  Globe,
  ArrowRight,
  Check,
  Lightbulb,
  Rocket,
  ChevronRight,
} from 'lucide-vue-next'

useScrollReveal()

const ideaInput = ref('')

function handleStart() {
  const query = ideaInput.value.trim() ? `?idea=${encodeURIComponent(ideaInput.value.trim())}` : ''
  navigateTo(`/apply${query}`)
}

const steps = [
  {
    icon: Lightbulb,
    title: '아이디어 공유',
    subtitle: '자유롭게 작성',
    description: '만들고 싶은 서비스를 자유롭게 적어주세요. 형식은 상관없습니다.',
  },
  {
    icon: FileText,
    title: '제작',
    subtitle: '기획부터 개발까지',
    description: '전달받은 아이디어를 기반으로 기획, 디자인, 개발을 진행합니다.',
  },
  {
    icon: Rocket,
    title: '오픈',
    subtitle: 'site.atee.app 배포',
    description: '완성된 서비스를 site.atee.app 주소로 배포합니다.',
  },
]

const plans = [
  {
    name: 'Standard',
    price: '33',
    unit: '만원',
    description: '단순 홍보 사이트',
    duration: '3일 소요',
    monthly: '월 관리비 33만원',
    features: [
      '반응형 랜딩페이지',
      '모바일 최적화',
      '기본 SEO 설정',
      '문의 폼 연동',
      '1회 수정 포함',
    ],
    highlighted: false,
  },
  {
    name: 'Deluxe',
    price: '110',
    unit: '만원',
    description: '기능형 서비스',
    duration: '7일 소요',
    monthly: '월 관리비 55만원',
    features: [
      'Standard 전체 포함',
      '관리자 대시보드',
      '회원 시스템',
      'DB 연동',
      '결제 시스템 연동 가능',
      '3회 수정 포함',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '330',
    unit: '만원~',
    description: 'SaaS 모델',
    duration: '30일 소요',
    monthly: '월 관리비 165만원',
    features: [
      'Deluxe 전체 포함',
      'SaaS 아키텍처 설계',
      '멀티 테넌트 지원',
      'API 설계 및 연동',
      '자동화 파이프라인',
      '무제한 수정 (1개월)',
    ],
    highlighted: false,
  },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-brand-950/30 via-gray-950 to-gray-950" />
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-3xl" />

      <div class="relative text-center max-w-3xl mx-auto">
        <div class="reveal">
          <p class="text-brand-400 font-medium text-sm sm:text-base mb-4 tracking-wide uppercase">
            Build Your Website
          </p>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            아이디어를<br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">
              현실로
            </span>
            만드세요
          </h1>
          <p class="text-gray-400 text-lg sm:text-xl mb-10 max-w-xl mx-auto">
            A4 1장 분량의 아이디어만 적어주세요.
            <span class="text-white font-medium">site.atee.app</span> 주소로 당신의 서비스가 완성됩니다.
          </p>
        </div>

        <div class="reveal flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
          <div class="relative w-full">
            <input
              v-model="ideaInput"
              type="text"
              maxlength="30"
              placeholder="만들고 싶은 서비스를 한 줄로 적어보세요"
              class="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              @keyup.enter="handleStart"
            />
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              {{ ideaInput.length }}/30
            </span>
          </div>
          <button
            class="w-full sm:w-auto whitespace-nowrap bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-600/25 flex items-center justify-center gap-2"
            @click="handleStart"
          >
            시작하기
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>

        <p class="reveal text-gray-500 text-sm mt-6">
          이미 <span class="text-gray-300">50+</span>개의 프로젝트가 atee에서 시작되었습니다
        </p>
      </div>
    </section>

    <!-- Process Section -->
    <section id="process" class="py-24 sm:py-32 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="reveal text-center mb-16">
          <p class="text-brand-400 font-medium text-sm mb-3 uppercase tracking-wide">How it works</p>
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            간단한 3단계로 완성
          </h2>
          <p class="text-gray-400 max-w-xl mx-auto">
            복잡한 과정은 저희가 대신합니다. 당신은 아이디어만 준비하세요.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 sm:gap-8">
          <div
            v-for="(step, index) in steps"
            :key="step.title"
            class="reveal group relative bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-brand-600/50 transition-all duration-300"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-brand-600/10 rounded-xl flex items-center justify-center group-hover:bg-brand-600/20 transition-colors">
                <component :is="step.icon" class="w-6 h-6 text-brand-400" />
              </div>
              <div>
                <span class="text-xs text-gray-500 font-medium">STEP {{ index + 1 }}</span>
                <h3 class="text-lg font-bold">{{ step.title }}</h3>
              </div>
            </div>
            <p class="text-sm text-brand-400 font-medium mb-2">{{ step.subtitle }}</p>
            <p class="text-gray-400 text-sm leading-relaxed">{{ step.description }}</p>

            <ChevronRight
              v-if="index < steps.length - 1"
              class="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-700 z-10"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-24 sm:py-32 px-4 bg-gray-900/30">
      <div class="max-w-6xl mx-auto">
        <div class="reveal text-center mb-16">
          <p class="text-brand-400 font-medium text-sm mb-3 uppercase tracking-wide">Pricing</p>
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            투명한 요금제
          </h2>
          <p class="text-gray-400 max-w-xl mx-auto">
            프로젝트 규모에 맞는 플랜을 선택하세요. 추가 비용은 없습니다.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 sm:gap-8">
          <div
            v-for="(plan, index) in plans"
            :key="plan.name"
            class="reveal relative rounded-2xl p-8 transition-all duration-300"
            :class="[
              plan.highlighted
                ? 'bg-gradient-to-b from-brand-950/80 to-gray-900 border-2 border-brand-500 shadow-xl shadow-brand-600/10'
                : 'bg-gray-900/50 border border-gray-800 hover:border-gray-700',
            ]"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div
              v-if="plan.highlighted"
              class="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-4 py-1 rounded-full"
            >
              인기
            </div>

            <h3 class="text-xl font-bold mb-1">{{ plan.name }}</h3>
            <p class="text-gray-400 text-sm mb-6">{{ plan.description }}</p>

            <div class="flex items-baseline gap-1 mb-2">
              <span class="text-4xl font-extrabold">{{ plan.price }}</span>
              <span class="text-gray-400 text-lg">{{ plan.unit }}</span>
            </div>
            <p class="text-sm text-gray-500 mb-1">{{ plan.duration }}</p>
            <p class="text-xs text-brand-400/70 mb-8">{{ plan.monthly }}</p>

            <ul class="space-y-3 mb-8">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-start gap-3 text-sm text-gray-300"
              >
                <Check class="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                {{ feature }}
              </li>
            </ul>

            <NuxtLink
              to="/apply"
              class="block w-full text-center py-3 rounded-xl font-semibold transition-all duration-200"
              :class="[
                plan.highlighted
                  ? 'bg-brand-600 hover:bg-brand-500 text-white hover:shadow-lg hover:shadow-brand-600/25'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300',
              ]"
            >
              신청하기
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="py-24 sm:py-32 px-4">
      <div class="max-w-3xl mx-auto reveal text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">
          아이디어만 적으면 끝
        </h2>
        <p class="text-gray-400 text-lg mb-8">
          A4 용지 1장 분량의 아이디어만 준비하세요. 나머지는 저희가 합니다.
        </p>
        <NuxtLink
          to="/apply"
          class="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-600/25"
        >
          아이디어를 현실로 만드세요
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
