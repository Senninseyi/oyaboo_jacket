import * as Yup from "yup";

export const MembershipValidationSchema = Yup.object().shape({
  temporary_registeration_id: Yup.string().required(
    "Temporary Registration ID is required"
  ),
  security_id: Yup.string().required("Security ID is required"),
});

export const LoginValidationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});
