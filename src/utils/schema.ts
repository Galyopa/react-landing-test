import * as yup from "yup";
import { regexEmail, regexPhone } from './regex';

const FILE_SIZE = 5 * 1024;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
];

export const schema = yup.object().shape({
  name: yup.string()
    .min(2, 'Too Short!')
    .max(60, 'Too Long!')
    .required('This field is required'),
  phone: yup
    .string()
    .matches(regexPhone, 'Invalid phone')
    .required(),
  email: yup
    .string()
    .matches(regexEmail, 'Invalid email')
    .max(100, 'Too Long!')
    .required('Required'),
  position: yup.string().required('This field is required'),
  photo: yup
    .mixed()
    .required('This field is required')
    .test(
      "fileSize",
      "The photo size must not be greater than 5 Mb",
      (value: FileList) => {
        if (value.item(0)?.size) {
          return value.item(0).size >= FILE_SIZE;
        }

        return false;
      }
    )
    .test(
      "fileFormat",
      "The photo format must be jpeg/jpg type",
      (value: FileList) => {
        if (value.item(0) !== null) {
          return SUPPORTED_FORMATS.includes(value.item(0).type);
        }

        return false;
      }
    )
});