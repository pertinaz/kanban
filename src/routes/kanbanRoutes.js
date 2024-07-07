import express from "express";
import {
  createCard,
  updateCard,
  deleteCard,
} from "../controllers/cardsController.js";
import {
  createColumn,
  updateColumn,
  deleteColumn,
  getCardsByColumn,
} from "../controllers/columnsController.js";

const router = express.Router();

router.post("/cards", verifyToken, createCard);
router.put("/cards/:id", verifyToken, updateCard);
router.delete("/cards/:id", verifyToken, deleteCard);

router.post("/columns", verifyToken, createColumn);
router.put("/columns/:id", verifyToken, updateColumn);
router.delete("/columns/:id", verifyToken, deleteColumn);
router.get("/columns/columnId/cards", verifyToken, getCardsByColumn);

export default router;
