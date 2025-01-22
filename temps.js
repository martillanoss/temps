// Obtenir el formulari i la llista
const tempsForm = document.getElementById('tempsForm');
const llistaActivitats = document.getElementById('llistaActivitats');

// Gestionar l'enviament del formulari
tempsForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitar l'enviament del formulari per defecte

    // Obtenir valors dels camps
    const data = document.getElementById('data').value;
    const categoria = document.getElementById('categoria').value;
    const horaInici = document.getElementById('hora_inici').value;
    const horaFi = document.getElementById('hora_fi').value;
    const descripcio = document.getElementById('descripcio').value;

    // Crear un nou element de llista
    const activitat = document.createElement('li');

    // Afegir la informació de l'activitat
    activitat.innerHTML = `
        <h3>${categoria} (${data})</h3>
        <p><strong>Hores:</strong> ${horaInici} - ${horaFi}</p>
        ${descripcio ? `<p><strong>Descripció:</strong> ${descripcio}</p>` : ''}
    `;

    // Afegir l'activitat a la llista
    llistaActivitats.appendChild(activitat);

    // Netejar el formulari
    tempsForm.reset();
});
