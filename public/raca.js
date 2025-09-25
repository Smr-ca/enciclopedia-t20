document.addEventListener('DOMContentLoaded', () => {
    const listaRacas = document.getElementById('lista-racas');

    fetch('/racas.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(raca => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');

                // A MÁGICA ACONTECE AQUI:
                // Cria o link para a página de detalhes, incluindo o ID na URL
                link.href = `/raca-detalhes.html?id=${raca.ID_Raca}`;
                link.textContent = raca.Nome;

                listItem.appendChild(link);
                listaRacas.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erro ao carregar lista de raças:', error));
});