<template>
  <div class="panel-roof">
    <Form
      v-bind="formConfig"
      v-model="formData"
      @change="handleFormChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Form from './src/form.vue'

const formConfig = {
  labelWidth: '140px',
  formItems: [
    {
      field: 'length',
      type: 'input-number',
      label: '长',
      defaultValue: 2,
      otherOptions: {
        min: 0,
        precision: 3
      }
    },
    {
      field: 'width',
      type: 'input-number',
      label: '宽',
      defaultValue: 2,
      otherOptions: {
        min: 0,
        precision: 3
      }
    },
    {
      field: 'type',
      type: 'select',
      label: '类型',
      options: [
        {label: '类型1', code: '0'},
        {label: '类型2', code: '1'}
      ],
      defaultValue: '0'
    },
    {
      field: 'type2',
      type: 'input-number',
      label: '次级类型',
      defaultValue: 0,
      otherOptions: {
        min: 0
      },
      // 显示规则
      show: { field: 'type', rule: (values: any[]) => values[0] === '0' }
    }
  ]
}
const formItems = formConfig.formItems
const formOriginData: any = {}

for (const item of formItems) {
  formOriginData[item.field] = item.defaultValue
}
const formData = ref(formOriginData)

const handleFormChange = (value: any, field: string) => {
  console.log(field, value)
}
</script>

<style scoped></style>
