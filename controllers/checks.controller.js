const Checks = require("../models/check.model");

// Crear un nuevo cheque
async function createCheck(req, res) {
  try {
    const newCheck = new Checks(req.body);
    const savedCheck = await newCheck.save();
    res.status(201).json(savedCheck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Obtener todos los cheques
async function getAllChecks(req, res) {
  try {
    const checks = await Checks.find();
    res.json(checks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener un cheque por ID
async function getCheckById(req, res) {
  try {
    const check = await Checks.findById(req.params.id);
    if (!check) return res.status(404).json({ error: "Cheque no encontrado" });
    res.json(check);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Actualizar un cheque
async function updateCheck(req, res) {
  try {
    const updatedCheck = await Checks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCheck) return res.status(404).json({ error: "Cheque no encontrado" });
    res.json(updatedCheck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Eliminar un cheque
async function deleteCheck(req, res) {
  try {
    const deletedCheck = await Checks.findByIdAndDelete(req.params.id);
    if (!deletedCheck) return res.status(404).json({ error: "Cheque no encontrado" });
    res.json({ message: "Cheque eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createCheck,
  getAllChecks,
  getCheckById,
  updateCheck,
  deleteCheck,
};
