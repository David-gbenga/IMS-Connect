import { Router } from "express";
const router = Router();

import {
  getAllStaff,
  createStaff,
  getStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffControllers.js";

//ROUTER CALL & FUNCTIONS
router.get("/", getAllStaff);
router.post("/", createStaff);
router.get("/:id", getStaff);
router.patch("/:id", updateStaff);
router.delete("/:id", deleteStaff);

//Alternatively you can use the codes below
//router.route('/').get(getAllStaff).post(createStaff);
//router.route('/:id').get(getStaff).patch(updateStaff).delete(deleteStaff)

export default router;