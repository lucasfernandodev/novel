import { useState } from "react"
import { validates } from "../utils/validates";

interface IProps {
  inputs: HTMLInputElement[]
}

type IError = Record<string, {
  msg: string
}>

export const useValidateForm = () => {
  const [errors, setErrors] = useState<IError>({});

  function validate({ inputs }: IProps) {
    const formFields: Record<string, string> = {}

    setErrors({});
    const _errors = {} as Record<string, { msg: string }>;

    for (const input of inputs) {
      const value = input.value;
      const name = input.name;
      formFields[name] = value

      const isValid = validates[name](value);

      if (isValid.error === true) {
        _errors[name] = { msg: isValid.msg };
      } else {
        const isLogError = errors;
        delete isLogError[name];
        setErrors(() => ({ ...isLogError }))
      }
    }

    setErrors(prev => ({ ...prev, ..._errors }));
    return { fields: formFields, _errors };
  }

  return {
    errors,
    validate
  }
}