<template>
  <select 
    :value="modelValue" 
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option value="+">Somar (+)</option>
    <option value="-">Subtrair (-)</option>
    <option value="*">Multiplicar (*)</option>
    <option value="/">Dividir (/)</option>
  </select>
</template>

<script>
export default {
  props: { modelValue: String }
};
</script>
