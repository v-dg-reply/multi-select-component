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

    // Beverages
    { value: "beverages", label: "Beverages", isSubItem: true, parentValue: "consumer" },
    { value: "coffee", label: "Coffee", parentValue: "beverages" },
    { value: "tea", label: "Tea", parentValue: "beverages" },
    { value: "juice", label: "Juice", parentValue: "beverages" },
    { value: "energy-drinks", label: "Energy Drinks", parentValue: "beverages" },

    // Beers
    { value: "beers", label: "Beers", isSubItem: true, parentValue: "consumer" },
    { value: "alcohol-free-beer", label: "Alcohol-Free", parentValue: "beers" },
    { value: "gluten-free-beer", label: "Gluten-Free", parentValue: "beers" },
    { value: "craft-beer", label: "Craft Beer", parentValue: "beers" },
    { value: "lager", label: "Lager", parentValue: "beers" },
    { value: "ipa", label: "IPA", parentValue: "beers" },

    // Food
    { value: "food", label: "Food", isSubItem: true, parentValue: "consumer" },
    { value: "dairy", label: "Dairy", parentValue: "food" },
    { value: "meat-poultry", label: "Meat & Poultry", parentValue: "food" },
    { value: "bakery", label: "Bakery", parentValue: "food" },
    { value: "snacks", label: "Snacks", parentValue: "food" },
    { value: "frozen-foods", label: "Frozen Foods", parentValue: "food" },

    // Soft Drinks
    { value: "soft-drinks", label: "Soft Drinks", isSubItem: true, parentValue: "consumer" },
    { value: "cola", label: "Cola", parentValue: "soft-drinks" },
    { value: "lemonade", label: "Lemonade", parentValue: "soft-drinks" },
    { value: "sparkling-water", label: "Sparkling Water", parentValue: "soft-drinks" },
    { value: "iced-tea", label: "Iced Tea", parentValue: "soft-drinks" },
]
