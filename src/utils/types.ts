import { TableFormKinds } from '../components/FormContext'

export enum FormCategories {
  into = 'into',
  willing = 'willing',
  maybe = 'maybe',
  no = 'no',
  often = 'often',
  sometimes = 'sometimes',
  never = 'never',
}
export enum Roles {
  giving = 'giving',
  receiving = 'receiving',
}

export enum Experiences {
  new = 'new',
  favourite = 'favourite',
}

export type GeneralFormValuesType = {
  [key: string]: {
    [FormCategories.into]: ActivityProperties
    [FormCategories.willing]: ActivityProperties
    [FormCategories.maybe]: ActivityProperties
    [FormCategories.no]: LimitedActivityProperties
  }
}

export type FeelingsFormValuesType = {
  [key: string]: {
    [FormCategories.often]: ActivityProperties
    [FormCategories.sometimes]: ActivityProperties
    [FormCategories.never]: LimitedActivityProperties
  }
}

export type RoleProperties = {
  selected: boolean
  [Experiences.new]: boolean
  [Experiences.favourite]: boolean
}

export type ActivityProperties = {
  [Roles.giving]: RoleProperties
  [Roles.receiving]: RoleProperties
}

export type LimitedActivityProperties = {
  [Roles.giving]: { selected: boolean }
  [Roles.receiving]: { selected: boolean }
}

export type RowLabels = {
  kinks: string[]
  language: string[]
  feelings: string[]
}

export const emptyRolesExperiences = {
  [Roles.giving]: {
    selected: false,
    new: false,
    favourite: false,
  },
  [Roles.receiving]: {
    selected: false,
    new: false,
    favourite: false,
  },
}

export const kindText = {
  [TableFormKinds.kinks]: 'Kinks',
  [TableFormKinds.language]: 'Language',
  [TableFormKinds.feelings]: 'Feelings',
}

export const categoryText = {
  [FormCategories.into]: {
    label: `Yes (Into)`,
    tooltip: `For activities that you are excited about doing or trying.`,
  },
  [FormCategories.willing]: {
    label: `Yes (Willing)`,
    tooltip: `For activities you are excited to do or try if your partner will enjoy it.`,
  },
  [FormCategories.maybe]: {
    label: `Maybe`,
    tooltip: `For activities you're only into under certain circumstances, or activities you're`,
  },
  [FormCategories.no]: {
    label: `No`,
    tooltip: `For activities you are not willing to negotiate or try, these are off limits.`,
  },
  [FormCategories.often]: {
    label: `Often`,
    tooltip: `For feelings you want to feel frequently or always during play.`,
  },
  [FormCategories.sometimes]: {
    label: `Sometimes`,
    tooltip: `For feelings that you're open to experiencing occasionally or only during certain types of play etc.`,
  },
  [FormCategories.never]: { label: `Never`, tooltip: `For feelings you never want to feel.` },
}

export const roleText = {
  [TableFormKinds.kinks]: {
    [Roles.giving]: { label: `Top`, tooltip: `` },
    [Roles.receiving]: { label: `Bottom`, tooltip: `` },
  },
  [TableFormKinds.language]: {
    [Roles.giving]: { label: `Speaker`, tooltip: `` },
    [Roles.receiving]: { label: `Listener`, tooltip: `` },
  },
  [TableFormKinds.feelings]: {
    [Roles.giving]: { label: `Inspiring`, tooltip: `` },
    [Roles.receiving]: { label: `Feeling`, tooltip: `` },
  },
}
export const experienceText = {
  [Experiences.favourite]: { label: `Favourite`, text: `Indicates a favourite.` },
  [Experiences.new]: { label: `New`, text: `Indicates something this person has never tried.` },
}

export const setEmptyRow = (kind) => {
  return kind !== TableFormKinds.feelings
    ? {
        [FormCategories.into]: emptyRolesExperiences,
        [FormCategories.willing]: emptyRolesExperiences,
        [FormCategories.maybe]: emptyRolesExperiences,
        [FormCategories.no]: {
          [Roles.giving]: { selected: false },
          [Roles.receiving]: { selected: false },
        },
      }
    : {
        [FormCategories.often]: emptyRolesExperiences,
        [FormCategories.sometimes]: emptyRolesExperiences,
        [FormCategories.never]: {
          [Roles.giving]: { selected: false },
          [Roles.receiving]: { selected: false },
        },
      }
}
