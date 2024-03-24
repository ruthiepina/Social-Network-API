const { User, Thought } = require("../models");

const userController = {
   //* GET all users
   getAllUsers(req, res) {
      ``;
      User.find({})
         .populate({
            path: "thoughts",
            select: "-__v",
         })
         .select("-__v") //
         .sort({ _id: -1 })
         .then((dbUserData) => res.JSON(dbUserData))
         .catch((err) => {
            res.status(400).json(err);
         });
   },

   //* GET one user by id
   getUserById({ params }, res) {
      User.findOne({ _id: params.id })
         .populate({
            path: "thoughts",
            select: "-__v",
         })
         .select("-__v") //
         .then((dbUserData) => {
            if (!dbUserData) {
               return res.status(404).json({ message: "User not found with this id" });
            }
            res.json(dbUserData);
         })
         .catch((err) => {
            console.log(err);
            res.status(400).json(err);
         });
   },

   //* POST to add a user to db
   createUser({ body }, res) {
      User.create(body)
         .then((dbUserData) => res.json(dbUserData))
         .catch((err) => res.status(400).json(err));
   },

   //* PUT update user by id
   updateUser({ params, body }, res) {
      User.findOneAndUpdate(
         { _id: params.id }, //
         body, //
         { new: true, runValidators: true }
      ) //
         .then((dbUserData) => {
            if (!dbUserData) {
               return res.status(404).json({ message: "User not found." });
            }
            res.json(dbUserData);
         })
         .catch((err) => res.status(400).json(err));
   },

   //* DELETE user from db
   deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
         .then((dbUserData) => {
            if (!dbUserData) {
               return res.status(404).json({ message: "User not found." });
            }
            res.json(dbUserData);
         })
         .catch((err) => res.status(400).json(err));
   },

   //* DELETE ALL Users
   deleteAllUsers(req, res) {
      User.remove({}).then((dbUserData) => res.json(dbUserData));
   },

   //* ADD a Friend
   addFriend({ params }, res) {
      User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true, runValidators: true })
         .then((dbUserData) => {
            if (!dbUserData) {
               res.status(404).json({ message: "User not found with this ID." });
               return;
            }
            res.json(dbUserData);
         })
         .catch((err) => res.json(err));
   },

   //* REMOVE Friend
   removeFriend({ params }, res) {
      User.findOneAndUpdate(
         //
         { _id: params.userId },
         { $pull: { friends: params.friendId } },
         { new: true }
      )
         .then((dbUserData) => res.json(dbUserData))
         .catch((err) => res.json(err));
   },
};

module.exports = userController;
