import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    // 不允许使用tab缩进，vscode可以自行配置Tab键是使用\t还是空格填充
    'no-tabs': ['warn', {
      allowIndentationTabs: true,
    }],
    // 允许最多一个空行
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'indent': ['warn', 2],
    // 允许使用console
    'no-console': 'off',
    // 允许使用变量式函数声明
    'func-style': ['off', 'declaration'],
    // 允许使用箭头函数
    'prefer-arrow-callback': 'error',
    'no-var': 'warn',
    // 使用单引号
    'quotes': ['error', 'single'],
    // 不使用分号
    'semi': ['error', 'never'],
    // 允许空行上有尾随空格
    'skipBlankLines': 0,
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      closeBracket: 0,
    }],
    // 允许直接使用process全局变量
    'n/prefer-global/process': ['error', 'always'],
    // 设置一行最多一个属性
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    // 允许不使用function声明函数
    'antfu/top-level-function': 'off',
    // 允许在定义之前使用变量
    'no-use-before-define': 'off',
    // 允许在定义之前使用变量
    '@typescript-eslint/no-use-before-define': 'off',
    // 右大括号和左大括号必须在同一行
    'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'indent': 'off',
  },
})
