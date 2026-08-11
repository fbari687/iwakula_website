<template>
  <UModal 
    :open="open" 
    :ui="{
      overlay: 'bg-[#24324A]/40 backdrop-blur-xs z-50',
      content: 'max-w-md w-full bg-[#FBFAF8] border border-[#E7E1D8] rounded-[24px] shadow-2xl p-6 text-[#24324A] dark:bg-[#FBFAF8] dark:text-[#24324A] z-50'
    }"
    @update:open="val => $emit('update:open', val)"
  >
    <template #content>
      <div class="flex flex-col items-center text-center">
        <!-- Icon Warning Badge -->
        <div class="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 shrink-0 shadow-xs">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-7 h-7" />
        </div>

        <!-- Headline & Description -->
        <h3 class="text-xl font-semibold text-[#24324A] font-sans tracking-tight">
          {{ title }}
        </h3>
        <p class="text-sm text-[#6B7280] mt-2 leading-relaxed">
          {{ description }}
        </p>

        <!-- Actions -->
        <div class="flex items-center justify-center gap-3 w-full mt-6">
          <UButton
            color="neutral"
            variant="soft"
            :disabled="loading"
            class="flex-1 justify-center bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] rounded-[14px] py-2.5 font-medium transition-colors cursor-pointer"
            @click="$emit('update:open', false)"
          >
            Batal
          </UButton>

          <UButton
            color="error"
            variant="solid"
            :loading="loading"
            class="flex-1 justify-center bg-rose-600 hover:bg-rose-700 text-white rounded-[14px] py-2.5 font-medium border-0 shadow-sm transition-colors cursor-pointer"
            @click="$emit('confirm')"
          >
            Ya, Hapus
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  open: boolean
  title?: string
  description?: string
  loading?: boolean
}>(), {
  title: 'Konfirmasi Penghapusan',
  description: 'Apakah Anda yakin ingin menghapus data ini secara permanen? Data yang telah dihapus tidak dapat dikembalikan.',
  loading: false
})

defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
}>()
</script>
