$(document).ready(function () {
    // === MÁSCARAS ===
    $('#cep').mask('00000-000');
    $('#telefone').mask('(00) 00000-0000');

    // === FUNÇÃO DE MENSAGEM ===
    function exibirMensagem(texto, tipo = 'info') {
        const alerta = $(`
            <div class="alert alert-${tipo} mt-3" role="alert">
                ${texto}
            </div>
        `);
        $('.alert').remove(); 
        $('#form-frete').append(alerta);
        setTimeout(() => alerta.fadeOut(400, () => alerta.remove()), 4000);
    }

    // === BUSCAR ENDEREÇO PELO CEP ===
    $('#buscar-cep').click(function () {
        const cep = $('#cep').val().replace('-', '').trim();
        const button = $(this);

        if (cep.length !== 8) {
            exibirMensagem('Digite um CEP válido.', 'warning');
            return;
        }

        const endpoint = `https://viacep.com.br/ws/${cep}/json/`;

        // Feedback de carregamento
        button.prop('disabled', true);
        button.find('i').addClass('d-none');
        button.find('span').removeClass('d-none');

        fetch(endpoint)
            .then(res => res.json())
            .then(json => {
                if (json.erro) {
                    exibirMensagem('CEP não encontrado.', 'danger');
                    $('#endereco').val('');
                    return;
                }

                const enderecoCompleto = `${json.logradouro}, ${json.bairro} - ${json.localidade} / ${json.uf}`;
                $('#endereco').val(enderecoCompleto);
                exibirMensagem('Endereço encontrado com sucesso!', 'success');
            })
            .catch(() => {
                exibirMensagem('Erro ao buscar o CEP. Tente novamente mais tarde.', 'danger');
            })
            .finally(() => {
                
                setTimeout(() => {
                    button.prop('disabled', false);
                    button.find('i').removeClass('d-none');
                    button.find('span').addClass('d-none');
                }, 1000);
            });
    });

    // === VALIDAÇÃO DO FORMULÁRIO ===
    $('#form-frete').submit(function (evento) {
        evento.preventDefault();

        const nome = $('#nome').val().trim();
        const sobrenome = $('#sobrenome').val().trim();
        const email = $('#email').val().trim();
        const cep = $('#cep').val().trim();
        const endereco = $('#endereco').val().trim();
        const numero = $('#numero').val().trim();

        if (!nome || !sobrenome || !email || !cep || !endereco || !numero) {
            exibirMensagem('Preencha todos os campos obrigatórios.', 'warning');
            return;
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            exibirMensagem('Digite um e-mail válido.', 'warning');
            return;
        }

        // Se tudo estiver certo
        exibirMensagem('Dados enviados com sucesso! (Simulação)', 'success');

    });
});
