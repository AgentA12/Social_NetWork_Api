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
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(editThought)
  .delete(deleteThought);

router.post("/:userId", createThought);

router.post("/:thoughtId/reactions", addReaction);

router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
