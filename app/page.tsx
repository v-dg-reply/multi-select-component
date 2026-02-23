"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { FilterDropdown } from "@/components/ui/FilterDropdown"
import { useMultiSelect } from "@/hooks/useMultiSelect"
import { SOURCES, SECTORS } from "@/lib/data"

export default function Home() {
  const sources = useMultiSelect()
  const sectors = useMultiSelect()

  return (
    <main className="dark min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF5229]/30">

      {/* Navigation — full viewport width */}
      <div className="flex gap-8 border-b border-zinc-600 px-12 pt-12">
        <span className="text-[11px] font-bold border-b-2 border-white pb-2 px-2 tracking-widest text-white">
          EQUITIES CHAT
        </span>
        <span className="text-[11px] font-bold text-zinc-500 pb-2 px-2 hover:text-zinc-300 transition-colors tracking-widest cursor-pointer">
          MORNING MAIL
        </span>
      </div>

      {/* Content */}
      <div className="px-12 pt-12">

        {/* Filters */}
        <div className="flex gap-6 mb-24">
          <FilterDropdown
            label="Sources"
            placeholder="Select sources..."
            searchPlaceholder="Search sources..."
            emptyText="No source found."
            options={SOURCES}
            selected={sources.selected}
            onToggle={sources.toggle}
            width={280}
          />
          <FilterDropdown
            label="Sectors"
            placeholder="Select sectors..."
            searchPlaceholder="Search sectors..."
            emptyText="No sector found."
            options={SECTORS}
            selected={sectors.selected}
            onToggle={sectors.toggle}
            width={320}
          />
        </div>

        {/* Chat Area */}
        <div className="max-w-3xl mx-auto">
          <div className="relative w-full bg-[#0e0e0e] border border-[#FF5229]/60 rounded-2xl pt-5 pb-14 px-6 shadow-2xl">
            <textarea
              rows={2}
              placeholder="What do you wanna know about .... ?"
              className="bg-transparent border-none outline-none w-full text-zinc-200 placeholder:text-zinc-500 text-base resize-none leading-relaxed"
            />
            <div className="absolute bottom-4 right-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FF5229] p-2 rounded-full"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}