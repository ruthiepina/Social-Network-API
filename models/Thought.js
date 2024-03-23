const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
   {
      thoughtText: {
         type: String,
         required: "Please enter your thought",
         validate: [({ length }) => length >= 1 && length <= 280, "Thought should be more than one character!"],
      },
      userCreated: {
         type: Date,
         default: Date.now(),
         get: (createdAtVal) => dateFormat(createdAtVal),
      },
      username: {
         type: String,
         required: "Please enter your username",
      },
   },
   {
      toJSON: {
         virtuals: true,
      },
      id: false,
   }
);

UserSchema.virtual("reactionCount").get(function () {
   return this.reactions.length + 1;
});

const User = model("User", UserSchema);

module.exports = User;
