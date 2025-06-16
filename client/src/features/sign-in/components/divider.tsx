import { Separator } from "@/components/ui/separator"

export default function Divider() {
  return (
    <div className="flex items-center lg:w-[508px] mx-auto gap-4 ">
      <Separator className="h-[2px] bg-gray-300 flex-1" />
      <span className="text-[#4C4D4D] text-[16px]">Ou</span>
      <Separator className="h-[2px] bg-gray-300 flex-1" />
    </div>
  )
}
