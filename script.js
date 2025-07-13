const materias = [
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

let aprobadas = new Set();

const malla = document.getElementById("malla");

function puedeCursar(materia) {
  if (!materia.prerequisito) return true;
  const prereqs = materia.prerequisito.split(" y ").map(p => p.trim());
  return prereqs.every(p => aprobadas.has(p));
}

function renderizarMalla() {
  malla.innerHTML = "";

  const semestres = {};
  materias.forEach(m => {
    if (!semestres[m.semestre]) semestres[m.semestre] = [];
    semestres[m.semestre].push(m);
  });

  Object.keys(semestres).sort((a, b) => a - b).forEach(sem => {
    const contSem = document.createElement("div");
    contSem.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.innerText = `Semestre ${sem}`;
    contSem.appendChild(titulo);

    semestres[sem].forEach(m => {
      const div = document.createElement("div");
      div.className = "materia";

      if (aprobadas.has(m.nombre)) {
        div.classList.add("aprobada");
      } else if (puedeCursar(m)) {
        div.classList.add("disponible");
      } else {
        div.classList.add("bloqueada");
      }

      div.innerHTML = `<strong>${m.nombre}</strong><br><span>Año ${m.año}</span>` +
                      (m.nota ? `<div class="nota">${m.nota}</div>` : "");

      div.onclick = () => {
        if (aprobadas.has(m.nombre)) {
          aprobadas.delete(m.nombre);
        } else {
          aprobadas.add(m.nombre);
        }
        renderizarMalla();
      }

      contSem.appendChild(div);
    });

    malla.appendChild(contSem);
  });

  // Mostrar resumen de avance
  const total = materias.length;
  const aprobadasCount = aprobadas.size;
  const disponiblesCount = materias.filter(m => !aprobadas.has(m.nombre) && puedeCursar(m)).length;

  const resumen = document.getElementById("resumen-avance");
  if (resumen) {
    resumen.innerText = `Total materias: ${total} | Aprobadas: ${aprobadasCount} | Disponibles para cursar: ${disponiblesCount}`;
  }
}

renderizarMalla();
