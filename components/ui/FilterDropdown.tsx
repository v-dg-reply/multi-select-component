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

    // "all"  = selected / all children selected
    // "some" = some children selected (indeterminate → dash)
    // "none" = not selected
    const getCheckState = (option: FilterOption): "none" | "some" | "all" => {
        const children = options.filter(o => o.parentValue === option.value)
        if (children.length === 0) {
            return selected.includes(option.value) ? "all" : "none"
        }
        const selectedChildren = children.filter(c => selected.includes(c.value))
        if (selectedChildren.length === 0 && !selected.includes(option.value)) return "none"
        if (selectedChildren.length === children.length && selected.includes(option.value)) return "all"
        return "some"
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
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onSelect={() => {
                                                const children = options
                                                    .filter(o => o.parentValue === option.value)
                                                    .map(o => o.value)
                                                if (children.length > 0) {
                                                    onToggle([option.value, ...children])
                                                } else {
                                                    onToggle(option.value)
                                                }
                                            }}
                                            className={cn(
                                                "flex items-center gap-3 py-3 px-4 cursor-pointer",
                                                option.isSubItem && "pl-8"
                                            )}
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
                                            <span className={state !== "none" ? "text-white" : "text-zinc-400"}>
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
