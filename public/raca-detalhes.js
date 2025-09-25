// raca-detalhes.js (CORRIGIDO)
async function fetchAndDisplayRaca() {
    try {
        const params = new URLSearchParams(window.location.search);
        const racaId = params.get('id');

        if (!racaId) {
            document.getElementById('raca-nome').textContent = 'ID de raça não fornecido.';
            return;
        }

        // CORREÇÃO AQUI: Apontando para os arquivos JSON corretos
        const [racasResponse, habilidadesRaciaisResponse] = await Promise.all([
            fetch('/racas.json'), // <--- CORRIGIDO
            fetch('/habilidaderacial.json') // <--- CORRIGIDO
        ]);

        const racas = await racasResponse.json();
        const habilidadesRaciais = await habilidadesRaciaisResponse.json();

        const raca = racas.find(r => r.ID_Raca === racaId);

        if (raca) {
            document.getElementById('raca-nome').textContent = raca.Nome;
            // Assumindo que você tem elementos com esses IDs no seu HTML
            // document.getElementById('raca-descricao').textContent = raca.Descricao;
            // document.getElementById('raca-bonus-atributos').textContent = raca.Bonus_Atributos;

            const habilidadesList = document.getElementById('raca-habilidades-list');
            habilidadesList.innerHTML = ''; // Limpa a lista antes de adicionar
            const idsHabilidades = raca.Habilidades_Raciais.split(',');

            idsHabilidades.forEach(id => {
                const habilidade = habilidadesRaciais.find(h => h.ID_Habilidade_Racial === id.trim());
                if (habilidade) {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<strong>${habilidade.Nome}:</strong> ${habilidade.Descricao}`;
                    habilidadesList.appendChild(listItem);
                }
            });

        } else {
            document.getElementById('raca-nome').textContent = 'Raça não encontrada.';
        }

    } catch (error) {
        console.error('Erro ao buscar os detalhes da raça:', error);
    }
}

fetchAndDisplayRaca();