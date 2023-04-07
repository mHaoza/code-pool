<template>
  <div class="form">
    <el-form
      :label-width="labelWidth"
      v-bind="formOtherOptions"
      ref="formRef"
      :model="modelValue"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-if="formItemShow(item)">
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
import { ElForm, type FormValidateCallback } from 'element-plus'
import { defineProps, withDefaults, defineEmits, defineExpose, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: any
    formItems?: IFormItem[]
    labelWidth?: string
    formOtherOptions?: Object
    itemStyle?: Object
  }>(),
  {
    labelWidth: '140px',
    formOtherOptions: () => ({}),
    itemStyle: () => ({ padding: '10px 40px' }),
    formItems: () => []
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: any): void
  (e: 'change', value: any, field: string): void
}>()

const formRef = ref<InstanceType<typeof ElForm>>()

const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
  emit('change', value, field)
}

// 判断是否显示该表单项
const formItemShow = (formItem: IFormItem) => {
  // 如果没有设置show参数，默认显示
  if (!formItem.show) return true

  // 取得需要校验的值
  const values = formItem.show?.field
    .split(',')
    .map((field) => props.modelValue[field])

  // 传值校验并返回结果
  return formItem.show?.rule(values) ?? true
}

/**
 * 校验表单的所有字段
 * @param callback 回调函数
 * @returns 返回结果的promise对象
 */
const validate = (callback?: FormValidateCallback) => {
  return formRef.value?.validate(callback)
}

// 导出部分方法/参数
defineExpose({ validate })
</script>

<style scoped></style>
