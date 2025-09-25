// Espera o conteúdo da página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Pega a div onde vamos inserir a lista
    const listaOrigensContainer = document.getElementById('lista-origens');

    // Busca os dados do arquivo JSON
    fetch('Origem.json')
        .then(response => {
            // Verifica se a requisição foi bem sucedida
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON.');
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            // Itera sobre cada origem no array de dados
            data.forEach(origem => {
                // Cria os elementos HTML para cada origem
                const origemCard = document.createElement('div');
                origemCard.classList.add('origem-card'); // Adiciona uma classe para estilização (opcional)

                const nome = document.createElement('h2');
                nome.textContent = origem.Nome;

                const descricao = document.createElement('p');
                descricao.textContent = origem.Descricao;

                const pericias = document.createElement('p');
                // Verifica se existem perícias antes de exibir o texto
                if (origem.Pericia_Adicional) {
                    pericias.innerHTML = `<strong>Perícias:</strong> ${origem.Pericia_Adicional.split(', ').join(', ')}`;
                } else {
                    pericias.innerHTML = `<strong>Perícias:</strong> Nenhuma`;
                }
                
                const poderes = document.createElement('p');
                poderes.innerHTML = `<strong>Poderes:</strong> ${origem.Poder_Adicional.split(', ').join(', ')}`;

                // Adiciona os elementos criados ao card da origem
                origemCard.appendChild(nome);
                origemCard.appendChild(descricao);
                origemCard.appendChild(pericias);
                origemCard.appendChild(poderes);

                // Adiciona o card completo ao container na página
                listaOrigensContainer.appendChild(origemCard);
            });
        })
        .catch(error => {
            console.error('Houve um problema com a operação de fetch:', error);
            listaOrigensContainer.textContent = 'Não foi possível carregar as origens.';
        });
});