// Datos para los subnodos de cada categoría
const nodeData = {
    economia: [
        { text: 'Emprendimientos', icon: 'fa-lightbulb' },
        { text: 'Mercados', icon: 'fa-chart-pie' },
        { text: 'Producción agrícola', icon: 'fa-tractor' },
        { text: 'Empleo', icon: 'fa-briefcase' },
        { text: 'Innovación', icon: 'fa-rocket' },
        { text: 'Comercio', icon: 'fa-shopping-cart' },
        { text: 'Inversión', icon: 'fa-coins' }
    ],
    identidad: [
        { text: 'Cultura', icon: 'fa-masks-theater' },
        { text: 'Tradiciones', icon: 'fa-tree' },
        { text: 'Valores', icon: 'fa-heart' },
        { text: 'Arte', icon: 'fa-palette' },
        { text: 'Participación comunitaria', icon: 'fa-hands-helping' },
        { text: 'Idioma', icon: 'fa-language' },
        { text: 'Costumbres', icon: 'fa-utensils' }
    ],
    nacionalismo: [
        { text: 'Unidad cultural', icon: 'fa-users' },
        { text: 'Soberanía', icon: 'fa-landmark' },
        { text: 'Orgullo nacional', icon: 'fa-flag-usa' },
        { text: 'Políticas internas', icon: 'fa-landmark' },
        { text: 'Protección económica', icon: 'fa-shield-alt' },
        { text: 'Historia', icon: 'fa-book' },
        { text: 'Símbolos patrios', icon: 'fa-flag' }
    ]
};

const subnodeDefinitions = {
    economia: {
        'Emprendimientos': 'Iniciativas para crear o mejorar negocios, generando valor, empleo y soluciones a necesidades del mercado.',
        'Mercados': 'Espacios (físicos o digitales) donde se encuentran oferta y demanda para intercambiar bienes y servicios.',
        'Producción agrícola': 'Actividades dedicadas al cultivo y la obtención de productos del campo que abastecen la alimentación y la industria.',
        'Empleo': 'Relación laboral mediante la cual una persona aporta trabajo a cambio de un ingreso, derechos y obligaciones.',
        'Innovación': 'Introducción de mejoras o nuevas ideas en productos, procesos o servicios para aumentar eficiencia y competitividad.',
        'Comercio': 'Compra y venta de bienes y servicios, tanto a nivel local como internacional, facilitando el intercambio económico.',
        'Inversión': 'Asignación de recursos (dinero/tiempo) con el objetivo de obtener beneficios futuros, crecimiento o estabilidad.'
    },
    identidad: {
        'Cultura': 'Conjunto de conocimientos, creencias, tradiciones y costumbres que caracterizan a un grupo humano y le dan sentido de pertenencia.',
        'Tradiciones': 'Prácticas, valores y expresiones culturales transmitidas de generación en generación que definen la identidad colectiva.',
        'Valores': 'Principios fundamentales que guían el comportamiento y las decisiones de las personas dentro de una comunidad o sociedad.',
        'Arte': 'Expresiones creativas que reflejan la visión del mundo, emociones e identidad de una cultura o sociedad.',
        'Participación comunitaria': 'Involucramiento activo de los individuos en la vida colectiva de su comunidad, fomentando el desarrollo social.',
        'Idioma': 'Sistema de comunicación verbal y escrito que permite la expresión del pensamiento y la transmisión cultural.',
        'Costumbres': 'Hábitos y prácticas sociales que se transmiten entre generaciones y que son característicos de un grupo o comunidad.'
    },
    nacionalismo: {
        'Unidad cultural': 'La cohesión y armonía entre los diferentes grupos culturales dentro de una nación, fomentando un sentido de pertenencia colectiva.',
        'Soberanía': 'La autoridad suprema de un Estado para gobernarse a sí mismo sin interferencias externas, tomando decisiones independientes.',
        'Orgullo nacional': 'Sentimiento de satisfacción y respeto por los logros, historia y características propias de la nación a la que se pertenece.',
        'Políticas internas': 'Decisiones y acciones gubernamentales que regulan los asuntos internos de un país, reflejando sus valores nacionales.',
        'Protección económica': 'Medidas implementadas para salvaguardar los intereses económicos nacionales y promover el desarrollo interno.',
        'Historia': 'El registro y estudio de los eventos pasados que han dado forma a la identidad y desarrollo de la nación.',
        'Símbolos patrios': 'Elementos visuales, sonoros o conceptuales que representan la identidad y soberanía de una nación, como banderas, escudos e himnos.'
    }
};

