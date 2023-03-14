type IFormType = 'input' | 'password' | 'select' | 'datepicker' | 'input-number'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  // 默认值
  defaultValue?: any
  // 是否显示此表单项
  show?: {
    field: string
    rule: (val: any) => boolean
  }
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
