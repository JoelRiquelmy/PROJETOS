<template>
  <h2>Resultado: {{ value }}</h2>
</template>

<script>
export default {
  props: { value: [String, Number] }
};
</script>
