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
  { nombre: "Introducción a la Metodología", año: 3, semestre: 5 }
];

const malla = document.getElementById("malla");

materias.forEach(m => {
  const div = document.createElement("div");
  div.className = "materia";
  div.innerHTML = `<strong>${m.nombre}</strong><br><span>Año ${m.año} - Semestre ${m.semestre}</span>`;
  malla.appendChild(div);
});
