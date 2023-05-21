const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const validator = require("validator");

// TODO: If there is time left implement upload for the avatar

const userSchema = new Schema({
  avatar: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (value) {
    //     return /^\+359\d{9}$/.test(value);
    //   },
    //   message: "Invalid phone format",
    // },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (adress) {
        return validator.isEmail(adress);
      },
      message: "Invalid email adress",
    },
  },
  city: {
    type: String,
    required: true,
    minLength: [3, "City should be minumum 4 characters long"],
  },
  expertise: {
    type: String,
    required: true,
    minLength: [4, "Expertise should be minumum 4 characters long"],
  },
  firstName: {
    type: String,
    required: true,
    minLength: [3, "Name should be minimum 3 characters long"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Surname should be minimum 3 characters long"],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, "Password should be minimum 4 characters long"],
  },
  moreInfo: {
    type: String,
    maxLength: [200, "More info should be maximum 200 characters long"],
  },
  danceSchools: [{ type: ObjectId, ref: "DanceSchool" }],
  likedSchools: [{ type: ObjectId, ref: "DanceSchool" }],
});

userSchema.pre("save", function (next) {
  if (this.phoneNumber && !this.phoneNumber.startsWith("+359")) {
    this.phoneNumber = "+359" + this.phoneNumber;
  }
  next();
});

// userSchema.pre("validate", function (next) {
//   if (this.phoneNumber && !this.phoneNumber.startsWith("+359")) {
//     this.phoneNumber = "+359" + this.phoneNumber;
//   }
//   next();
// });

userSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

module.exports = model("User", userSchema);
