/* document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('buscar-cep').addEventListener('click', function () {
        const xhttp = new XMLHttpRequest();
        const cep = document.getElementById('cep').value;
        xhttp.open("GET", "https://viacep.com.br/ws/" + cep + "/json/", true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const response = JSON.parse(this.responseText);
                if (!response.erro) {
                    document.getElementById('endereco').value = response.logradouro;
                    document.getElementById('numero').focus();
                } else {
                    alert("CEP não encontrado.");
                }
            }
        };
    });
}); */

$(document).ready(function () {
    $('#cep').mask('00000-000');

    $('#buscar-cep').click(function () {
        const cep = $('#cep').val();
        const endpoint = "https://viacep.com.br/ws/" + cep + "/json";
        const button = $(this);
        $(button).find('i').addClass('d-none');
        $(button).find('span').removeClass('d-none');


        // $.ajax(endpoint).done(function (resposta) {
        //     const logradouro = resposta.logradouro;
        //     const bairro = resposta.bairro;
        //     const cidade = resposta.localidade;
        //     const estado = resposta.uf;
        //     const enderecoCompleto = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
        //     $('#endereco').val(enderecoCompleto);

        //     setTimeout(function () {
        //         $(button).find('i').removeClass('d-none');
        //         $(button).find('span').addClass('d-none');
        //     }, 3000);
        // });

        fetch(endpoint).then(function (resposta) {
            return resposta.json();
        })
        .then(function (json) {
            const logradouro = json.logradouro;
            const bairro = json.bairro;
            const cidade = json.localidade;
            const estado = json.uf;
            const enderecoCompleto = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
            $('#endereco').val(enderecoCompleto);

            setTimeout(function () {
                $(button).find('i').removeClass('d-none');
                $(button).find('span').addClass('d-none');
            }, 3000);
        })
        .catch(function (erro) {
            alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
        })
        .finally(function () {
            setInterval(function () {
                $(button).find('i').removeClass('d-none');
                $(button).find('span').addClass('d-none');
            }, 1000);
        });
    })

    $('#form-frete').submit(function (evento) {
        evento.preventDefault();

        if ($('#nome').val().length == 0) {
            throw new Error('O campo nome é obrigatório');
            alert('O campo nome é obrigatório');
        }
    })
});

                
