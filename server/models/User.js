const {
  Schema,
  model,
  Types: { ObjectId },
} = require('mongoose');
const validator = require('validator');

// TODO: If there is time left implement upload for the avatar

const userSchema = new Schema({
  avatar: {
    type: String,
    match: [/^https?:\/\//, 'Invalid avatar format'],
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?:\+359|0)(?:87|88|89)(?:\d{7}|\d{3}\s\d{2}\s\d{2}|\d{3}-\d{2}-\d{2})$/.test(value);
      },
      message: 'Invalid phone format',
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (adress) {
        return validator.isEmail(adress);
      },
      message: 'Invalid email adress',
    },
  },
  firstName: {
    type: String,
    required: true,
    minLength: [3, 'Name should be minimum 3 characters long'],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, 'Surname should be minimum 3 characters long'],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, 'Password should be minimum 4 characters long'],
  },
  moreInfo: {
    type: String,
  },
  danceSchools: [{ type: ObjectId, ref: 'DanceSchool' }],
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);

module.exports = model('User', userSchema);
