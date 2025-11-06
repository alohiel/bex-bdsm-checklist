import { createContext, useState } from 'react'
import { FeelingsFormValuesType, GeneralFormValuesType } from '../utils/types'

export enum TableFormKinds {
  kinks = 'kinks',
  language = 'language',
  feelings = 'feelings',
}

export const defaultFormContext = {
  [TableFormKinds.kinks]: {},
  [TableFormKinds.language]: {},
  [TableFormKinds.feelings]: {},
}

export const FormContext = createContext(null)

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useState<{
    [TableFormKinds.kinks]: GeneralFormValuesType
    [TableFormKinds.language]: GeneralFormValuesType
    [TableFormKinds.feelings]: FeelingsFormValuesType
  }>(defaultFormContext)

  return <FormContext.Provider value={{ forms, setForms }}>{children}</FormContext.Provider>
}
