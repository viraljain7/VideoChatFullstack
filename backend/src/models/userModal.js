import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);


// Pre-save middleware to hash the password
userSchema.pre('save', async function(next) {
    const user = this; // 'this' refers to the document being saved
  
    // Only hash the password if it has been modified (or is new)
    // This prevents re-hashing an already hashed password on subsequent saves
    if (user.isModified('password')) {
      try {
        const saltRounds =  await bcrypt.genSalt(10); // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword; // Overwrite the plain-text password with the hashed one
      } catch (error) {
        return next(error); // Pass any error to the next middleware or callback
      }
    }
    next(); // Proceed with saving the document
  });
  


const User = mongoose.model("User", userSchema);
export default User;
