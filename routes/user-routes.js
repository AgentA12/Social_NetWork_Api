const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  editUserById,
  deleteUserById,
} = require("../controllers/user-controllers");

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getSingleUser)
  .put(editUserById)
  .delete(deleteUserById);

module.exports = router;
