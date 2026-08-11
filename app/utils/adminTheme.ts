/**
 * Centralized Design System Tokens for Iwakula Admin CMS
 * Auto-imported by Nuxt 4 across all admin components & pages.
 */

export const adminFormFieldUi = {
  label: 'text-[#24324A] font-semibold text-sm',
  description: 'text-[#6B7280] text-xs mt-1'
}

export const adminInputUi = { 
  rounded: 'rounded-[14px]',
  placeholder: 'placeholder:text-[#9CA3AF]',
  base: 'bg-[#FBFAF8] text-[#24324A] hover:!bg-[#FBFAF8] focus:!bg-[#FBFAF8] dark:bg-[#FBFAF8] dark:text-[#24324A] dark:hover:!bg-[#FBFAF8] dark:focus:!bg-[#FBFAF8] transition-colors disabled:bg-[#F7F6F2] disabled:text-[#9CA3AF] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
  color: { 
    white: { 
      outline: 'shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus:ring-2 focus:ring-[#C65A3A]' 
    } 
  } 
}

export const adminSelectUi = { 
  rounded: 'rounded-[14px]',
  placeholder: 'placeholder:text-[#9CA3AF]',
  base: 'bg-[#FBFAF8] text-[#24324A] hover:!bg-[#F3EEE8] hover:!text-[#24324A] focus:!bg-[#FBFAF8] dark:bg-[#FBFAF8] dark:text-[#24324A] dark:hover:!bg-[#F3EEE8] dark:hover:!text-[#24324A] dark:focus:!bg-[#FBFAF8] transition-colors disabled:bg-[#F7F6F2] disabled:text-[#9CA3AF] cursor-pointer',
  color: { 
    white: { 
      outline: 'shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus:ring-2 focus:ring-[#C65A3A]' 
    } 
  },
  content: 'bg-[#FBFAF8] border border-[#E7E1D8] rounded-[14px] shadow-lg p-1.5 text-[#24324A] z-50 dark:bg-[#FBFAF8] dark:text-[#24324A]',
  item: 'text-[#24324A] hover:!bg-[#C65A3A] hover:!text-white data-[highlighted]:!bg-[#C65A3A] data-[highlighted]:!text-white data-[disabled]:!text-[#9CA3AF] data-[disabled]:!opacity-50 cursor-pointer rounded-lg px-3 py-2 transition-colors font-medium text-sm'
}

export const adminCheckboxUi = {
  base: 'h-4 w-4 rounded border-[#E7E1D8] text-[#C65A3A] focus:ring-[#C65A3A] [&_svg]:!text-white dark:bg-[#FBFAF8] cursor-pointer',
  label: 'text-sm font-medium text-[#24324A] cursor-pointer select-none',
  icon: 'text-white'
}

export const adminPrimaryBtnClass = 'bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-[14px] px-6 py-2.5 shadow-sm border-0 font-medium transition-colors disabled:opacity-50 cursor-pointer'
export const adminSecondaryBtnClass = 'bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] rounded-[14px] px-6 py-2.5 transition-colors disabled:opacity-50 cursor-pointer'
