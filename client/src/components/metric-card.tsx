import { Card } from "@/components/ui/card";

type MetricCardValue = number | { value: number; label: string }[];

interface MetricCardProps {
  title: string;
  value: MetricCardValue;
  description?: React.ReactNode;
  icon: React.ReactNode;
  iconBg: string;
  suffix?: string;
}

export function MetricCard({ title, value, description, icon, iconBg, suffix }: MetricCardProps) {
  const isArray = Array.isArray(value);
  const renderValue = (val: number) => (
    <>
      {val}
      {suffix && suffix}
    </>
  );

  return (
    <Card className="h-[155px] w-full p-[24px] bg-white  border-none rounded-xl shadow-[0_3px_5px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-start h-full">
        <div className="flex flex-col justify-between h-full flex-grow">
          <div className="text-[16px] text-[#9D9E9F] font-medium">{title}</div>
          <div className="mt-2 text-[#282829] leading-none">
            {isArray ? (
              <div className="flex gap-4">
                {(value as { value: number; label: string }[]).map((item, index) => (
                  <div key={index} className={index > 0 ? "border-l border-[#dee0e1] pl-4 ml-4" : ""}>
                    <div className="text-[36px] font-semibold text-[#282829]">{renderValue(item.value)}</div>
                    <div className="text-[13px] text-[#ADAEAF]">{item.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[36px] font-semibold text-[#282829]">{renderValue(value as number)}</div>
            )}
          </div>
          {description && <div className="text-[13px] mt-2 text-[#ADAEAF] break-words">{description}</div>}
        </div>
        <div className={`h-[48px] w-[48px] rounded-full flex items-center justify-center ${iconBg} flex-shrink-0 ml-4`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

// ✅ Metric card group with adaptable grid
MetricCard.Group = function MetricCardGroup({ children }: { children: React.ReactNode }) {
  return (
   <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
      {children}
    </div>
  );
};
