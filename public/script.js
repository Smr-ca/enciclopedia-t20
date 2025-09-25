async function fetchAndDisplayClasses() {
    try {
        const response = await fetch('/api/classes');
        const classes = await response.json();

        const classesList = document.getElementById('classes-list');
        classes.forEach(classe => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `classe.html?id=${classe.ID_Classe}`;
            link.textContent = classe.Nome;
            listItem.appendChild(link);
            classesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar as classes:', error);
    }
}

async function fetchAndDisplayRaces() {
    try {
        const response = await fetch('/api/racas');
        const racas = await response.json();

        const racasList = document.getElementById('racas-list');
        racas.forEach(raca => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `raca.html?id=${raca.ID_Raca}`;
            link.textContent = raca.Nome;
            listItem.appendChild(link);
            racasList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar as raças:', error);
    }
}

fetchAndDisplayClasses();
fetchAndDisplayRaces();