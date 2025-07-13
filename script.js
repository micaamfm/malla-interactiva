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
  { nombre: "Introducción a la Metodología", año: 3, semestre: 5 },
  { nombre: "Economía del Uruguay", año: 3, semestre: 6, prerequisito: "Microeconomía I y Macroeconomía II" },
  { nombre: "Microeconomía III", año: 3, semestre: 6, prerequisito: "Microeconomía II" },
  { nombre: "Econometría I", año: 3, semestre: 6, prerequisito: "Estadística II" },
  { nombre: "Economía Internacional", año: 4, semestre: 7, prerequisito: "Macroeconomía II y Microeconomía I" },
  { nombre: "Teorías del Desarrollo Económico", año: 4, semestre: 7, prerequisito: "Macroeconomía III" },
  { nombre: "Econometría II", año: 4, semestre: 7, prerequisito: "Econometría I" },
  { nombre: "Historia del Pensamiento Económico", año: 4, semestre: 7 }
];

const malla = document.getElementById("malla");

materias.forEach(m => {
  const div = document.createElement("div");
  div.className = "materia";
  div.innerHTML = `<strong>${m.nombre}</strong><br><span>Año ${m.año} - Semestre ${m.semestre}</span>`;
  malla.appendChild(div);
});
