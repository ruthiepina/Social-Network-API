const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
   {
      username: {
         type: String,
         trim: true,
         required: "A username is required.",
         unique: true,
      },
      email: {
         type: String,
         unique: true,
         required: "An email is required.",
         match: [/.+@.+\..+/, "Please enter a valid email"],
      },
      thoughts: {
         type: Schema.Types.ObjectId,
         ref: "Thought",
      },
      friends: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
      userCreated: {
         type: Data,
         default: Date.now(),
         get: (createdAtVal) => dateFormat(createdAtVal),
      },
   },
   {
      toJSON: {
         virtuals: true,
         getters: true,
      },
      id: false,
   }
);

UserSchema.virtual("friendCount").get(function () {
   return this.friends.length + 1;
});

const User = model("User", UserSchema);

module.exports = User;
