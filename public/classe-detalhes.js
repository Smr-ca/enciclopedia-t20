async function fetchAndDisplayClasse() {
    try {
        const params = new URLSearchParams(window.location.search);
        const classeId = params.get('id');

        if (!classeId) {
            document.getElementById('classe-nome').textContent = 'ID de classe não fornecido.';
            return;
        }

        const [classesResponse, habilidadesResponse, ligacaoResponse] = await Promise.all([
            fetch('/api/classes'),
            fetch('/api/habilidades_de_classe'),
            fetch('/api/classes_habilidades')
        ]);

        const classes = await classesResponse.json();
        const habilidades = await habilidadesResponse.json();
        const ligacoes = await ligacaoResponse.json();

        const classe = classes.find(c => c.ID_Classe === classeId);

        if (classe) {
            document.getElementById('classe-nome').textContent = classe.Nome;
            document.getElementById('classe-descricao').textContent = classe.Descricao;
            document.getElementById('classe-pv-inicial').textContent = classe.PV_Inicial;
            document.getElementById('classe-pv-por-nivel').textContent = classe.PV_por_Nivel;
            document.getElementById('classe-pm-inicial').textContent = classe.PM_Inicial;
            document.getElementById('classe-pm-por-nivel').textContent = classe.PM_por_Nivel;

            const habilidadesDaClasse = ligacoes
                .filter(ligacao => ligacao.ID_Classe === classeId)
                .map(ligacao => {
                    const habilidade = habilidades.find(h => h.ID_Habilidade === ligacao.ID_Habilidade);
                    return { ...habilidade, Nivel_Adquirido: ligacao.Nivel_Adquirido };
                });

            const habilidadesLista = document.getElementById('habilidades-lista');
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