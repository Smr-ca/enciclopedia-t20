document.addEventListener('DOMContentLoaded', () => {
    const listaRacas = document.getElementById('lista-racas');

    fetch('/racas.json')
        .then(response => {
            if (!response.ok) throw new Error('Erro 404 - Arquivo racas.json não encontrado');
            return response.json();
        })
        .then(data => {
            data.forEach(raca => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                
                // Criando o link para a página de detalhes com o ID correto
                link.href = `/raca-detalhes.html?id=${raca.ID_Raca}`;
                link.textContent = raca.Nome;
                
                listItem.appendChild(link);
                listaRacas.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar lista de raças:', error);
            listaRacas.textContent = 'Não foi possível carregar a lista de raças. Verifique o console (F12) para mais detalhes.';
        });
});