<template>
  <div ref="elRef" :class="[$attrs.class]" :style="styles"></div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import echarts from '@/plugins/echarts/index'
import { debounce } from 'lodash'
import {
  computed,
  type PropType,
  ref,
  unref,
  watch,
  onMounted,
  onBeforeUnmount,
  onActivated,
  nextTick
} from 'vue'

const props = defineProps<{
  options: PropType<EChartsOption>
  width?: number | string
  height?: number | string
}>()

const options = computed(() => {
  return Object.assign(props.options)
})

const elRef = ref<HTMLDivElement>()

let echartRef: echarts.ECharts | null = null

const styles = computed(() => {
  const width =
    typeof props.width === 'string' ? props.width : `${props.width}px`
  const height =
    typeof props.height === 'string' ? props.height : `${props.height}px`

  return {
    width: width ?? null,
    height: height ?? null
  }
})

const initChart = () => {
  if (unref(elRef) && props.options) {
    echartRef = echarts.init(unref(elRef) as HTMLElement)
    echartRef?.setOption(unref(options))
  }
}

watch(
  () => options.value,
  (options) => {
    if (echartRef) {
      echartRef?.setOption(options)
    }
  },
  {
    deep: true
  }
)

const resizeHandler = debounce(() => {
  if (echartRef) {
    echartRef.resize()
  }
}, 100)

onMounted(() => {
  nextTick(() => initChart())

  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})

onActivated(() => {
  if (echartRef) {
    echartRef.resize()
  }
})
</script>
