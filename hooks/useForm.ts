/**
 * Copyright (c) [2023] [Ridho Tamma] 
 * 
 * EXPERIMENTAL SELF MADE USEFORM
 * Currently Not supported Checkbox and Radio Button
 */



import { useState, ChangeEvent, FormEvent } from "react";

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
  const [formData, setFormData] = useState<FormValues <any>>(initialValues);
  const [errors, setErrors] = useState<FormErrors <string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    if (type === 'checkbox') {
      setFormData((prevData: FormValues<string | number | boolean>) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData: FormValues<string | number>) => ({ ...prevData, [name]: value }));
    }
    
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const fieldRules = validationRules[name];
    if (!fieldRules) return;

    const newErrors = { ...errors };
    delete newErrors[name];

    fieldRules.rules.forEach((rule) => {
      if (rule === "required" && !value) {
        newErrors[name] = "This field is required";
      } else if (
        rule === "maxLength" &&
        fieldRules.maxLength &&
        value.length > fieldRules.maxLength
      ) {
        newErrors[name] = `Max length exceeded`;
      } else if (
        rule === "pattern" &&
        fieldRules.pattern &&
        !fieldRules.pattern.test(value)
      ) {
        newErrors[name] = "Invalid format";
      }
    });

    setErrors(newErrors);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  
    // Validate all fields
    Object.keys(validationRules).forEach((name) => {
      validateField(name, formData[name]);
    });
  
    // If there are any errors, return
    if (Object.keys(errors).length > 0) {
      return;
    }
  
    // Otherwise, call the onSubmitCallback function
    onSubmitCallback(formData);
  };

  return { formData, handleChange, handleSubmit, errors };
}
