import { Router } from "express";
const router = Router();

import {
  getIdea,
  createtIdea,
  updateIdea,
  deleteIdea,
} from "../controllers/ideaControllers.js";

//ROUTER CALL & FUNCTIONS
router.get("/", getIdea);
router.post("/", createtIdea);
router.patch("/:id", updateIdea);
router.delete("/:id", deleteIdea);

//Alternatively you can use the codes below
//router.route('/').get(getAllStaff).post(createStaff);
//router.route('/:id').get(getStaff).patch(updateStaff).delete(deleteStaff)

export default router;