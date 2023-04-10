<template>
  <button
    class="dlt-btn"
    :disabled="disabled"
    :type="props.htmlType"
    :size="props.size"
    :class="[{'dlt-primary-grey': props.dltPrimaryGrey}, btnType, btnSize]"
    @click="handleClick"
  >
    <i-icon-loading v-if="loading" class="icon-loading" />
    <slot v-if="$slots.icon" name="icon" />
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import './style/index.scss'

defineOptions({
  name: 'dlt-button'
})

interface Props {
  htmlType?: 'button' | 'submit' | 'reset'
  dltPrimaryGrey?: boolean
  loading?: boolean
  disabled?: boolean
  size?: string
  icon?: string
  type?: 'primary' | 'link' | 'danger' | ''
}

const props = defineProps<Props>()

  const emits = defineEmits<{
  (e: 'click', evt: MouseEvent): void
}>()

const btnType = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'dlt-btn-primary'
    case 'link':
      return 'dlt-btn-link'
    case 'danger':
      return 'dlt-btn-danger'
    default:
      return 'dlt-btn-default'
  }
})

const btnSize = computed(() => {
  switch (props.size) {
    case 'large':
      return 'dlt-btn-large'
    case 'largest':
      return 'dlt-btn-largest'
    default:
      return ''
  }
})

// const slots = useSlots()

const handleClick = (evt: MouseEvent) => {
  emits('click', evt)
}
</script>

<!-- <style lang='scss' scoped>
@import './style/index.scss';
</style> -->
