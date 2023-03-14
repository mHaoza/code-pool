<template>
  <div class="form">
    <el-form :label-width="labelWidth">
      <el-row label-position="left">
        <template v-for="item in formItems" :key="item.label">
          <el-col v-if="item.show?.rule(modelValue[item.show.field]) ?? true">
            <el-form-item :label="item.label" :rules="item.rules">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                />
              </template>
              <template v-if="item.type === 'input-number'">
                <el-input-number
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.code"
                    :value="option.code"
                    :label="option.label"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { IFormItem } from './types'
import { defineProps, withDefaults, defineEmits } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: any
    formItems?: IFormItem[]
    labelWidth?: string
    itemStyle?: Object
  }>(),
  {
    labelWidth: '140px',
    itemStyle: () => ({ padding: '10px 40px' }),
    formItems: () => []
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: any): void
  (e: 'change', value: any, field: string): void
}>()

const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
  emit('change', value, field)
}
</script>

<style scoped></style>
