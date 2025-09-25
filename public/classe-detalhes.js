document.addEventListener('DOMContentLoaded', async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const classeId = params.get('id');

        if (!classeId) {
            document.getElementById('classe-nome').textContent = 'ID de classe não fornecido.';
            return;
        }

        const [classesRes, habilidadesRes, ligacaoRes] = await Promise.all([
            fetch('/classes.json'),
            fetch('/habilidadesdeclasse.json'),
            fetch('/classehabilidade.json')
        ]);

        if (!classesRes.ok) throw new Error('classes.json não encontrado');
        if (!habilidadesRes.ok) throw new Error('habilidadesdeclasse.json não encontrado');
        if (!ligacaoRes.ok) throw new Error('classehabilidade.json não encontrado');

        const classes = await classesRes.json();
        const habilidades = await habilidadesRes.json();
        const ligacoes = await ligacaoRes.json();

        const classe = classes.find(c => c.ID_Classe === classeId);

        if (classe) {
            document.title = classe.Nome;
            document.getElementById('classe-nome').textContent = classe.Nome;
            document.getElementById('classe-descricao').textContent = classe.Descricao;
            document.getElementById('classe-pv-inicial').textContent = classe.PV_Inicial;
            document.getElementById('classe-pv-por-nivel').textContent = classe.PV_por_Nivel;
            document.getElementById('classe-pm-inicial').textContent = classe.PM_Inicial;
            document.getElementById('classe-pm-por-nivel').textContent = classe.PM_por_Nivel;

            const habilidadesContainer = document.getElementById('habilidades-lista');
            habilidadesContainer.innerHTML = '';

            const idsHabilidadesDaClasse = ligacoes.filter(l => l.ID_Classe === classeId);
            
            idsHabilidadesDaClasse.forEach(ligacao => {
                const habilidade = habilidades.find(h => h.ID_Habilidade === ligacao.ID_Habilidade);
                if (habilidade) {
                    const habilidadeDiv = document.createElement('div');
                    habilidadeDiv.innerHTML = `
                        <h3>${habilidade.Nome} (Nível ${ligacao.Nivel_Adquirido})</h3>
                        <p>${habilidade.Descricao}</p>
                    `;
                    habilidadesContainer.appendChild(habilidadeDiv);
                }
            });

        } else {
            document.getElementById('classe-nome').textContent = 'Classe não encontrada.';
        }

    } catch (error) {
        console.error('Erro ao buscar os detalhes da classe:', error);
        document.getElementById('classe-nome').textContent = 'Erro ao carregar. Verifique o console (F12).';
    }
});