// classe-detalhes.js (CORRIGIDO)
async function fetchAndDisplayClasse() {
    try {
        const params = new URLSearchParams(window.location.search);
        const classeId = params.get('id');

        if (!classeId) {
            document.getElementById('classe-nome').textContent = 'ID de classe não fornecido.';
            return;
        }

        // CORREÇÃO AQUI: Apontando para os arquivos JSON corretos
        const [classesResponse, habilidadesResponse, ligacaoResponse] = await Promise.all([
            fetch('/classes.json'), // <--- CORRIGIDO
            fetch('/habilidadedeclasse.json'), // <--- CORRIGIDO
            fetch('/classehabilidade.json') // <--- CORRIGIDO
        ]);

        const classes = await classesResponse.json();
        const habilidades = await habilidadesResponse.json();
        const ligacoes = await ligacaoResponse.json();

        const classe = classes.find(c => c.ID_Classe === classeId);

        if (classe) {
            document.getElementById('classe-nome').textContent = classe.Nome;
            // Assumindo que você tem elementos com esses IDs no seu HTML
            // document.getElementById('classe-descricao').textContent = classe.Descricao;
            // ... (preencha os outros campos como PV, PM, etc.)

            const habilidadesDaClasse = ligacoes
                .filter(ligacao => ligacao.ID_Classe === classeId)
                .map(ligacao => {
                    const habilidade = habilidades.find(h => h.ID_Habilidade === ligacao.ID_Habilidade);
                    return { ...habilidade, Nivel_Adquirido: ligacao.Nivel_Adquirido };
                });

            const habilidadesLista = document.getElementById('habilidades-lista');
            habilidadesLista.innerHTML = ''; // Limpa a lista antes de adicionar
            habilidadesDaClasse.forEach(habilidade => {
                const habilidadeDiv = document.createElement('div');
                habilidadeDiv.innerHTML = `
                    <h3>${habilidade.Nome} (Nível ${habilidade.Nivel_Adquirido})</h3>
                    <p>${habilidade.Descricao}</p>
                `;
                habilidadesLista.appendChild(habilidadeDiv);
            });

        } else {
            document.getElementById('classe-nome').textContent = 'Classe não encontrada.';
        }

    } catch (error) {
        console.error('Erro ao buscar os detalhes da classe:', error);
    }
}

fetchAndDisplayClasse();