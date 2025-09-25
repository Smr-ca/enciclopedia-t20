document.addEventListener('DOMContentLoaded', () => {
    const listaPoderesContainer = document.getElementById('lista-poderes');
    const botoesFiltro = document.querySelectorAll('.filtro-btn');
    let todosOsPoderes = []; // Array para guardar todos os poderes carregados

    // Função para renderizar os poderes na tela
    const renderizarPoderes = (poderesParaRenderizar) => {
        listaPoderesContainer.innerHTML = ''; // Limpa a lista atual
        poderesParaRenderizar.forEach(poder => {
            // Cria um <div> com ID para permitir links de âncora
            const poderCard = document.createElement('div');
            poderCard.className = 'poder-card';
            poderCard.id = poder.id; // IMPORTANTE PARA OS LINKS!

            const nome = document.createElement('h2');
            nome.textContent = poder.nome;

            const tipo = document.createElement('p');
            tipo.innerHTML = `<strong>Tipo:</strong> ${poder.tipo}`;
            
            const descricao = document.createElement('p');
            descricao.textContent = poder.descricao;

            const preRequisitos = document.createElement('p');
            if (poder.pre_requisitos && poder.pre_requisitos.length > 0) {
                const requisitosTexto = poder.pre_requisitos.map(req => req.valor).join(', ');
                preRequisitos.innerHTML = `<strong>Pré-requisitos:</strong> ${requisitosTexto}`;
            } else {
                preRequisitos.innerHTML = `<strong>Pré-requisitos:</strong> Nenhum`;
            }

            poderCard.appendChild(nome);
            poderCard.appendChild(tipo);
            poderCard.appendChild(descricao);
            poderCard.appendChild(preRequisitos);
            listaPoderesContainer.appendChild(poderCard);
        });
    };

    // Carrega o JSON de poderes
    fetch('poderes.json') // Assumindo que você juntou os poderes gerais e de origem em um só arquivo
        .then(response => response.json())
        .then(data => {
            todosOsPoderes = data;
            renderizarPoderes(todosOsPoderes); // Mostra todos os poderes inicialmente
        })
        .catch(error => console.error('Erro ao carregar poderes:', error));

    // Adiciona a lógica de clique aos botões de filtro
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            const tipoFiltro = botao.dataset.tipo;
            if (tipoFiltro === 'Todos') {
                renderizarPoderes(todosOsPoderes);
            } else {
                const poderesFiltrados = todosOsPoderes.filter(poder => poder.tipo === tipoFiltro);
                renderizarPoderes(poderesFiltrados);
            }
        });
    });
});