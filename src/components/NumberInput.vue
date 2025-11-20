<template>
  <input 
    type="number"
    :value="modelValue"
    @input="$emit('update:modelValue', Number($event.target.value))"
  />
</template>

<script>
export default {
  props: { modelValue: Number }
};
</script>
