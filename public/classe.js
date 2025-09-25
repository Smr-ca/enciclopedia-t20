document.addEventListener('DOMContentLoaded', () => {
    const listaClasses = document.getElementById('lista-classes');

    fetch('/classes.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(classe => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');

                // Criando o link correto para os detalhes da classe
                link.href = `/classe-detalhes.html?id=${classe.ID_Classe}`;
                link.textContent = classe.Nome;

                listItem.appendChild(link);
                listaClasses.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erro ao carregar lista de classes:', error));
});