<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import {
  ArrowLeft,
  Send,
  Check,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  FileText,
  ChevronDown,
} from 'lucide-vue-next'

const API_URL = 'https://admin.atee.app'

const route = useRoute()

const contactForm = reactive({
  name: '',
  email: '',
  phone: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref('')
const openSample = ref<number | null>(null)

const editor = useEditor({
  extensions: [
    StarterKit,
    Underline,
    Placeholder.configure({
      placeholder: '만들고 싶은 서비스를 자유롭게 설명해주세요...',
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-invert max-w-none min-h-[200px] focus:outline-none px-4 py-3',
    },
  },
})

onMounted(() => {
  const idea = route.query.idea as string | undefined
  if (idea && editor.value) {
    editor.value.commands.setContent(`<p>${idea}</p>`)
  }
})

const samples = [
  {
    title: '반려동물 케어 서비스',
    content: `<h2>펫시터 매칭 플랫폼</h2>
<p>반려동물 보호자와 펫시터를 연결해주는 서비스를 만들고 싶습니다.</p>
<p><strong>주요 기능:</strong></p>
<ul>
<li>지역 기반 펫시터 검색 및 매칭</li>
<li>실시간 돌봄 현황 사진/영상 공유</li>
<li>리뷰 및 평점 시스템</li>
<li>예약 및 결제 기능</li>
</ul>
<p><strong>타겟 사용자:</strong> 출장이나 여행이 잦은 반려동물 보호자</p>
<p>비슷한 서비스로 '펫시팅'이 있는데, 더 간편한 UI와 실시간 알림에 초점을 맞추고 싶어요.</p>`,
  },
  {
    title: '동네 소식 커뮤니티',
    content: `<h2>우리 동네 소식통</h2>
<p>동네 주민들이 지역 소식과 정보를 공유하는 커뮤니티 서비스입니다.</p>
<p><strong>만들고 싶은 이유:</strong></p>
<p>기존 카페나 밴드는 너무 복잡하고, 동네 소식만 간단히 볼 수 있는 곳이 없어서요.</p>
<p><strong>원하는 기능:</strong></p>
<ul>
<li>동네 인증 후 글쓰기</li>
<li>맛집, 병원, 학원 등 카테고리별 추천</li>
<li>중고거래 게시판</li>
<li>동네 이벤트/모임 캘린더</li>
</ul>
<p>처음에는 제가 사는 <strong>성수동</strong> 중심으로 시작하고, 반응이 좋으면 다른 동네로 확장하고 싶습니다.</p>`,
  },
]

function loadSample(index: number) {
  if (editor.value) {
    editor.value.commands.setContent(samples[index].content)
  }
  openSample.value = null
}

function toggleSample(index: number) {
  openSample.value = openSample.value === index ? null : index
}

async function handleSubmit() {
  if (!editor.value) return
  const content = editor.value.getHTML()
  if (!content || content === '<p></p>') {
    submitError.value = '아이디어 내용을 입력해주세요'
    return
  }

  submitError.value = ''
  isSubmitting.value = true

  try {
    const res = await fetch(`${API_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactForm.name || undefined,
        email: contactForm.email || undefined,
        phone: contactForm.phone || undefined,
        content,
      }),
    })

    const data = await res.json()
    if (data.success) {
      isSubmitted.value = true
    } else {
      submitError.value = data.message || '전송에 실패했습니다. 다시 시도해주세요.'
    }
  } catch {
    submitError.value = '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
  } finally {
    isSubmitting.value = false
  }
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<template>
  <div class="min-h-screen pt-20 pb-16 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Back link -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft class="w-4 h-4" />
        메인으로
      </NuxtLink>

      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold mb-3">아이디어를 들려주세요</h1>
        <p class="text-gray-400 text-lg">
          형식은 자유입니다. 만들고 싶은 서비스를 편하게 설명해주세요.
        </p>
      </div>

      <!-- Steps indicator -->
      <div class="flex items-center gap-2 mb-10 text-sm">
        <div class="flex items-center gap-2 text-brand-400 font-medium">
          <span class="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">1</span>
          아이디어 공유
        </div>
        <div class="w-8 h-px bg-gray-700" />
        <div class="flex items-center gap-2 text-gray-500">
          <span class="w-7 h-7 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center text-xs font-bold">2</span>
          제작
        </div>
        <div class="w-8 h-px bg-gray-700" />
        <div class="flex items-center gap-2 text-gray-500">
          <span class="w-7 h-7 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center text-xs font-bold">3</span>
          오픈
        </div>
      </div>

      <!-- Submitted state -->
      <div
        v-if="isSubmitted"
        class="bg-gray-900/50 border border-brand-500/30 rounded-2xl p-8 text-center"
      >
        <Check class="w-12 h-12 text-brand-400 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2">신청이 완료되었습니다!</h2>
        <p class="text-gray-400 mb-6">영업일 기준 1일 이내에 연락드리겠습니다.</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          메인으로 돌아가기
        </NuxtLink>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Sample examples -->
        <div class="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
          <div class="flex items-center gap-2 mb-3">
            <FileText class="w-4 h-4 text-brand-400" />
            <span class="text-sm font-medium text-gray-300">이렇게 적으시면 됩니다</span>
          </div>
          <div class="space-y-2">
            <div
              v-for="(sample, index) in samples"
              :key="index"
              class="border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                class="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800/50 transition-colors"
                @click="toggleSample(index)"
              >
                <span class="text-sm text-gray-300">{{ sample.title }}</span>
                <ChevronDown
                  class="w-4 h-4 text-gray-500 transition-transform duration-200"
                  :class="{ 'rotate-180': openSample === index }"
                />
              </button>
              <div
                v-if="openSample === index"
                class="px-4 pb-4 border-t border-gray-700"
              >
                <div
                  class="prose prose-invert prose-sm max-w-none mt-3 text-gray-400"
                  v-html="sample.content"
                />
                <button
                  type="button"
                  class="mt-3 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
                  @click="loadSample(index)"
                >
                  이 예제로 채우기
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tiptap Editor -->
        <div class="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
          <div class="flex items-center gap-1 px-3 py-2 border-b border-gray-800 bg-gray-900/80">
            <button
              v-if="editor"
              type="button"
              class="p-1.5 rounded-lg transition-colors"
              :class="editor.isActive('bold') ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'"
              @click="editor.chain().focus().toggleBold().run()"
            >
              <BoldIcon class="w-4 h-4" />
            </button>
            <button
              v-if="editor"
              type="button"
              class="p-1.5 rounded-lg transition-colors"
              :class="editor.isActive('italic') ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'"
              @click="editor.chain().focus().toggleItalic().run()"
            >
              <ItalicIcon class="w-4 h-4" />
            </button>
            <button
              v-if="editor"
              type="button"
              class="p-1.5 rounded-lg transition-colors"
              :class="editor.isActive('underline') ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'"
              @click="editor.chain().focus().toggleUnderline().run()"
            >
              <UnderlineIcon class="w-4 h-4" />
            </button>
            <div class="w-px h-5 bg-gray-700 mx-1" />
            <button
              v-if="editor"
              type="button"
              class="p-1.5 rounded-lg transition-colors"
              :class="editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            >
              <Heading2 class="w-4 h-4" />
            </button>
            <button
              v-if="editor"
              type="button"
              class="p-1.5 rounded-lg transition-colors"
              :class="editor.isActive('bulletList') ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'"
              @click="editor.chain().focus().toggleBulletList().run()"
            >
              <List class="w-4 h-4" />
            </button>
            <button
              v-if="editor"
              type="button"
              class="p-1.5 rounded-lg transition-colors"
              :class="editor.isActive('orderedList') ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'"
              @click="editor.chain().focus().toggleOrderedList().run()"
            >
              <ListOrdered class="w-4 h-4" />
            </button>
          </div>
          <EditorContent :editor="editor" />
        </div>

        <!-- Contact info (optional) -->
        <div class="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 space-y-4">
          <p class="text-sm text-gray-400">연락처 (선택사항 - 입력하시면 진행 상황을 안내드립니다)</p>
          <div class="grid sm:grid-cols-3 gap-4">
            <input
              v-model="contactForm.name"
              type="text"
              placeholder="이름"
              class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            <input
              v-model="contactForm.email"
              type="email"
              placeholder="이메일"
              class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
            <input
              v-model="contactForm.phone"
              type="tel"
              placeholder="연락처"
              class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
          </div>
        </div>

        <!-- Error message -->
        <p v-if="submitError" class="text-red-400 text-sm">{{ submitError }}</p>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-600/25 flex items-center justify-center gap-2"
        >
          <Send class="w-4 h-4" />
          {{ isSubmitting ? '전송 중...' : '아이디어 제출하기' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style>
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #6b7280;
  pointer-events: none;
  height: 0;
}

.tiptap {
  min-height: 200px;
}

.tiptap h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.tiptap p {
  margin-bottom: 0.5rem;
}

.tiptap ul,
.tiptap ol {
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.tiptap li {
  margin-bottom: 0.25rem;
}

.tiptap strong {
  font-weight: 700;
}
</style>
