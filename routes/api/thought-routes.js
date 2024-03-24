const router = require("express").Router();

const {
   getAllThoughts,
   removeAllThoughts,
   addThought,
   removeThoughtFromUser,
   getThoughtById,
   updateThoughtById,
   removeThoughtById,
   addReaction,
   removeReactionById,
} = require("../../controllers/thought-controller");

router //
   .route("/")
   .get(getAllThoughts)
   .delete(removeAllThoughts);

//* /api/thoughts/<userId>
router //
   .route("/:userId")
   .post(addThought);

//* /api/thoughts/<userId>/<reactionId>
router //
   .route("/:userId/:thoughtId")
   .delete(removeThoughtFromUser);

router //
   .route("/:thoughtId")
   .get(getThoughtById)
   .post(updateThoughtById)
   .delete(removeThoughtById);

router //
   .route("/:thoughtId/reactions")
   .post(addReaction);

router //
   .route("/:thoughtId/reactions/:reactionId")
   .delete(removeReactionById);

module.exports = router;
