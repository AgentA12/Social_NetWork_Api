const router = require("express").Router();
const {
  createThought,
  deleteThought,
  getThoughts,
  getThoughtById,
  editThought,
  addReaction,
  deleteReaction,
} = require("../controllers/thought-controllers");

router.route("/").get(getThoughts);

router
  .route("/:id")
  .get(getThoughtById)
  .post(createThought)
  .put(editThought)
  .delete(deleteThought);

router.post("/:thoughtId/reactions", addReaction);

router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
