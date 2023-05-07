import * as yup from "yup";

export const registerSchemaValidation = yup.object().shape({
  firstName: yup
    .string()
    .required("Required")
    .min(2, "Minimum of 2 characters")
    .max(50, "Maximum of 50 characters"),
  lastName: yup
    .string()
    .required("Required")
    .min(2, "Minimum of 2 characters")
    .max(50, "Maximum of 50 characters"),
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required").min(5, "Minimum of 5 characters"),
  phoneNumber: yup
    .string()
    .required("Required")
    .test("phone", "Invalid phone number", (value) => {
      const phoneRegex =
        /^(?:\+359|0)(?:87|88|89)(?:\d{7}|\d{3}\s\d{2}\s\d{2}|\d{3}-\d{2}-\d{2})$/;
      return phoneRegex.test(value);
    }),
});

export const loginSchemaValidation = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});
