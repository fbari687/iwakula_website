<template>
  <div v-if="!user" class="min-h-screen flex items-center justify-center bg-[#F7F6F2] p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#C65A3A]/20 selection:text-[#C65A3A]">
    
    <!-- Outer Card Wrapper -->
    <div class="w-full max-w-[450px] space-y-6">
      
      <!-- Logo Branding Header -->
      <div class="flex flex-col items-center justify-center text-center space-y-3">
        <div class="h-14 w-14 rounded-2xl bg-[#C65A3A] flex items-center justify-center shadow-md border border-[#b04f32] text-white transition-transform hover:scale-105 duration-300">
          <UIcon name="i-heroicons-squares-2x2-solid" class="text-3xl" />
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#24324A] tracking-tight">Iwakula Admin</h1>
          <p class="text-xs sm:text-sm text-[#6B7280] font-medium mt-1">Portal Manajemen Konten & Katalog UMKM</p>
        </div>
      </div>

      <!-- Main Login Card -->
      <UCard 
        class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[24px] shadow-sm overflow-hidden"
        :ui="{ body: 'p-6 sm:p-9 space-y-6', root: 'ring-1 ring-[#E7E1D8]' }"
      >
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Alamat Email -->
          <UFormField 
            label="Alamat Email" 
            name="email" 
            required 
            :ui="adminFormFieldUi"
          >
            <UInput 
              v-model="email" 
              type="email" 
              placeholder="admin@iwakula.com"
              icon="i-heroicons-envelope"
              autocomplete="email"
              size="lg"
              :disabled="loading"
              class="w-full"
              :ui="loginInputUi"
              aria-label="Alamat Email"
            />
          </UFormField>

          <!-- Kata Sandi -->
          <UFormField 
            label="Kata Sandi" 
            name="password" 
            required 
            :ui="adminFormFieldUi"
          >
            <div class="relative">
              <UInput 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••"
                icon="i-heroicons-lock-closed"
                autocomplete="current-password"
                size="lg"
                :disabled="loading"
                class="w-full pr-12"
                :ui="loginInputUi"
                aria-label="Kata Sandi"
              />
              <button 
                type="button" 
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#24324A] transition-colors p-1.5 rounded-lg focus:outline-none cursor-pointer"
                :title="showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                @click="showPassword = !showPassword"
              >
                <UIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="text-xl" />
              </button>
            </div>
          </UFormField>

          <!-- Submit Button -->
          <div class="pt-2">
            <UButton 
              type="submit" 
              :loading="loading"
              class="w-full justify-center text-white bg-[#C65A3A] hover:bg-[#b04f32] rounded-[14px] py-3.5 min-h-[50px] text-base font-semibold shadow-xs transition-colors border-0 disabled:opacity-50 cursor-pointer"
            >
              <template v-if="!loading">
                <span>Masuk ke Dasbor</span>
                <UIcon name="i-heroicons-arrow-right-on-rectangle" class="text-xl ml-2" />
              </template>
              <template v-else>
                <span>Memverifikasi...</span>
              </template>
            </UButton>
          </div>
        </form>
      </UCard>

      <!-- Footer Info -->
      <div class="text-center">
        <p class="text-xs text-[#6B7280] font-medium tracking-wide">
          &copy; {{ new Date().getFullYear() }} UMKM Iwakula. Seluruh Hak Cipta Dilindungi.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: false
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const toast = useToast()
const { user, login, loading } = useAuth()
const router = useRouter()

// UI Khusus Halaman Login (Lebih Longgar & Tinggi)
const loginInputUi = computed(() => ({
  ...adminInputUi,
  base: `${adminInputUi.base} py-3.5 text-base min-h-[50px]`
}))

const handleLogin = async () => {
  if (!email.value || !password.value) return
  
  const res = await login(email.value, password.value)
  
  if (res.success) {
    toast.add({
      title: 'Login Berhasil',
      description: 'Selamat datang kembali di Admin Dashboard Iwakula.',
      color: 'success'
    })
    router.push('/admin')
  } else {
    toast.add({
      title: 'Login Gagal',
      description: res.message || 'Alamat email atau kata sandi tidak valid.',
      color: 'error'
    })
  }
}
</script>
