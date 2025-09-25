document.addEventListener('DOMContentLoaded', () => {
    const listaOrigensContainer = document.getElementById('lista-origens');

    // Carrega os dois arquivos JSON ao mesmo tempo
    Promise.all([
        fetch('origem.json').then(res => res.json()),
        fetch('poderes.json').then(res => res.json())
    ])
    .then(([origens, poderes]) => {
        // Cria um mapa para encontrar poderes por ID rapidamente
        const poderesMap = new Map(poderes.map(p => [p.id, p]));

        origens.forEach(origem => {
            const origemCard = document.createElement('div');
            origemCard.className = 'origem-card';

            const nome = document.createElement('h2');
            nome.textContent = origem.Nome;

            const descricao = document.createElement('p');
            descricao.textContent = origem.Descricao;

            const pericias = document.createElement('p');
            pericias.innerHTML = `<strong>Perícias:</strong> ${origem.Pericia_Adicional || 'Nenhuma'}`;

            const poderesContainer = document.createElement('p');
            poderesContainer.innerHTML = '<strong>Poderes:</strong> ';
            
            // Aqui está a mágica do link
            if (origem.poderes_id && origem.poderes_id.length > 0) {
                origem.poderes_id.forEach((poderId, index) => {
                    const poder = poderesMap.get(poderId);
                    if (poder) {
                        const linkPoder = document.createElement('a');
                        linkPoder.href = `poderes.html#${poder.id}`;
                        linkPoder.textContent = poder.nome;
                        poderesContainer.appendChild(linkPoder);

                        if (index < origem.poderes_id.length - 1) {
                            poderesContainer.append(', ');
                        }
                    }
                });
            } else {
                poderesContainer.append('Nenhum');
            }

            origemCard.appendChild(nome);
            origemCard.appendChild(descricao);
            origemCard.appendChild(pericias);
            origemCard.appendChild(poderesContainer);
            listaOrigensContainer.appendChild(origemCard);
        });
    })
    .catch(error => console.error('Erro ao carregar Origens ou Poderes:', error));
});