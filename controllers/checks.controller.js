const Checks = require("../models/check.model");

// Crear un nuevo cheque
async function createCheck(req, res) {
  try {
    const today = new Date();

    const expirationDate = new Date(req.body.dateOfExpiration);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    let state = "pending";

    if (expirationDate < oneMonthAgo) {
      state = "payed";
    } else if (expirationDate >= oneMonthAgo && expirationDate <= today) {
      state = "onPayDate";
    }

    const newCheck = new Checks({
      ...req.body,
      state,
    });

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
async function updateExpiredChecks() {
  try {
    const today = new Date();  
    const oneMonthAgo = new Date(today);


    oneMonthAgo.setMonth(today.getMonth() - 1);

    // 1. Marcar como "payed" los cheques vencidos hace 2 meses o más
    const resultPayed = await Checks.updateMany(
      {
        dateOfExpiration: { $lte: oneMonthAgo },
        state: { $ne: "payed" },
      },
      {
        $set: { state: "payed" },
      }
    );

    // 2. Marcar como "onPayDate" los cheques vencidos hace al menos 1 mes (pero no más de 2)
   const resultOnPayDate = await Checks.updateMany(
  {
    $and: [
      { dateOfExpiration: { $gt: oneMonthAgo } },
      { dateOfExpiration: { $lte: today } },
      { state: "pending" }
    ]
  },
  {
    $set: { state: "onPayDate" },
  }
); 
const resultPending = await Checks.updateMany(
      {
        dateOfExpiration: { $gt: today },
      },
      {
        $set: { state: "pending" },
      }
    );
    console.log(`✅ ${resultPending.modifiedCount} cheques marcados como "pending".`);
    console.log(`✅ ${resultPayed.modifiedCount} cheques marcados como "payed".`);
    console.log(`✅ ${resultOnPayDate.modifiedCount} cheques marcados como "onPayDate".`);
  } catch (error) {
    console.error("❌ Error actualizando cheques:", error);
  }
}


module.exports = {
  createCheck,
  getAllChecks,
  getCheckById,
  updateCheck,
  deleteCheck,
  updateExpiredChecks,
};
