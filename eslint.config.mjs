import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-tabs': ['warn', {
      allowIndentationTabs: true,
    }], // 不允许使用tab缩进
    'no-multiple-empty-lines': ['error', { max: 1 }], // 允许最多一个空行
    'indent': ['warn', 2], // 缩进2个空格
    'no-console': 'off', // 允许使用console
    'func-style': ['off', 'declaration'], // 允许使用变量式函数声明
    'prefer-arrow-callback': 'error', // 允许使用箭头函数
    'no-var': 'warn',
    'quotes': ['error', 'single'], // 使用单引号
    'semi': ['error', 'never'], // 不使用分号
    'skipBlankLines': 0, // 允许空行上有尾随空格
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      closeBracket: 0,
    }],
    'n/prefer-global/process': ['error', 'always'], // 允许直接使用process全局变量
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    'antfu/top-level-function': 'off', // 允许使用变量式函数
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'indent': 'off',
  },
})
