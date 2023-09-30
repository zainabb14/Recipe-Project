import express from "express";
import {
  addRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addReview,
} from "../Controllers/recipeController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const recipeRouter = express.Router();

recipeRouter.get("/", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});
recipeRouter.get("/all-recipes", getAllRecipes);
recipeRouter.get("/get-recipe/:id", getRecipe);
recipeRouter.post("/add-review/:id", addReview);
recipeRouter.post("/add-recipe/:id", verifyAdmin, addRecipe); //for Admin
recipeRouter.put("/update-recipe/:id", verifyAdmin, updateRecipe); //for Admin
recipeRouter.delete("/delete-recipe/:id", verifyAdmin, deleteRecipe); //for Admin

export default recipeRouter;
