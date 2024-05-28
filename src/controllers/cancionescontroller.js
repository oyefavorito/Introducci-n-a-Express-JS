import fs from "fs";
import path from "path";

const getHtml = (req, res) => {
  const filePath = path.resolve("index.html");
  res.sendFile(filePath);
};

// PRIMERA PARTE: GET
const getCanciones = (req, res) => {
  try {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({ message: "Hay un error" });
  }
};

// SEGUNDA PARTE: POST

const postCanciones = (req, res) => {
  try {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

    canciones.push(cancion);
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
    res.status(201).send("Canción creada con éxito");
  } catch (error) {
    res.status(500).json({ message: "El recurso no está disponible" });
  }
};

// TERCERA PARTE: PUT

const putCanciones = (req, res) => {
  try {
    const { id } = req.params;
    const cancionActualizada = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

    const indice = canciones.findIndex(c => c.id === parseInt(id));
    if (indice !== -1) {
      canciones[indice] = { ...canciones[indice], ...cancionActualizada };
      fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
      res.status(200).send("Canción actualizada con éxito");
    } else {
      res.status(404).json({ message: "Canción no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "El recurso no está disponible" });
  }
};

// CUARTA PARTE: DELETE

const deleteCanciones = (req, res) => {
  try {
    const { id } = req.params;
    let canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

    const indice = canciones.findIndex(c => c.id === parseInt(id));
    if (indice !== -1) {
      canciones = canciones.filter(c => c.id !== parseInt(id));
      fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
      res.status(200).send("Canción eliminada con éxito");
    } else {
      res.status(404).json({ message: "Canción no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "El recurso no está disponible" });
  }
};

export { getHtml, getCanciones, postCanciones, putCanciones, deleteCanciones };
