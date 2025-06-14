require("dotenv").config();

const app = require("./app.js");
const mongoose = require("mongoose");
const { updateExpiredChecks } = require("./controllers/checks.controller"); // Asegurate de exportarla

const mongo_uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose.connect(mongo_uri)
  .then(async () => {
    console.log("MongoDB connected");

    try {
      await updateExpiredChecks();
      console.log("✔️ Cheques vencidos actualizados correctamente al iniciar el servidor.");
    } catch (err) {
      console.error("❌ Error al actualizar cheques vencidos al iniciar:", err.message);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
