const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  editUserById,
  deleteUserById,
  addFriend,
  deleteFriend
} = require("../controllers/user-controllers");

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getSingleUser)
  .put(editUserById)
  .delete(deleteUserById);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
