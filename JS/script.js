let player = document.getElementById("PandaRoux");

// Démarre l'animation en boucle lors du survol
player.addEventListener("mouseenter", () => {
    player.play();
});

// Arrête l'animation lorsque la souris quitte l'élément
player.addEventListener("mouseleave", () => {
    player.pause();
});


// L'URL de ton fichier SVG
const url = '../IMAGES/PandaIdea.svg';

// Utilise fetch pour charger le fichier SVG
fetch(url)
    .then(response => response.text())
    .then(svgContent => {
        // Crée un élément temporaire pour parser le contenu SVG
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgContent;

        // Récupère l'élément SVG du contenu parsé
        const svgElement = tempDiv.querySelector('svg');

        if (svgElement) {
            // Ajoute l'élément SVG au DOM, dans un élément avec l'ID 'svgContainer' par exemple
            document.getElementById('svgContainer').appendChild(svgElement);

            // Maintenant, crée un objet SVG.js pour l'élément ajouté
            const drawing = SVG(svgElement);

            // Sélectionne les éléments à l'intérieur de l'objet SVG
            const panda = drawing.findOne('#panda');
            const idea = drawing.findOne('#idea');

            // Cache la bulle de pensée par défaut
            idea.hide();

            // Ajoute des gestionnaires d'événements pour montrer/cacher la bulle
            panda.on('mouseover', () => idea.show());
            panda.on('mouseout', () => idea.hide());
        }
    })
    .catch(error => console.error('Error loading SVG:', error));




// pie chart

var data = [{
    values: [63, 58, 23, 28, 21, 33, 36, 27],
    labels: ['Action', 'Adventure', 'Comedy', 'Drama', 'Family', 'Thriller', 'Sci-Fi', 'Fantasy'],
    marker: {
        colors: ['EC331B', '#A64900', '#FF7043', '#D86A34', '#FFA566', '#E64C00', '#FF5C33', '#CC5200']
    },
    type: 'pie',


}];


var layout = {
    plot_bgcolor: 'rgba(255, 255, 255, 0)',
    paper_bgcolor: 'rgba(255, 255, 255, 0)',
    font: {
        color: 'white'
    }
};


Plotly.newPlot('pieChart', data, layout);

window.onresize = function() {
    Plotly.relayout('pieChart', {
        'xaxis.autorange': true,
        'yaxis.autorange': true
    });
};



var trace1 = {
    x: ['Action', 'Adventure', 'Thriller', 'Drama', 'Comedy'],
    y: [132.2, 131.5, 131.0, 134.2, 105.0],
    name: 'Moyenne des genres',
    marker: {
        color: ['EC331B', '#A64900', '#FF7043', '#D86A34', '#FFA566']
    },
    type: 'bar'
};

var trace2 = {
    x: ['Moyenne Générale'],
    y: [128.6],
    name: 'Moyenne Générale',
    marker: {
        color: '#860000'
    },
    type: 'bar'
};

var data2 = [trace1, trace2].map(trace => ({ ...trace, y: new Array(trace.y.length).fill(0) }));

var updatemenus = [{
    type: 'buttons',
    showactive: false,
    buttons: [{
        label: 'Jouer',
        method: 'animate',
        args: [null, {
            frame: {duration: 500},
            transition: {duration: 300}
        }],

    }]
}];

var frames = [];
var yValues1 = [132.2, 131.5, 131.0, 134.2, 105.0]; // Valeurs réelles pour la moyenne des genres
var yValues2 = [128.6];

for (var i = 0; i < yValues1.length; i++) {
    var frameData = [{
        x: trace1.x.slice(0, i+1), // Inclure toutes les catégories jusqu'à l'indice actuel
        y: yValues1.slice(0, i+1), // Inclure toutes les valeurs y jusqu'à l'indice actuel
    }];

    if (i === 0) { // Ajouter la moyenne générale uniquement pour la première catégorie (Action)
        frameData.push({
            x: trace2.x,
            y: yValues2,
        });
    }

    frames.push({
        name: i.toString(),
        data: frameData,
    });
}

var layout2 = {
    barmode: 'group',
    title: {
        text: 'Durée moyenne des films par genre',
        font: {
            color: 'white'
        }
    },
    xaxis: {
        title: {
            text: 'Genres',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    legend: {
        font: {
            color: 'white'
        }
    },
    yaxis: {
        // Définir le range de l'axe y pour couvrir les valeurs de tes données, avec un peu de marge
        range: [0, Math.max(...yValues1, ...yValues2) + 10],
        title: {
            text: 'Durée moyenne (minutes)',
            font: {
                color: 'white'
            }
        },
        tickfont: {
            color: 'white'
        }
    },
    updatemenus: updatemenus,
    plot_bgcolor: 'rgba(255, 255, 255, 0)', // Fond transparent
    paper_bgcolor: 'rgba(255, 255, 255, 0)', // Fond du "papier" transparent
    annotations: [], // Retirer l'annotation initiale qui n'est plus nécessaire

};


Plotly.newPlot('barGraph', data2, layout2).then(function() {
    Plotly.addFrames('barGraph', frames);
});


document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    function onScroll() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("current");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("current");
            }
        });
    }

    window.addEventListener("scroll", onScroll);
});
