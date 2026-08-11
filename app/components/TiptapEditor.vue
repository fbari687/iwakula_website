<template>
  <div class="border border-[#E7E1D8] rounded-[14px] overflow-hidden bg-[#FBFAF8] focus-within:ring-2 focus-within:ring-[#C65A3A] focus-within:border-transparent transition-shadow">
    <!-- Toolbar -->
    <div v-if="editor" class="flex flex-wrap items-center gap-1 p-2 border-b border-[#E7E1D8] bg-[#F7F6F2]">
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-bold"
        :class="[editor.isActive('bold') ? 'bg-[#E7E1D8] text-[#24324A]' : 'text-[#6B7280]']"
        @click="editor.chain().focus().toggleBold().run()"
      />
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-italic"
        :class="[editor.isActive('italic') ? 'bg-[#E7E1D8] text-[#24324A]' : 'text-[#6B7280]']"
        @click="editor.chain().focus().toggleItalic().run()"
      />
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-strikethrough"
        :class="[editor.isActive('strike') ? 'bg-[#E7E1D8] text-[#24324A]' : 'text-[#6B7280]']"
        @click="editor.chain().focus().toggleStrike().run()"
      />
      
      <div class="w-px h-5 bg-[#D6CEC2] mx-1"></div>
      
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-h2"
        :class="[editor.isActive('heading', { level: 2 }) ? 'bg-[#E7E1D8] text-[#24324A]' : 'text-[#6B7280]']"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      />
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-h3"
        :class="[editor.isActive('heading', { level: 3 }) ? 'bg-[#E7E1D8] text-[#24324A]' : 'text-[#6B7280]']"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      />
      
      <div class="w-px h-5 bg-[#D6CEC2] mx-1"></div>
      
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-list-bullet"
        :class="[editor.isActive('bulletList') ? 'bg-[#E7E1D8] text-[#24324A]' : 'text-[#6B7280]']"
        @click="editor.chain().focus().toggleBulletList().run()"
      />
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-list-numbered"
        :class="[editor.isActive('orderedList') ? 'bg-[#E7E1D8] text-[#24324A]' : 'text-[#6B7280]']"
        @click="editor.chain().focus().toggleOrderedList().run()"
      />

      <div class="w-px h-5 bg-[#D6CEC2] mx-1"></div>

      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-arrow-uturn-left"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().undo()"
      />
      <UButton
        size="xs"
        variant="ghost"
        color="neutral"
        icon="i-heroicons-arrow-uturn-right"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().redo()"
      />
    </div>
    
    <!-- Editor Content -->
    <div class="p-4 min-h-[200px] prose prose-sm prose-stone max-w-none focus:outline-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'focus:outline-none min-h-[150px] text-[#24324A]',
    },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(() => props.modelValue, (value) => {
  const isSame = editor.value?.getHTML() === value
  if (isSame) return
  editor.value?.commands.setContent(value, false)
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>
