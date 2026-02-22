
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (slides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    
    setInterval(() => showSlide(currentSlide + 1), 5000);
}

const dataFormations = [
    { cat: 'prepa', niveau: 'Cycle Prépa', spec: 'Tronc Commun Numérique', comp: 'Algorithmique, Mathématiques, Web', mod: 'Initial' },
    { cat: 'prepa', niveau: 'Cycle Prépa', spec: 'International Track', comp: 'English, Physics, Computer Science', mod: 'Initial' },
    { cat: 'ingé', niveau: 'Cycle Ingénieur', spec: 'Cybersécurité', comp: 'Pentesting, Cryptographie, Réseaux', mod: 'Initial / Apprentissage' },
    { cat: 'ingé', niveau: 'Cycle Ingénieur', spec: 'Data & IA', comp: 'Machine Learning, Big Data, Python', mod: 'Initial / Apprentissage' },
    { cat: 'ingé', niveau: 'Cycle Ingénieur', spec: 'Software Engineering', comp: 'Architecture logicielle, DevOps, Fullstack', mod: 'Initial / Apprentissage' },
    { cat: 'ingé', niveau: 'Cycle Ingénieur', spec: 'Cloud & Réseaux', comp: 'Virtualisation, Azure/AWS, Admin Sys', mod: 'Initial / Apprentissage' },
    { cat: 'ingé', niveau: 'Cycle Ingénieur', spec: 'Bio-Informatique', comp: 'Analyse génomique, Santé connectée', mod: 'Initial' },
    { cat: 'ingé', niveau: 'Cycle Ingénieur', spec: 'Systèmes Embarqués', comp: 'C/C++, IoT, Robotique', mod: 'Initial / Apprentissage' }
];

function renderTable(filter = 'all', searchTerm = '') {
    const body = document.getElementById('tableBody');
    if (!body) return;
    
    body.innerHTML = '';
    
    let filtered = filter === 'all' ? dataFormations : dataFormations.filter(f => f.cat === filter);
    
    if (searchTerm) {
        filtered = filtered.filter(f => 
            f.spec.toLowerCase().includes(searchTerm.toLowerCase()) || 
            f.comp.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (filtered.length === 0) {
        body.innerHTML = `<tr><td colspan="4" style="text-align:center;">Aucune formation trouvée.</td></tr>`;
        return;
    }

    filtered.forEach(f => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${f.niveau}</td>
            <td style="font-weight: bold; color: var(--text-light);">${f.spec}</td>
            <td>${f.comp}</td>
            <td><span class="badge">${f.mod}</span></td>
        `;
        body.appendChild(row);
    });
}

window.filterTable = function(cat) {
    const searchInput = document.getElementById('formationSearch');
    const term = searchInput ? searchInput.value : '';
    
    renderTable(cat, term);
    
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
};

