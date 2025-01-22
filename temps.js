// Obtenir el formulari, la llista d'activitats i les estadístiques
const tempsForm = document.getElementById('tempsForm');
const llistaActivitats = document.getElementById('llistaActivitats');
const graficsPercentatge = document.getElementById('graficsPercentatge');

// Obtenir les dades emmagatzemades del Local Storage
let activitats = JSON.parse(localStorage.getItem('activitats')) || [];

// Funció per mostrar les activitats
function mostrarActivitats() {
    llistaActivitats.innerHTML = ''; // Netejar la llista abans de mostrar
    activitats.forEach((activitat, index) => {
        const activitatElement = document.createElement('li');
        activitatElement.innerHTML = `
            <h3>${activitat.categoria} (${activitat.data})</h3>
            <p><strong>Hores:</strong> ${activitat.horaInici} - ${activitat.horaFi}</p>
            ${activitat.descripcio ? `<p><strong>Descripció:</strong> ${activitat.descripcio}</p>` : ''}
        `;
        llistaActivitats.appendChild(activitatElement);
    });
    mostrarEstadistiques();
}

// Funció per calcular i mostrar les estadístiques
function mostrarEstadistiques() {
    const categories = {
        estudis: 0,
        oci: 0,
        esport: 0,
        altres: 0,
    };

    // Calcular el temps dedicat a cada categoria
    activitats.forEach(activitat => {
        const horaInici = activitat.horaInici.split(':').map(Number);
        const horaFi = activitat.horaFi.split(':').map(Number);
        const minutsInici = horaInici[0] * 60 + horaInici[1];
        const minutsFi = horaFi[0] * 60 + horaFi[1];
        const duracio = minutsFi - minutsInici;

        categories[activitat.categoria] += duracio;
    });

    const totalTemps = Object.values(categories).reduce((a, b) => a + b, 0);

    // Mostrar percentatges
    graficsPercentatge.innerHTML = '';
    Object.keys(categories).forEach(categoria => {
        const percentatge = (categories[categoria] / totalTemps) * 100 || 0;
        const percentatgeElement = document.createElement('div');
        percentatgeElement.classList.add('percentatge');
        percentatgeElement.innerHTML = `
            <h3>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h3>
            <p>${percentatge.toFixed(2)}%</p>
        `;
        graficsPercentatge.appendChild(percentatgeElement);
    });
}

// Gestionar l'enviament del formulari
tempsForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar l'enviament del formulari per defecte

    // Obtenir valors dels camps
    const data = document.getElementById('data').value;
    const categoria = document.getElementById('categoria').value;
    const horaInici = document.getElementById('hora_inici').value;
    const horaFi = document.getElementById('hora_fi').value;
    const descripcio = document.getElementById('descripcio').value;

    // Afegir nova activitat
    activitats.push({
        data,
        categoria,
        horaInici,
        horaFi,
        descripcio,
    });

    // Actualitzar el Local Storage
    localStorage.setItem('activitats', JSON.stringify(activitats));

    // Netejar el formulari
    tempsForm.reset();

    // Mostrar activitats i estadístiques actualitzades
    mostrarActivitats();
});

// Mostrar activitats i estadístiques en carregar la pàgina
mostrarActivitats();
