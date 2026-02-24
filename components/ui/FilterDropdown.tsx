"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FilterOption } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type FilterDropdownProps = {
    label: string
    placeholder: string
    searchPlaceholder: string
    emptyText: string
    options: FilterOption[]
    selected: string[]
    onToggle: (values: string | string[]) => void
    width?: number
}

export function FilterDropdown({
    label,
    placeholder,
    searchPlaceholder,
    emptyText,
    options,
    selected,
    onToggle,
    width = 280,
}: FilterDropdownProps) {
    const [open, setOpen] = React.useState(false)

    // Recursively collect all descendant values of an option
    const getAllDescendants = (option: FilterOption): string[] => {
        const directChildren = options.filter(o => o.parentValue === option.value)
        return directChildren.flatMap(child => [child.value, ...getAllDescendants(child)])
    }

    // Walk up parentValue chain to determine nesting depth (0 = top level)
    const getDepth = (option: FilterOption): number => {
        if (!option.parentValue) return 0
        const parent = options.find(o => o.value === option.parentValue)
        return parent ? 1 + getDepth(parent) : 1
    }

    // "all"  = item + all descendants selected
    // "some" = item or some descendants selected (indeterminate → dash)
    // "none" = nothing selected
    const getCheckState = (option: FilterOption): "none" | "some" | "all" => {
        const descendants = getAllDescendants(option)
        if (descendants.length === 0) {
            return selected.includes(option.value) ? "all" : "none"
        }
        const allSelected =
            selected.includes(option.value) &&
            descendants.every(v => selected.includes(v))
        if (allSelected) return "all"
        const anySelected =
            selected.includes(option.value) ||
            descendants.some(v => selected.includes(v))
        return anySelected ? "some" : "none"
    }

    return (
        <div className="flex flex-col gap-2.5">
            <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold ml-1">
                {label}
            </label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        style={{ width: `${width}px` }}
                        className="justify-between bg-zinc-900/40 border-[0.5px] border-zinc-700/60 hover:bg-zinc-800/60 text-zinc-300 rounded-xl h-12 backdrop-blur-md"
                    >
                        <span className="truncate">
                            {selected.length > 0 ? `${selected.length} ${label}` : placeholder}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    style={{ width: `${width}px` }}
                    className="p-0 bg-zinc-900/95 border-zinc-800 backdrop-blur-xl rounded-xl shadow-2xl"
                >
                    <Command className="bg-transparent">
                        <CommandInput
                            placeholder={searchPlaceholder}
                            className="h-11 bg-transparent text-white placeholder:text-zinc-500 border-none focus:ring-0 [&_[cmdk-input-wrapper]_svg]:text-white [&_[cmdk-input-wrapper]_svg]:opacity-100"
                        />
                        <CommandList>
                            <CommandEmpty>{emptyText}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => {
                                    const state = getCheckState(option)
                                    const depth = getDepth(option)
                                    const paddingLeft = 16 + depth * 20 // 16px base + 20px per level
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onSelect={() => {
                                                const descendants = getAllDescendants(option)
                                                if (descendants.length > 0) {
                                                    onToggle([option.value, ...descendants])
                                                } else {
                                                    onToggle(option.value)
                                                }
                                            }}
                                            style={{ paddingLeft: `${paddingLeft}px` }}
                                            className="flex items-center gap-3 py-2.5 pr-4 cursor-pointer"
                                        >
                                            <div
                                                className={cn(
                                                    "w-4 h-4 rounded border border-zinc-700 flex items-center justify-center shrink-0",
                                                    state !== "none" ? "bg-[#FF5229] border-[#FF5229]" : "bg-transparent"
                                                )}
                                            >
                                                {state === "all" && <Check className="h-3 w-3 text-white" />}
                                                {state === "some" && <Minus className="h-3 w-3 text-white" />}
                                            </div>
                                            <span className={cn(
                                                state !== "none" ? "text-white" : "text-zinc-400",
                                                depth === 0 && "font-medium",
                                                depth >= 2 && "text-sm"
                                            )}>
                                                {option.label}
                                            </span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
