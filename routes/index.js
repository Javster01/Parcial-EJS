const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Cargar los datos de departamentos y municipios
const departments = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources/departments.json'), 'utf-8'));
const towns = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources/towns.json'), 'utf-8'));

// Función para obtener municipios por departamento
function getMunicipalitiesByDepartment(departmentCode) {
  return towns.filter(town => town.department === departmentCode);
}

// Datos temporales para almacenar los registros
let records = [];

// Ruta principal para mostrar la vista con el formulario y los municipios existentes
router.get('/', (req, res) => {
  res.render('templates/index', { records, departments, towns, municipalities: [] });
});

// Ruta para obtener municipios dependientes
router.get('/municipalities/:department', (req, res) => {
  const departmentCode = req.params.department;
  const municipalities = getMunicipalitiesByDepartment(departmentCode);
  res.json(municipalities);
});

// Ruta para agregar un nuevo registro
router.post('/add', (req, res) => {
  const { department, municipality, objeto } = req.body;
  records.push({ department, municipality, objeto });
  res.redirect('/');
});

module.exports = router;
