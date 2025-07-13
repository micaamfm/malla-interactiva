const materiasObligatorias = [
  { nombre: "Administración y Gestión de las Organizaciones I", año: 1, semestre: 1 },
  { nombre: "Introducción a la Microeconomía", año: 1, semestre: 1 },
  { nombre: "Cálculo I", año: 1, semestre: 1 },
  { nombre: "Conceptos Contables", año: 1, semestre: 1 },
  { nombre: "Álgebra Lineal", año: 1, semestre: 2 },
  { nombre: "Economía Descriptiva", año: 1, semestre: 2, prerequisito: "Introducción a la Microeconomía" },
  { nombre: "Cálculo II", año: 2, semestre: 3, prerequisito: "Cálculo I" },
  { nombre: "Historia Económica Mundial", año: 2, semestre: 3, prerequisito: "Economía Descriptiva" },
  { nombre: "Macroeconomía I", año: 2, semestre: 3, prerequisito: "Introducción a la Microeconomía" },
  { nombre: "Microeconomía I", año: 2, semestre: 4, prerequisito: "Cálculo II" },
  { nombre: "Macroeconomía II", año: 2, semestre: 4, prerequisito: "Macroeconomía I" },
  { nombre: "Estadística I", año: 2, semestre: 4, prerequisito: "Cálculo II" },
  { nombre: "Microeconomía II", año: 3, semestre: 5, prerequisito: "Microeconomía I" },
  { nombre: "Economía de América Latina", año: 3, semestre: 5, prerequisito: "Macroeconomía I" },
  { nombre: "Estadística II", año: 3, semestre: 5, prerequisito: "Estadística I" },
  { nombre: "Macroeconomía III", año: 3, semestre: 5, prerequisito: "Macroeconomía II" },
  { nombre: "Introducción a la Metodología", año: 3, semestre: 5, nota: "➜ Se necesitan 100 créditos" },
  { nombre: "Economía del Uruguay", año: 3, semestre: 6, prerequisito: "Microeconomía I y Macroeconomía II" },
  { nombre: "Microeconomía III", año: 3, semestre: 6, prerequisito: "Microeconomía II" },
  { nombre: "Econometría I", año: 3, semestre: 6, prerequisito: "Estadística II" },
  { nombre: "Economía Internacional", año: 4, semestre: 7, prerequisito: "Macroeconomía II y Microeconomía I" },
  { nombre: "Teorías del Desarrollo Económico", año: 4, semestre: 7, prerequisito: "Macroeconomía III" },
  { nombre: "Econometría II", año: 4, semestre: 7, prerequisito: "Econometría I" },
  { nombre: "Historia del Pensamiento Económico", año: 4, semestre: 7, nota: "➜ Se necesitan 180 créditos" }
];

const optativasImpar = [
  { nombre: "Economía Pública", tipo: "Optativa Impar", prerequisito: "Microeconomía II" },
  { nombre: "Economía y Género", tipo: "Optativa Impar", prerequisito: "Microeconomía I y Estadística I" }
];

const optativasPar = [
  { nombre: "Ciencia Política", tipo: "Optativa Par" },
  { nombre: "Cálculo III", tipo: "Optativa Par", prerequisito: "Cálculo II" },
  { nombre: "Matemática Financiera", tipo: "Optativa Par", prerequisito: "Estadística I" },
  { nombre: "Economía Laboral", tipo: "Optativa Par", prerequisito: "Microeconomía I" },
  { nombre: "Desigualdad y Pobreza", tipo: "Optativa Par", prerequisito: "Estadística I" }
];

let aprobadas = new Set();

const malla = document.getElementById("malla");

function puedeCursar(materia) {
  if (!materia.prerequisito) return true;
  const prereqs = materia.prerequisito.split(" y ").map(p => p.trim());
  return prereqs.every(p => aprobadas.has(p));
}

function renderGrupo(materias, tituloSeccion) {
  const contenedor = document.createElement("div");
  contenedor.className = "semestre";

  const titulo = document.createElement("h2");
  titulo.innerText = tituloSeccion;
  contenedor.appendChild(titulo);

  materias.forEach(m => {
    const div = document.createElement("div");
    div.className = "materia";

    if (aprobadas.has(m.nombre)) {
      div.classList.add("aprobada");
    } else if (puedeCursar(m)) {
      div.classList.add("disponible");
    } else {
      div.classList.add("bloqueada");
    }

    div.innerHTML = `<strong>${m.nombre}</strong><br>` +
                    (m.año ? `<span>Año ${m.año}</span>` : "") +
                    (m.nota ? `<div class="nota">${m.nota}</div>` : "");

    div.onclick = () => {
      if (aprobadas.has(m.nombre)) {
        aprobadas.delete(m.nombre);
      } else {
        aprobadas.add(m.nombre);
      }
      renderizarMalla();
    }

    contenedor.appendChild(div);
  });

  malla.appendChild(contenedor);
}

function renderizarMalla() {
  malla.innerHTML = "";

  // Obligatorias por semestre
  const semestres = {};
  materiasObligatorias.forEach(m => {
    if (!semestres[m.semestre]) semestres[m.semestre] = [];
    semestres[m.semestre].push(m);
  });

  Object.keys(semestres).sort((a, b) => a - b).forEach(sem => {
    renderGrupo(semestres[sem], `Semestre ${sem}`);
  });

  // Secciones de optativas
  renderGrupo(optativasImpar, "Optativas Semestre Impar");
  renderGrupo(optativasPar, "Optativas Semestre Par");

  // Avance
  const todas = [...materiasObligatorias, ...optativasImpar, ...optativasPar];
  const total = todas.length;
  const aprobadasCount = Array.from(aprobadas).filter(nombre =>
    todas.some(m => m.nombre === nombre)
  ).length;
  const disponiblesCount = todas.filter(m =>
    !aprobadas.has(m.nombre) && puedeCursar(m)
  ).length;

  const resumen = document.getElementById("resumen-avance");
  if (resumen) {
    resumen.innerText = `Total materias: ${total} | Aprobadas: ${aprobadasCount} | Disponibles para cursar: ${disponiblesCount}`;
  }
}

renderizarMalla();
  
