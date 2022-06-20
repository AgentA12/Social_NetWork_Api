const router = require("express").Router();
const {
  createThought,
  deleteThought,
  getThoughts,
  getThoughtById,
  editThought,
} = require("../controllers/thought-controllers");

router.route("/").get(getThoughts).post(createThought);

router.route("/:id").get(getThoughtById).put(editThought).delete(deleteThought);

module.exports = router;
