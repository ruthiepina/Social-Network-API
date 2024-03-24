const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//* not a model, used as reaction fields subdoc schema in thought model
const ReactionSchema = new Schema(
   {
      reactionId: {
         type: Schema.Types.ObjectId,
         default: () => new Types.ObjectId(),
      },
      reactionBody: {
         type: String,
         required: true,
         maxlength: 280,
      },
      username: {
         type: String,
         required: true,
      },
      createdAt: {
         type: Date,
         default: Date.now,
         get: (createdAtVal) => dateFormat(createdAtVal),
      },
   },
   {
      toJSON: {
         getters: true,
      },
   }
);

const ThoughtSchema = new Schema(
   {
      thoughtText: {
         type: String,
         required: "Please enter your thought",
         validate: [({ length }) => length >= 1 && length <= 280, "Thought should be more than one character!"],
      },
      username: {
         type: String,
         required: "Please enter your username",
      },
      reactions: [ReactionSchema],
   },
   {
      toJSON: {
         virtuals: true,
         getters: true,
      },
      id: false,
   }
);

ThoughtSchema.virtual("reactionCount").get(function () {
   return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
