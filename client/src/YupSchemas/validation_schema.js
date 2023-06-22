import * as yup from 'yup';

const FILE_SIZE = 5 * 1024 * 1024; // 5mb
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const registerSchemaValidation = yup.object().shape({
  firstName: yup
    .string()
    .required('Required')
    .min(2, 'Minimum of 2 characters')
    .max(50, 'Maximum of 50 characters')
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters'),
  lastName: yup
    .string()
    .required('Required')
    .min(2, 'Minimum of 2 characters')
    .max(50, 'Maximum of 50 characters')
    .matches(/^[A-Za-z]+$/, 'Last name must contain only letters'),
  email: yup.string().email('Invalid email address').required('Required'),
  expertise: yup
    .string()
    .required('Required')
    .min(4, 'Minimum of 4 characters')
    .matches(/^[A-Za-z]+$/, 'Expertise must contain only letters'),
  city: yup
    .string()
    .required('Required')
    .min(3, 'Minimum of 3 characters')
    .matches(/^[A-Za-z]+$/, 'City must contain only letters'),
  password: yup.string().required('Required').min(5, 'Minimum of 5 characters'),
  repeatedPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please repeat your password'),
  phoneNumber: yup
    .string()
    .required('Required')
    .test('phone', 'Invalid phone number', value => {
      const phoneRegex = /^\d{9}$/;
      return phoneRegex.test(value);
    }),
});

export const loginSchemaValidation = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Required'),
  password: yup.string().required('Required'),
});

export const createSchoolSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .min(4, 'Minimum of 4 characters')
    .max(20, 'Maximum of 20 characters')
    .matches(/^[A-Za-z]+$/, 'Name must contain only letters'),
  image: yup
    .mixed() // mixed is used for files
    .test('requiredImage', 'Image is required', value => {
      return value.length > 0;
    }) // value is an array of files
    .test(
      'fileSize',
      'File size is too large',
      value => value[0] && value[0].size <= FILE_SIZE
    )
    .test(
      'fileFormat',
      'Unsupported file format',
      value => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
  schoolType: yup.string().required('Required'),
  settlement: yup
    .string()
    .required('Required')
    .min(3, 'Minimum of 3 characters')
    .max(15, 'Maximum of 15 characters')
    .matches(/^[A-Za-z]+$/, 'City must contain only letters'),
  street: yup
    .string()
    .required('Required')
    .min(3, 'Minimum of 3 characters')
    .max(15, 'Maximum of 15 characters')
    .matches(/^[A-Za-z]+$/, 'Street must contain only letters'),
  link: yup.string().url('Invalid url').required('Required'),
  description: yup
    .string()
    .required('Required')
    .min(100, 'Minimum of 100 characters')
    .max(300, 'Maximum of 300 characters')
    .matches(/^[A-Za-z]+$/, 'Description must contain only letters'),
});
