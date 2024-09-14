module.exports = {
  processors: ['stylelint-processor-html'],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  ignoreFiles: ['src/styles/variables.scss', 'src/modules/promotions/components/PromotionPreview/PromotionPreview.vue', 'src/styles/_core/normalize.scss'],
  rules: {
    'no-empty-source': null,
    'selector-class-pattern': null,
    "custom-property-pattern": null,
    'no-descending-specificity': null,
    'property-no-vendor-prefix': null,
    'color-function-notation': null,
    'scss/at-extend-no-missing-placeholder': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'scss/no-global-function-names': null,
    'value-no-vendor-prefix': null,
  },
};
