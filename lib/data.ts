export type FilterOption = {
    value: string
    label: string
    isSubItem?: boolean
    parentValue?: string
}

export const SOURCES: FilterOption[] = [
    { value: "bloomberg", label: "Bloomberg" },
    { value: "reuters", label: "Reuters" },
    { value: "factset", label: "FactSet" },
    { value: "internal", label: "Internal Data" },
]

export const SECTORS: FilterOption[] = [
    { value: "catering", label: "Catering & Vouchers" },
    { value: "cinema", label: "Cinema" },
    { value: "consumer", label: "Consumer" },
    { value: "beverages", label: "Beverages", isSubItem: true, parentValue: "consumer" },
    { value: "beers", label: "Beers", isSubItem: true, parentValue: "consumer" },
    { value: "alcohol-free-beer", label: "Alcohol-Free", parentValue: "beers" },
    { value: "gluten-free-beer", label: "Gluten-Free", parentValue: "beers" },
    { value: "craft-beer", label: "Craft Beer", parentValue: "beers" },
    { value: "lager", label: "Lager", parentValue: "beers" },
    { value: "ipa", label: "IPA", parentValue: "beers" },
    { value: "food", label: "Food", isSubItem: true, parentValue: "consumer" },
    { value: "soft-drinks", label: "Soft Drinks", isSubItem: true, parentValue: "consumer" },
]
