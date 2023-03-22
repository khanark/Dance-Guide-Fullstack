const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');

const danceSchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, 'Name should be minimum 4 characters long'],
  },
  description: {
    type: String,
    minLength: [10, 'Description should be minimum 4 characters long'],
    maxLength: [100, 'Description should be maximum 100 characters long'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  link: {
    type: String,
    required: true,
    match: [/^https?:\/\//, 'Invalid link format'],
  },
  image: {
    type: String,
    required: true,
    match: [/^https?:\/\//, 'Invalid image format'],
  },
  social: {
    facebook: {
      type: String,
      match: [/^https?:\/\//, 'Invalid facebook link format'],
    },
    instagram: {
      type: String,
      match: [/^https?:\/\//, 'Invalid facebook link format'],
    },
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  settlementType: {
    type: String,
    enum: ['city', 'village'],
  },
  settlement: {
    type: String,
    required: true,
    minLength: [3, 'City should be minimum 3 characters long'],
  },
  street: {
    type: String,
    required: true,
    minLength: [3, 'Street should be minimum 3 characters long'],
  },
  owner: { type: ObjectId, ref: 'User' },
});

danceSchoolSchema.index(
  { name: 1 },
  {
    unique: true,
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);

module.exports = model('DanceSchool', danceSchoolSchema);
