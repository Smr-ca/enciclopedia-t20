document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lista-pericias');

    // Função Mágica para construir descrições com links
    function construirDescricao(partes, elementoPai) {
        partes.forEach(parte => {
            let elemento;
            switch (parte.tipo) {
                case 'texto':
                    elemento = document.createTextNode(parte.conteudo);
                    break;
                case 'link_condicao':
                    elemento = document.createElement('a');
                    elemento.textContent = parte.texto;
                    elemento.href = `condicoes.html#${parte.id}`;
                    break;
                // Adicione mais 'case' aqui para outros tipos de link (poderes, etc.)
                // case 'link_poder': ...
                default:
                    elemento = document.createTextNode('');
            }
            elementoPai.appendChild(elemento);
        });
    }

    fetch('pericias.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(pericia => {
                const card = document.createElement('div');
                card.className = 'pericia-card';
                card.id = pericia.id;

                const nome = document.createElement('h2');
                nome.textContent = pericia.nome;

                const info = document.createElement('p');
                info.innerHTML = `<strong>Atributo:</strong> ${pericia.atributo} | <strong>Só Treinada:</strong> ${pericia.so_treinada ? 'Sim' : 'Não'}`;
                
                const descGeral = document.createElement('p');
                descGeral.textContent = pericia.descricao_geral;

                card.appendChild(nome);
                card.appendChild(info);
                card.appendChild(descGeral);

                // Processa os usos da perícia
                pericia.usos.forEach(uso => {
                    const usoTitulo = document.createElement('h3');
                    usoTitulo.textContent = uso.titulo;
                    
                    const usoDescricao = document.createElement('p');
                    construirDescricao(uso.descricao_partes, usoDescricao); // Usando a função mágica!

                    card.appendChild(usoTitulo);
                    card.appendChild(usoDescricao);
                });

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar perícias:', error));
});