const router = require("express").Router();
const {
  createThought,
  deleteThought,
  getThoughts,
  getThoughtById,
  editThought,
} = require("../controllers/thought-controllers");

router.route("/").get(getThoughts);

router
  .route("/:id")
  .get(getThoughtById)
  .post(createThought)
  .put(editThought)
  .delete(deleteThought);

module.exports = router;
