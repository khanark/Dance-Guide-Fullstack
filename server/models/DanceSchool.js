const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const danceSchoolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [4, "Name should be minimum 4 characters long"],
    },
    description: {
      type: String,
      required: true,
      minLength: [10, "Description should be minimum 50 characters long"],
      maxLength: [300, "Description should be maximum 300 characters long"],
    },
    likes: {
      count: {
        type: Number,
        default: 0,
      },
      users: [{ type: ObjectId, ref: "User" }],
    },
    comments: [{ type: ObjectId, ref: "Comment" }],
    link: {
      type: String,
      required: true,
      match: [/^https?:\/\//, "Invalid link format"],
    },
    image: {
      type: String,
    },
    social: {
      facebook: {
        type: String,
        match: [/^https?:\/\//, "Invalid facebook link format"],
      },
      instagram: {
        type: String,
        match: [/^https?:\/\//, "Invalid facebook link format"],
      },
    },
    settlement: {
      type: String,
      required: true,
      minLength: [3, "City should be minimum 3 characters long"],
    },
    street: {
      type: String,
      required: true,
      minLength: [3, "Street should be minimum 3 characters long"],
    },
    schoolType: {
      type: String,
      required: true,
    },
    owner: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

danceSchoolSchema.index(
  { name: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

module.exports = model("DanceSchool", danceSchoolSchema);
