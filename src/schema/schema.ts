import * as Yup from "yup";

export const MembershipValidationSchema = Yup.object().shape({
  temporary_registeration_id: Yup.string()
    .required("Member ID is Required")
    .min(8, "Member ID must be at least 8 characters"),
  security_id: Yup.string()
    .matches(/^[A-Z]{2}-\d{4}$/, 'Security ID must be in format XX-0000 (2 letters followed by 4 numbers)')
    .required("Security ID is required"),
});

export const LoginValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  password: Yup.string().required("Password is Required"),
});
