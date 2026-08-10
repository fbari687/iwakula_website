<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F7F6F2] p-4 font-body">
    
    <UCard 
      class="w-full max-w-[460px] bg-[#F7F6F2]"
      :ui="{ 
        base: 'overflow-hidden border border-[#E7E1D8]',
        ring: '',
        divide: 'divide-none',
        shadow: 'shadow-[0_4px_24px_rgba(36,50,74,0.04)]',
        rounded: 'rounded-[32px]',
        body: { padding: 'px-8 py-12 sm:px-12 sm:py-14' }
      }"
    >
      <!-- Header Area -->
      <div class="flex flex-col items-center justify-center gap-5 mb-12">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-[14px] bg-[#C65A3A] flex items-center justify-center shadow-sm">
            <UIcon name="i-heroicons-squares-2x2-solid" class="text-white text-xl" />
          </div>
          <span class="text-[28px] font-bold font-sans tracking-tight text-[#24324A]">iwakula.</span>
        </div>
        
        <div class="text-center mt-1">
          <h1 class="text-[26px] font-bold font-sans text-[#24324A] leading-tight">Admin CMS</h1>
          <p class="text-[15px] text-[#6B7280] font-body mt-2.5 font-medium tracking-wide">Masuk untuk mengelola konten Iwakula.</p>
        </div>
      </div>

      <!-- Form Area -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <UFormField 
          label="Alamat Email" 
          name="email" 
          :ui="{ label: 'font-semibold text-[13.5px] text-[#24324A] mb-2 tracking-wide uppercase' }"
        >
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <UIcon name="i-heroicons-envelope" class="h-5 w-5 text-[#6B7280]" />
            </div>
            <input 
              v-model="email" 
              type="email" 
              placeholder="admin@iwakula.com"
              :disabled="loading"
              required
              class="block w-full pl-11 pr-4 bg-[#FBFAF8] border border-[#D6CEC2] rounded-[14px] min-h-[48px] text-[#24324A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#C65A3A] focus:ring-4 focus:ring-[#C65A3A]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </UFormField>

        <UFormField 
          label="Kata Sandi" 
          name="password" 
          :ui="{ label: 'font-semibold text-[13.5px] text-[#24324A] mb-2 tracking-wide uppercase' }"
        >
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <UIcon name="i-heroicons-lock-closed" class="h-5 w-5 text-[#6B7280]" />
            </div>
            <input 
              v-model="password" 
              type="password" 
              placeholder="••••••••"
              :disabled="loading"
              required
              class="block w-full pl-11 pr-4 bg-[#FBFAF8] border border-[#D6CEC2] rounded-[14px] min-h-[48px] text-[#24324A] placeholder:text-[#6B7280] focus:outline-none focus:border-[#C65A3A] focus:ring-4 focus:ring-[#C65A3A]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </UFormField>

        <div class="pt-6">
          <UButton 
            type="submit" 
            class="w-full justify-center !text-white font-sans font-bold text-[16px] py-4 transition-all duration-300 rounded-[14px] tracking-wide shadow-sm" 
            :class="['!bg-[#C65A3A] hover:!bg-[#B44E31]']"
            :loading="loading"
            size="xl"
          >
            Masuk ke Dasbor
          </UButton>
        </div>
      </form>

      <!-- Footer Area -->
      <div class="mt-14 text-center">
        <p class="text-[13px] text-[#6B7280] font-body tracking-wider font-medium">
          &copy; {{ new Date().getFullYear() }} Iwakula. All rights reserved.
        </p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: false, // Gunakan layout kosong atau custom (karena admin belum ada layout.vue)
  middleware: [
    async function (to, from) {
      const { user, fetchUser } = useAuth()
      if (!user.value) {
        await fetchUser()
      }
      if (user.value) {
        return navigateTo('/admin')
      }
    }
  ]
})

const email = ref('')
const password = ref('')
const toast = useToast()
const { login, loading } = useAuth()
const router = useRouter()

const handleLogin = async () => {
  if (!email.value || !password.value) return
  
  const res = await login(email.value, password.value)
  
  if (res.success) {
    toast.add({
      title: 'Login Berhasil',
      description: 'Selamat datang kembali.',
      color: 'success'
    })
    
    // Karena belum ada middleware, kita push ke /admin langsung
    router.push('/admin')
  } else {
    toast.add({
      title: 'Login Gagal',
      description: res.message,
      color: 'error'
    })
  }
}
</script>
