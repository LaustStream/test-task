<template>
  <div
    class="ui-input"
    :class="{ focused: isFocused, disabled: disabled, empty: isEmpty, loading }"
    @click.prevent="focusInput()"
  >
    <label class="ui-input__label">
      <UiTypography class="ui-input__label-text" is="span" :level="labelTextLevel" weight="500">
        {{ label }}
      </UiTypography>
      <div v-if="!loading" class="ui-input__field-row">
        <UiTypography v-if="prefix" class="ui-input__prefix" level="h4" weight="500">{{ prefix }}</UiTypography>
        <input
          v-model="valueProxy"
          class="ui-input__field"
          ref="inputRef"
          type="text"
          :placeholder="placeholder"
          :disabled="disabled"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @change="$emit('change')"
          @input="$emit('input')"
        />
      </div>
      <UiLoading v-else class="ui-input__loader" />
    </label>
  </div>
</template>
<script lang="ts" setup>
  import { InputType } from '@/types/ui'

  const inputRef = ref()
  const isFocused = ref(false)

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<InputType>,
      default: 'TEXT'
    },
    amountAccuracy: {
      type: Number
    },
    prefix: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    loading: {
      type: Boolean,
      default: undefined
    },
    disabled: {
      type: Boolean
    }
  })

  const emits = defineEmits(['update:modelValue', 'change', 'input', 'update:passwordVisible'])

  const valueProxy = computed({
    get() {
      if (props.type === InputType.AMOUNT) {
        const formattedValue = formatAmount(props.modelValue, props.amountAccuracy)
        if (inputRef.value?.value) inputRef.value.value = formattedValue
        return formattedValue
      }

      return props.modelValue
    },
    set(val) {
      if (props.type === InputType.AMOUNT) {
        const formattedValue = formatAmount(val, props.amountAccuracy)
        if (inputRef.value?.value) inputRef.value.value = formattedValue
        emits('update:modelValue', formattedValue)
        return
      }
      emits('update:modelValue', val)
    }
  })

  const isEmpty = computed(() => !props.modelValue.length)

  const labelTextLevel = computed(() => {
    return isEmpty.value && !isFocused.value ? 'h4' : 'b3'
  })

  const focusInput = () => {
    inputRef.value?.focus()
  }
</script>
<style lang="scss" scoped>
  .ui-input {
    position: relative;
    height: 80px;
    background: $color-surface-gray;
    padding: $padding-4xl $padding-lg 0;
    overflow: hidden;
    &:before {
      @include ui-active-before;
    }
    &:hover:not(.disabled):not(.loading) {
      background: $color-surface-secondary-hover;
    }
    &.focused {
      background: $color-surface-secondary-hover;
      &:before {
        display: block;
      }
    }
    &.empty:not(.focused) {
      .ui-input__label-text {
        top: 26px;
      }
    }
    &.empty.focused {
      .ui-input__field {
        &::placeholder {
          opacity: 1;
        }
      }
    }
    &__label {
      /* position: relative; */
      width: 100%;
    }
    &__label-text {
      top: 15px;
      position: absolute;
    }
    &__field {
      width: 100%;
      height: 28px;
      background: none;
      border: none;
      caret-color: $color-blue;
      font-weight: 500;
      @include text-heading-3;
      &::placeholder {
        color: $color-text-tertiary;
        opacity: 0;
      }
    }
    &__field-row {
      display: flex;
      align-items: center;
    }
    &__loader {
      width: 131px;
      height: 28px;
    }
  }
</style>
