import { Router } from "express";
import {
  getHtml,
  getCanciones,
  postCanciones,
  putCanciones,
  deleteCanciones
} from "../controllers/cancionescontroller.js";

const router = Router();

router.get("/", getHtml);
router.get("/canciones", getCanciones);
router.post ("/canciones", postCanciones);
router.put ("/canciones/:id", putCanciones);
router.delete("/canciones/:id", deleteCanciones)

export default router;
