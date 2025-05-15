<template>
  <div 
    class="business-avatar" 
    :class="[`avatar-size-${size}`, type && `avatar-type-${type}`]"
    :style="{ '--border-color': props.borderColor }"
  >
    <a-avatar
      v-bind="$attrs"
      :image-url="props.type === 'icon' ? UserIcon : $attrs['image-url']"
    >
      <template v-for="slot in slots" :key="slot" #[slot]>
        <slot :name="slot"></slot>
      </template>
    </a-avatar>
  </div>
</template>
  
<script setup lang='ts'>
import { computed, useSlots } from 'vue'
import UserIcon from './u_user.svg'

type Size = 'xs' | 'small' | 'medium' | 'large'
type Type = 'border' | 'icon' | undefined
interface Props {
  size?: Size  // xs, small, medium, large
  type?: Type // border, icon, 空为默认
  borderColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  type: undefined,
  borderColor: '#D6DFEC'
})

/**
 * @desciption slots
 * 
 */
const slots = computed(() => {
  try {
    return Object.keys(useSlots()).filter((item) => item !== 'error' && item !== 'loader')
  } catch (error) {
    return []
  }
})


</script>
