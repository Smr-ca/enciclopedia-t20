document.addEventListener('DOMContentLoaded', () => {
    const listaClasses = document.getElementById('lista-classes');

    fetch('/classes.json')
        .then(response => {
            if (!response.ok) throw new Error('Erro 404 - Arquivo classes.json não encontrado');
            return response.json();
        })
        .then(data => {
            data.forEach(classe => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                
                link.href = `/classe-detalhes.html?id=${classe.ID_Classe}`;
                link.textContent = classe.Nome;
                
                listItem.appendChild(link);
                listaClasses.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar lista de classes:', error);
            listaClasses.textContent = 'Não foi possível carregar a lista de classes. Verifique o console (F12).';
        });
});