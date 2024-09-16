import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-tabs': 'error',
    'no-console': 'off',
    'func-style': ['off', 'declaration'],
  },
})
