module.exports = {
  processors: [
    [
      '@mapbox/stylelint-processor-arbitrary-tags', {
        fileFilterRegex: [/\.vue/],
      },
    ],
  ],
  extends: 'stylelint-config-standard',
  rules: {
    'at-rule-empty-line-before': 'never',
    'comment-empty-line-before': 'never',
    'no-empty-source': null,
    'number-leading-zero': null,
    'rule-empty-line-before': 'never-multi-line',
  },
};
