document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lista-condicoes');

    // Reutilizando a mesma função para construir descrições
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
                case 'link_pericia':
                    elemento = document.createElement('a');
                    elemento.textContent = parte.texto;
                    elemento.href = `pericias.html#${parte.id}`;
                    break;
                case 'lista':
                    elemento = document.createElement('ul');
                    parte.itens.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        elemento.appendChild(li);
                    });
                    break;
                default:
                    elemento = document.createTextNode('');
            }
            elementoPai.appendChild(elemento);
        });
    }

    fetch('condicoes.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(condicao => {
                const card = document.createElement('div');
                card.className = 'condicao-card';
                card.id = condicao.id;

                const nome = document.createElement('h2');
                nome.textContent = condicao.nome;

                const descCompleta = document.createElement('p');
                construirDescricao(condicao.descricao_completa_partes, descCompleta);

                card.appendChild(nome);
                card.appendChild(descCompleta);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar condições:', error));
});