// Función para crear los subnodos
function createSubnodes() {
    Object.keys(nodeData).forEach(category => {
        const container = document.getElementById(`subnodes-${category}`);
        container.innerHTML = ''; // Limpiar contenedor
        
        nodeData[category].forEach(item => {
            const subnode = document.createElement('div');
            subnode.className = 'subnode';
            subnode.dataset.category = category;
            subnode.dataset.keyword = item.text;
            subnode.innerHTML = `<i class="fas ${item.icon}"></i> ${item.text}`;
            container.appendChild(subnode);
        });
    });
}

function setupSubnodeTooltips() {
    const tooltip = document.getElementById('subnodeTooltip');
    if (!tooltip) return;

    const padding = 14;

    const positionTooltip = (evt) => {
        const rect = tooltip.getBoundingClientRect();
        let x = evt.clientX + 14;
        let y = evt.clientY + 14;

        if (x + rect.width + padding > window.innerWidth) {
            x = window.innerWidth - rect.width - padding;
        }
        if (y + rect.height + padding > window.innerHeight) {
            y = window.innerHeight - rect.height - padding;
        }

        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    };

    document.addEventListener('mouseover', (evt) => {
        const el = evt.target.closest('.subnode');
        if (!el) return;

        const category = el.dataset.category;
        const keyword = el.dataset.keyword;

        const def = subnodeDefinitions?.[category]?.[keyword];
        if (!def) return;

        tooltip.textContent = def;
        tooltip.classList.add('show');
        tooltip.setAttribute('aria-hidden', 'false');
        positionTooltip(evt);
    });

    document.addEventListener('mousemove', (evt) => {
        if (!tooltip.classList.contains('show')) return;
        positionTooltip(evt);
    });

    document.addEventListener('mouseout', (evt) => {
        const el = evt.target.closest('.subnode');
        if (!el) return;

        tooltip.classList.remove('show');
        tooltip.setAttribute('aria-hidden', 'true');
    });
}

// Función para posicionar los subnodos
function positionSubnodes() {
    const nodes = document.querySelectorAll('.secondary-node');
    
    nodes.forEach(node => {
        const subnodes = node.querySelector('.subnodes');
        const rect = node.getBoundingClientRect();
        
        // Posicionar los subnodos según la posición del nodo padre
        if (node.id === 'economia') {
            subnodes.style.left = '100%';
            subnodes.style.top = '0';
            subnodes.style.marginLeft = '1rem';
        } else if (node.id === 'identidad') {
            subnodes.style.right = '100%';
            subnodes.style.top = '0';
            subnodes.style.marginRight = '1rem';
        } else if (node.id === 'nacionalismo') {
            subnodes.style.bottom = '100%';
            subnodes.style.left = '50%';
            subnodes.style.transform = 'translateX(-50%)';
            subnodes.style.marginBottom = '1rem';
        }
    });
}

