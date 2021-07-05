import { ChangeEvent, ComponentType, forwardRef } from 'react'
import { useFormik } from 'formik'
import { FormControl, FormControlProps } from './form-control'

type FormFieldProps = Pick<ReturnType<typeof useFormik>, 'setFieldValue' | 'getFieldMeta' | 'getFieldProps'> &
  FormControlProps & {
    name: string
    component: ComponentType<any>
    componentParams?: any
    useSetValue?: boolean
    className?: string
    subClassName?: string
    placeholder?: string
    disabled?: boolean
    value?: any
    type?: string
  }

export const FormField = forwardRef<any, FormFieldProps>(
  (
    {
      name,
      helperText,
      inlineHelperText,
      helperTextClassName,
      setFieldValue,
      getFieldMeta,
      getFieldProps,
      component: Component,
      componentParams,
      useSetValue,
      className,
      subClassName,
      placeholder,
      disabled,
      type,
    },
    ref,
  ) => {
    const meta = getFieldMeta(name)
    const field = getFieldProps(name)
    const error = meta.touched ? meta.error : ''

    return (
      <FormControl
        error={error}
        htmlFor={name}
        helperText={helperText}
        inlineHelperText={inlineHelperText}
        helperTextClassName={helperTextClassName}
        className={className}
        subClassName={subClassName}
      >
        <Component
          {...field}
          {...componentParams}
          placeholder={placeholder}
          id={name}
          ref={ref}
          error={error}
          type={type}
          disabled={disabled}
          onChange={(value: ChangeEvent | any) => {
            return useSetValue ? setFieldValue(name, value, true) : field.onChange(value)
          }}
        />
      </FormControl>
    )
  },
)
