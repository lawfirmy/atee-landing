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
  Wrench,
} from 'lucide-vue-next'

const API_URL = 'https://admin.atee.app'

const contactForm = reactive({
  name: '',
  email: '',
  phone: '',
  siteUrl: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref('')

const editor = useEditor({
  extensions: [
    StarterKit,
    Underline,
    Placeholder.configure({
      placeholder: '수정이 필요한 부분을 상세하게 설명해주세요. (예: 메인 페이지 배너 이미지 교체, 연락처 번호 변경, 버튼 색상 수정 등)',
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-invert max-w-none min-h-[250px] focus:outline-none px-4 py-3',
    },
  },
})

async function handleSubmit() {
  if (!editor.value) return
  const content = editor.value.getHTML()
  if (!content || content === '<p></p>') {
    submitError.value = '수정 내용을 입력해주세요'
    return
  }

  submitError.value = ''
  isSubmitting.value = true

  try {
    const res = await fetch(`${API_URL}/api/quick-fixes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contactForm.name || undefined,
        email: contactForm.email || undefined,
        phone: contactForm.phone || undefined,
        siteUrl: contactForm.siteUrl || undefined,
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
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-brand-600/10 border border-brand-600/20 rounded-xl flex items-center justify-center">
            <Wrench class="w-5 h-5 text-brand-400" />
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold">빠른 수정신청</h1>
        </div>
        <p class="text-gray-400 text-lg">
          운영 중인 서비스에 수정이 필요하신가요? 수정 내용을 상세하게 적어주세요.
        </p>
      </div>

      <!-- Submitted state -->
      <div
        v-if="isSubmitted"
        class="bg-gray-900/50 border border-brand-500/30 rounded-2xl p-8 text-center"
      >
        <Check class="w-12 h-12 text-brand-400 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2">수정 신청이 접수되었습니다!</h2>
        <p class="text-gray-400 mb-6">영업일 기준 1일 이내에 확인 후 연락드리겠습니다.</p>
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
        <!-- Site URL -->
        <div class="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
          <label class="block text-sm font-medium text-gray-300 mb-2">
            서비스 URL <span class="text-gray-500 font-normal">(선택)</span>
          </label>
          <input
            v-model="contactForm.siteUrl"
            type="url"
            placeholder="https://example.atee.app"
            class="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>

        <!-- Tiptap Editor -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            수정 내용 <span class="text-red-400">*</span>
          </label>
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
        </div>

        <!-- Contact info -->
        <div class="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 space-y-4">
          <p class="text-sm text-gray-400">연락처 <span class="text-gray-500">(선택 - 진행 상황을 안내드립니다)</span></p>
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
          {{ isSubmitting ? '전송 중...' : '수정 신청하기' }}
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
  min-height: 250px;
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