// Función para dibujar las líneas de conexión
function drawConnections() {
    // Limpiar conexiones existentes
    document.querySelectorAll('.connector').forEach(el => el.remove());
    
    const centralNode = document.querySelector('.main-node');
    const centralRect = centralNode.getBoundingClientRect();
    const containerRect = document.querySelector('.mindmap-container').getBoundingClientRect();
    
    // Calcular la posición del centro del nodo central relativo al contenedor
    const centralX = centralRect.left - containerRect.left + centralRect.width / 2;
    const centralY = centralRect.top - containerRect.top + centralRect.height / 2;
    
    // Conectar nodos secundarios al nodo central
    document.querySelectorAll('.secondary-node').forEach(node => {
        const rect = node.getBoundingClientRect();
        
        // Calcular la posición del nodo secundario relativa al contenedor
        const nodeX = rect.left - containerRect.left + rect.width / 2;
        const nodeY = rect.top - containerRect.top + rect.height / 2;
        
        // Calcular el punto de inicio en el borde del círculo central
        const dx = nodeX - centralX;
        const dy = nodeY - centralY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Radio del nodo central y del nodo secundario
        const centralRadius = centralRect.width / 2;
        const nodeRadius = rect.width / 2;

        // Separación para que algunas líneas NO toquen bordes de nodos
        // centralGap: separa la línea del borde de Sociedad
        // nodeGap: separa la línea del borde del nodo secundario
        // Ajusta estos valores si quieres más/menos espacio.
        const centralGap = (node.id === 'economia' || node.id === 'identidad')
            ? 12
            : (node.id === 'nacionalismo')
                ? 16
                : 0;

        const nodeGap = (node.id === 'economia' || node.id === 'identidad') ? 12 : 0;
        
        // Ajustar el ángulo para el nodo de Nacionalismo para que la línea sea recta hacia abajo
        let adjustedAngle = angle;
        if (node.id === 'nacionalismo') {
            adjustedAngle = Math.PI / 2; // 90 grados hacia abajo
        }
        
        // Punto de inicio en el borde del círculo central
        const startX = centralX + Math.cos(adjustedAngle) * (centralRadius + centralGap);
        const startY = centralY + Math.sin(adjustedAngle) * (centralRadius + centralGap);
        
        // Punto final cerca del borde del nodo secundario (con separación opcional)
        const endX = nodeX - Math.cos(adjustedAngle) * (nodeRadius + nodeGap);
        const endY = nodeY - Math.sin(adjustedAngle) * (nodeRadius + nodeGap);
        
        // Calcular la distancia real entre los bordes de los nodos
        const lineLength = Math.sqrt(
            Math.pow(endX - startX, 2) + 
            Math.pow(endY - startY, 2)
        );
        
        // Crear línea de conexión
        const line = document.createElement('div');
        line.className = 'connector';
        
        // Posicionar y rotar la línea
        line.style.width = `${lineLength}px`;
        line.style.height = '2px';
        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${angle}rad)`;
        
        // Color de la línea según la categoría
        if (node.id === 'economia') {
            line.style.backgroundColor = '#36b9cc';
        } else if (node.id === 'identidad') {
            line.style.backgroundColor = '#1cc88a';
        } else if (node.id === 'nacionalismo') {
            line.style.backgroundColor = '#ff0000'; // Rojo puro
            line.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.5)'; // Sutil brillo rojo
            line.style.zIndex = '0'; // Asegurar que esté detrás del nodo central
        }
        
        document.querySelector('.mindmap-container').appendChild(line);
    });
}

// Función para manejar el clic en los nodos
function setupNodeInteractions() {
    const nodes = document.querySelectorAll('.secondary-node');
    
    nodes.forEach(node => {
        const subnodes = node.querySelector('.subnodes');
        
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Cerrar otros subnodos abiertos
            document.querySelectorAll('.subnodes').forEach(sn => {
                if (sn !== subnodes) {
                    sn.style.display = 'none';
                }
            });
            
            // Alternar visualización de subnodos
            if (subnodes.style.display === 'flex') {
                subnodes.style.display = 'none';
            } else {
                subnodes.style.display = 'flex';
                // Re-posicionar los subnodos en caso de que la ventana haya cambiado de tamaño
                positionSubnodes();
            }
        });
    });
    
    // Cerrar subnodos al hacer clic en cualquier parte de la página
    document.addEventListener('click', () => {
        document.querySelectorAll('.subnodes').forEach(sn => {
            sn.style.display = 'none';
        });
    });
}

function setupCentralNodeInteraction() {
    const centralNode = document.getElementById('centralNode');
    if (!centralNode) return;

    centralNode.addEventListener('click', (e) => {
        e.stopPropagation();

        const modalEl = document.getElementById('sociedadModal');
        if (!modalEl) return;

        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    });
}

// Función para hacer el mapa responsivo
function handleResponsive() {
    positionSubnodes();
    drawConnections();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    createSubnodes();
    positionSubnodes();
    setupNodeInteractions();
    setupCentralNodeInteraction();
    setupSubnodeTooltips();
    
    // Redibujar conexiones cuando la ventana cambie de tamaño
    window.addEventListener('resize', () => {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(() => {
            handleResponsive();
        }, 250);
    });
    
    // Dibujar conexiones iniciales
    setTimeout(drawConnections, 100);
    
    // Asegurarse de que las conexiones se dibujen después de que todo esté cargado
    window.addEventListener('load', drawConnections);
});

// Función para agregar un nuevo subnodo (puede ser llamada desde la consola para pruebas)
function addSubnode(category, text, icon = 'fa-circle') {
    if (nodeData[category]) {
        nodeData[category].push({ text, icon });
        createSubnodes();
        positionSubnodes();
        return true;
    }
    return false;
}

// Ejemplo de cómo agregar un nuevo subnodo desde la consola:
// addSubnode('economia', 'Nuevo concepto', 'fa-star');
