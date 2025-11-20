<template>
  <div class="calc-container">
    <h1 class="titulo">Calculadora</h1>

    <div class="inputs">
      <NumberInput v-model="num1" />
      <NumberInput v-model="num2" />
      <OperationSelect v-model="operacao" />
    </div>

    <ResultDisplay :value="resultado" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import NumberInput from "./components/NumberInput.vue";
import OperationSelect from "./components/OperationSelect.vue";
import ResultDisplay from "./components/ResultDisplay.vue";

const num1 = ref(0);
const num2 = ref(0);
const operacao = ref("+");

const resultado = computed(() => {
  switch (operacao.value) {
    case "+": return num1.value + num2.value;
    case "-": return num1.value - num2.value;
    case "*": return num1.value * num2.value;
    case "/": return num2.value == 0 ? "Erro: divisão por zero" : num1.value / num2.value;
  }
});
</script>

<style>

.calc-container {
  width: 350px;
  margin: 40px auto;
  justify-items: center;
  background: #f2f2f2;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  font-family: "Segoe UI", sans-serif;
}

.titulo {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input,
select {
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #bcbcbc;
  font-size: 16px;
  width: 100%;
  background: #e6e6e6;
  transition: 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #0067c0;
  background: white;
  box-shadow: 0 0 0 3px rgba(0,103,192,0.2);
}

h2 {
  margin-top: 25px;
  text-align: center;
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 22px;
  color: #333;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
}
</style>
