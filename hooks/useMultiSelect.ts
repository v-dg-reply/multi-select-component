import { useState } from "react"

export function useMultiSelect(initial: string[] = []) {
    const [selected, setSelected] = useState<string[]>(initial)

    // Accepts a single value or an array (for parent → children group toggles)
    const toggle = (values: string | string[]) => {
        const arr = Array.isArray(values) ? values : [values]
        setSelected(prev => {
            const allSelected = arr.every(v => prev.includes(v))
            if (allSelected) {
                // Deselect all values in the group
                return prev.filter(v => !arr.includes(v))
            } else {
                // Select any values in the group not yet selected
                return [...prev, ...arr.filter(v => !prev.includes(v))]
            }
        })
    }

    return { selected, toggle }
}
