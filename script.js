const materias = [
  { nombre: "Matemática I", año: 1 },
  { nombre: "Biología", año: 1 },
  { nombre: "Física", año: 2 },
  { nombre: "Química", año: 2 },
  { nombre: "Estadística", año: 3 }
];

const malla = document.getElementById("malla");

materias.forEach(m => {
  const div = document.createElement("div");
  div.className = "materia";
  div.innerText = `${m.nombre}\n(Año ${m.año})`;
  malla.appendChild(div);
});
