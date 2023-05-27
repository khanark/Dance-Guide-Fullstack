import * as yup from 'yup';

const FILE_SIZE = 5 * 1024 * 1024; // 5mb
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const registerSchemaValidation = yup.object().shape({
  firstName: yup
    .string()
    .required('Required')
    .min(2, 'Minimum of 2 characters')
    .max(50, 'Maximum of 50 characters'),
  lastName: yup
    .string()
    .required('Required')
    .min(2, 'Minimum of 2 characters')
    .max(50, 'Maximum of 50 characters'),
  email: yup.string().email('Invalid email address').required('Required'),
  expertise: yup.string().required('Required').min(4, 'Minimum of 4 characters'),
  city: yup.string().required('Required').min(3, 'Minimum of 3 characters'),
  password: yup.string().required('Required').min(5, 'Minimum of 5 characters'),
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
    .max(20, 'Maximum of 20 characters'),
  image: yup
    .mixed() // mixed is used for files
    .test('requiredImage', 'Image is required', value => {
      return value.length > 0;
    }) // value is an array of files
    .test('fileSize', 'File size is too large', value => value[0] && value[0].size <= FILE_SIZE)
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
    .max(15, 'Maximum of 15 characters'),
  street: yup
    .string()
    .required('Required')
    .min(3, 'Minimum of 3 characters')
    .max(15, 'Maximum of 15 characters'),
  link: yup.string().url('Invalid url').required('Required'),
  description: yup
    .string()
    .required('Required')
    .min(10, 'Minimum of 10 characters')
    .max(300, 'Maximum of 300 characters'),
});
