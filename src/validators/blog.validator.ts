import * as yup from "yup";

export const blogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  short_description: yup.string().required("Short description is required"),
  description: yup.string().required("Content is required"),
  blogImage: yup
    .string()
    .url("Invalid image URL")
    .required("Blog image is required"),
  authorImage: yup
    .string()
    .url("Invalid author image URL")
    .required("Author image is required"),
});
