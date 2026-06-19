import { useState } from 'react'

const validators = {
  required: (value) => (value.trim() ? '' : 'This field is required'),
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address',
  phone: (value) =>
    /^[+]?[\d\s-]{10,}$/.test(value) ? '' : 'Enter a valid phone number',
  minLength: (min) => (value) =>
    value.length >= min ? '' : `Must be at least ${min} characters`,
}

export function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateField = (name, value) => {
    const rules = validationRules[name] || []
    for (const rule of rules) {
      const error = typeof rule === 'function' ? rule(value) : validators[rule]?.(value)
      if (error) return error
    }
    return ''
  }

  const validateAll = () => {
    const newErrors = {}
    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name] || '')
      if (error) newErrors[name] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, touched, handleChange, handleBlur, validateAll, resetForm, setValues }
}
