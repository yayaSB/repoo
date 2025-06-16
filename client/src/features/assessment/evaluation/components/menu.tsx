import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categories } from "@/constants/mock-evaluations"

interface MenuProps {
  activeTab: string
}

export function Menu({ activeTab }: MenuProps) {
  return (
    <TabsList className="grid grid-cols-6 mb-8 bg-[#F7F9FA] p-0.5 text-[#9D9E9F] ">
      {categories.map((category) => (
        <TabsTrigger
          key={category}
          value={category}
          className={`text-xs sm:text-sm ${activeTab === category ? 'text-[#282829]' : ''}`}
        >
          {category}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
