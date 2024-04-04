const router = require("express").Router();

const {
   //
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
   deleteAllUsers,
   addFriend,
   removeFriend,
} = require("../../controllers/user-controller");

//* GET all and POST at /api/users
router
   .route("/") //
   .get(getAllUsers)
   .post(createUser)
   .delete(deleteAllUsers);

//* GET one, PUT, and DELETE at /api/users/:id
router //
   .route("/:id")
   .get(getUserById)
   .put(updateUser)
   .delete(deleteUser);

//* POST to add one friend DELETE to remove friend at /api/users/:userId/friends/:friendId
router //
   .route("/:userId/friends/:friendId")
   .post(addFriend)
   .delete(removeFriend);

module.exports = router;
