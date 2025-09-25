document.addEventListener('DOMContentLoaded', async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const racaId = params.get('id');

        if (!racaId) {
            document.getElementById('raca-nome').textContent = 'ID de raça não fornecido.';
            return;
        }

        const [racasResponse, habilidadesRaciaisResponse] = await Promise.all([
            fetch('/racas.json'),
            fetch('/habilidaderacial.json')
        ]);

        if (!racasResponse.ok) throw new Error('Erro 404 - racas.json não encontrado');
        if (!habilidadesRaciaisResponse.ok) throw new Error('Erro 404 - habilidaderacial.json não encontrado');

        const racas = await racasResponse.json();
        const habilidadesRaciais = await habilidadesRaciaisResponse.json();

        const raca = racas.find(r => r.ID_Raca === racaId);

        if (raca) {
            document.title = raca.Nome; // Atualiza o título da aba do navegador
            document.getElementById('raca-nome').textContent = raca.Nome;
            document.getElementById('raca-descricao').textContent = raca.Descricao;
            document.getElementById('raca-bonus-atributos').textContent = raca.Bonus_Atributos;

            const habilidadesList = document.getElementById('raca-habilidades-list');
            habilidadesList.innerHTML = ''; // Limpa a lista

            // Para cada ID de habilidade na raça, encontre a habilidade completa
            raca.Habilidades_Raciais.forEach(id => {
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
        document.getElementById('raca-nome').textContent = 'Erro ao carregar. Verifique o console (F12).';
    }
});