import React, { useState, ChangeEvent, FormEvent } from "react";

export type ValidationRule = "required" | "maxLength" | "pattern";

export type ValidationRules = {
  [key: string]: {
    rules: ValidationRule[];
    maxLength?: number;
    pattern?: RegExp;
  };
};

export type FormErrors<T> = {
  [key: string]: T;
};

export type FormValues<T> = {
  [key: string]: T;
};

type FormSubmitCallback = (data: FormValues<any>) => void;

export function useForm(
  initialValues: FormValues<any>,
  validationRules: ValidationRules,
  onSubmitCallback: FormSubmitCallback
) {
  const [formData, setFormData] = useState<FormValues<any>>(initialValues);
  const [errors, setErrors] = useState<FormErrors<string>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: FormValues<string | number>) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const fieldRules = validationRules[name];
    console.log({ fieldRules })
    if (!fieldRules) return;

    delete errors[name];

    if (fieldRules.rules.includes("required") && formData[name]) {
      setErrors((prevData) => ({ ...prevData, [name]: "" }));
    }
     
    if (fieldRules.rules.includes("required") && !value) {
      setErrors((prevData: any) => ({
        ...prevData,
        [name]: "This field is required",
      }));
    }
    
    if (fieldRules.rules.includes("maxLength") && fieldRules.maxLength && value.length < fieldRules.maxLength) {
      setErrors((prevData: any) => ({
        ...prevData,
        [name]: "",
      }));
    }

    if (fieldRules.rules.includes("maxLength") && fieldRules.maxLength && value.length > fieldRules.maxLength) {
      setErrors((prevData: any) => ({
        ...prevData,
        [name]: "Max length exceeded",
      }));
    }
    
    if (
      fieldRules.rules.includes("pattern") &&
      fieldRules.pattern &&
      fieldRules.pattern.test(value)
    ) {
      setErrors((prevData: any) => ({ ...prevData, [name]: "" }));
    }

   if (
      fieldRules.rules.includes("pattern") &&
      fieldRules.pattern &&
      !fieldRules.pattern.test(value)
    ) {
      setErrors((prevData: any) => ({ ...prevData, [name]: "Invalid format" }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors<string> = {};

    Object.keys(validationRules).forEach((name) => {
      validateField(name, formData[name]);
      if (newErrors[name]) {
        newErrors[name] = errors[name];
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmitCallback(formData);
    }
  };
  return { formData, handleChange, handleSubmit, errors };
}
