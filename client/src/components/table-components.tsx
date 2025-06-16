"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CalendarIcon, ChevronDown, Eye, FileDown, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight, Search, MoreVertical, ChevronUp, Upload, Play, RefreshCw , SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast, Toaster } from "sonner";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical as MoreVerticalIcon } from "lucide-react";

const iconMap: Record<string, any> = {
  Eye,
  FileDown,
  Upload,
  SquarePen
};

export interface TableColumn<T> {
  key: keyof T | 'actions';
  label: string;
}

interface Action {
  label: string;
  icon: string;
  className?: string;
  onClick?: () => void;
}

interface EvaluatorActions<T> {
  onStart?: (row: T) => void;
  onContinue?: (row: T) => void;
  onView?: (row: T) => void;
}

interface TableComponentProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onActionClick?: (actionType: string) => void;
  title?: string;
  role?: "creator" | "evaluator";
  evaluatorActions?: EvaluatorActions<T>;
}

export function TableComponent<T extends { checked: boolean; name?: string; date?: string; actions?: Action[]; status?: string }>({
  columns,
  data,
  onActionClick,
  title = "Historique des évaluations",
  role = "creator",
  evaluatorActions
}: TableComponentProps<T>) {
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [dateFilterActive, setDateFilterActive] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 15), // 15 jan 2025
    to: new Date(2025, 1, 20),   // 20 fev 2025
  });
  const [tableData, setTableData] = useState(
    data.map(item => ({ ...item, checked: item.checked ?? false }))
  );
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });

  useEffect(() => {
    setTableData(data.map(item => ({ ...item, checked: item.checked ?? false })));
  }, [data]);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setTableData(prevData =>
      prevData.map(row => ({
        ...row,
        checked: checked
      }))
    );
  };

  const handleSelectOne = (index: number, checked: boolean) => {
    setTableData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], checked };

      // Update selectAll state based on whether all visible items are checked
      const allChecked = newData.every(item => item.checked);
      setSelectAll(allChecked);

      return newData;
    });
  };

  const filteredData = tableData.filter((item) => {
    const matchSearch = search
      ? (item.name?.toLowerCase().includes(search.toLowerCase()) ||
        (item as any).evaluator?.toLowerCase().includes(search.toLowerCase()))
      : true;

    const matchDate = () => {
      if (!dateFilterActive || !date?.from || !item.date) return true;

      // Parse the date string in format "15 jan 2025"
      const parseDateString = (dateStr: string) => {
        try {
          const [day, monthStr, year] = dateStr.toLowerCase().split(' ');
          const monthMap: { [key: string]: number } = {
            'jan': 0, 'fev': 1, 'mar': 2, 'avr': 3, 'mai': 4, 'juin': 5,
            'juil': 6, 'aou': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11,
            // Variants with accents
            'fév': 1, 'août': 7, 'déc': 11
          };
          const monthNum = monthMap[monthStr];
          if (monthNum === undefined) return new Date(0); // Invalid date
          return new Date(parseInt(year), monthNum, parseInt(day));
        } catch (e) {
          return new Date(0); // Invalid date
        }
      };

      const itemDate = parseDateString(item.date);
      if (date.to) {
        return itemDate >= date.from && itemDate <= date.to;
      }
      return format(itemDate, "yyyy-MM-dd") === format(date.from, "yyyy-MM-dd");
    };

    return matchSearch && matchDate();
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const renderScore = (value: number) => (
    <div className="flex items-center gap-2">
      <div className="relative w-32 h-[6px] bg-[#E5E2FE] rounded-full overflow-visible">
        <div
          className={`absolute top-[-1px] h-[8px] rounded-full transition-all duration-300 ${value < 50
            ? "bg-gradient-to-r from-[#ff7b1d] to-[#e66f1a]"
            : "bg-gradient-to-r from-[#1c5df3] to-[#5e8df7]"
            }`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="text-sm">{value}%</span>
    </div>
  );

  const renderEvolution = (value: number) => (
    <div className="flex items-center text-base">
      <div className="w-6 h-6">
        <img
          src={value >= 0 ? "/icons/Evolution-high.svg" : "/icons/Evolution-down.svg"}
          alt={value >= 0 ? "Évolution positive" : "Évolution négative"}
          className="object-contain w-full h-full"
        />
      </div>
      <span className="ml-1 text-black">{value > 0 ? `+${value}%` : `${value}%`}</span>
    </div>
  );

  const renderStatus = (value: string) => {
    const statusStyles = {
      "En attente": {
        container: "bg-blue-50 text-blue-500",
        icon: "/icons/blue.svg",
        alt: "En attente",
      },
      "En retard": {
        container: "bg-[#FFF2E8] text-[#E66F1A]",
        icon: "/icons/clock.svg",
        alt: "En retard",
      },
      "Terminé": {
        container: "bg-[#E7FAF1] text-[#0B9855]",
        icon: "/icons/check.svg",
        alt: "Terminé",
      },
      "À revoir": {
        container: "bg-blue-50 text-blue-500",
        icon: "/icons/blue.svg",
        alt: "À revoir",
      },
      "En cours": {
        container: "bg-[#FFF2E8] text-[#E66F1A]",
        icon: "/icons/clock.svg",
        alt: "En cours",
      },
      "Passé": {
        container: "bg-[#E7FAF1] text-[#0B9855]",
        icon: "/icons/check.svg",
        alt: "Passé",
      },
    };

    const style = statusStyles[value as keyof typeof statusStyles] || statusStyles["En attente"];

    return (
      <span
        className={`inline-flex items-center w-[118px] h-[35px] rounded-full ${style.container} px-2 py-1 text-body-2 font-medium gap-x-2`}
      >
        <img src={style.icon} alt={style.alt} className="w-4 h-4" />
        <span className="truncate">{value}</span>
      </span>
    );
  };

  const renderStatut = (value: string) => {
    const badgeClass = "inline-flex items-center px-4 py-1 rounded-full font-medium text-body min-w-[120px] h-[35px]";
    const iconClass = "w-3 h-3 flex items-center justify-center rounded-full mr-2";
    if (value === "actif") {
      return (
        <span className={`${badgeClass} bg-[#E8EFFE] text-blue-500`}>
          <span className={`${iconClass} bg-blue-500`}></span>
          Actif
        </span>
      );
    }
    if (value === "inactif") {
      return (
        <span className={`${badgeClass} bg-gray-50 text-sky-800`}>
          <span className={`${iconClass} bg-sky-700`}></span>
          Inactif
        </span>
      );
    }
    if (value === "en pause") {
      return (
        <span className={`${badgeClass} bg-[#FFF2E8] text-[#FF7B1D]`}>
          <span className={`${iconClass} bg-transparent`}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="9" fill="#F97316"/>
              <rect x="5" y="5" width="2" height="8" rx="1" fill="white"/>
              <rect x="11" y="5" width="2" height="8" rx="1" fill="white"/>
            </svg>
          </span>
          En pause
        </span>
      );
    }
    return null;
  };

  const renderCell = (item: T, column: TableColumn<T>): React.ReactNode => {
    const renderStatut = (value: string) => {
      const badgeClass = "inline-flex items-center px-4 py-1 rounded-full font-medium text-body min-w-[120px] h-[35px]";
      const iconClass = "w-3 h-3 flex items-center justify-center rounded-full mr-2";
      if (value === "actif") {
        return (
          <span className={`${badgeClass} bg-[#E8EFFE] text-blue-500`}>
            <span className={`${iconClass} bg-blue-500`}></span>
            Actif
          </span>
        );
      }
      if (value === "inactif") {
        return (
          <span className={`${badgeClass} bg-gray-50 text-sky-800`}>
            <span className={`${iconClass} bg-sky-700`}></span>
            Inactif
          </span>
        );
      }
      if (value === "en pause") {
        return (
          <span className={`${badgeClass} bg-[#FFF2E8] text-[#FF7B1D]`}>
            <span className={`${iconClass} bg-transparent`}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="#F97316"/>
                <rect x="5" y="5" width="2" height="8" rx="1" fill="white"/>
                <rect x="11" y="5" width="2" height="8" rx="1" fill="white"/>
              </svg>
            </span>
            En pause
          </span>
        );
      }
      return null;
    };

    if (column.key === 'checked') {
      return (
        <Checkbox
          checked={!!(item as any).checked}
          onCheckedChange={(checked) => handleSelectOne(tableData.indexOf(item), !!checked)}
        />
      );
    }

    const value = item[column.key];

    switch (column.key) {
      case 'score':
        return renderScore(value as number);
      case 'evolution':
        return renderEvolution(value as number);
      case 'status':
        return renderStatus(value as string);
      case 'statut':
        return renderStatut(value as string);
      case 'date':
        return <span className="text-base">{String(value)}</span>;
      case 'evaluator':
        return <span className="text-base">{String(value)}</span>;
      case 'name':
        return <span className="text-base">{String(value)}</span>;
      case 'actions':
        if (role === "evaluator") {
          switch (item.status) {
            case "À revoir":
              return (
                <Button variant="default" className="bg-[#2563eb] text-white w-[134px] h-10 justify-center"
                  onClick={typeof evaluatorActions?.onStart === 'function' ? () => evaluatorActions?.onStart?.(item) : undefined}
                  disabled={typeof evaluatorActions?.onStart !== 'function'}
                >
                  <Play className="mr-2 w-4 h-4" /> Commencer
                </Button>
              );
            case "En cours":
              return (
                <Button variant="outline" className="border-[#2563eb] text-[#2563eb] w-[134px] h-10 justify-center"
                  onClick={typeof evaluatorActions?.onContinue === 'function' ? () => evaluatorActions?.onContinue?.(item) : undefined}
                  disabled={typeof evaluatorActions?.onContinue !== 'function'}
                >
                  <RefreshCw className="mr-2 w-4 h-4" /> Continuer
                </Button>
              );
            case "Passé":
              return (
                <Button variant="outline" className="border-[#ADAEAF] text-[#222] w-[134px] h-10 justify-center"
                  onClick={typeof evaluatorActions?.onView === 'function' ? () => evaluatorActions?.onView?.(item) : undefined}
                  disabled={typeof evaluatorActions?.onView !== 'function'}
                >
                  <Eye className="mr-2 w-4 h-4" /> Consulter
                </Button>
              );
            default:
              return null;
          }
        } else {
          const actions = item.actions || [];
          const menuActions = (item as any).menuActions || [];
          return (
            <div className={`flex gap-2 ${actions.length === 1 ? 'justify-center' : 'justify-end'}`}>
              {actions.map((action, index) => {
                const Icon = action.icon === "FileDown" ? Upload : (iconMap[action.icon] || '');
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={`h-10 text-sm ${actions.length === 1 ? 'w-[134px]' : 'w-[110px]'} ${action.className}`}
                    onClick={action.onClick}
                  >
                    {Icon !== '' && <Icon className="h-4 w-4 mr-1" />}
                    {action.label}
                  </Button>
                );
              })}
              {menuActions.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-8 h-8 flex items-center justify-center text-muted-foreground data-[state=open]:bg-muted"
                      size="icon"
                    >
                      <MoreVerticalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    {menuActions.map((action: any, idx: number) => (
                      <DropdownMenuItem key={idx} onClick={action.onClick}>
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          );
        }
      default:
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
          return <>{String(value)}</>;
        }
        return null;
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';

    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue == null) return direction === 'asc' ? 1 : -1;
      if (bValue == null) return direction === 'asc' ? -1 : 1;

      // Sort for each column type
      switch (key) {
        case 'score':
        case 'evolution':
          // Simple numerical sorting for score and evolution
          return direction === 'asc'
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);

        case 'name':
        case 'evaluator':
        case 'statut':
        case 'status':
          // Simple alphabetical sorting
          return direction === 'asc'
            ? String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase())
            : String(bValue).toLowerCase().localeCompare(String(aValue).toLowerCase());

        case 'date':
          // Sort dates in the format "dd MMM yyyy" (e.g. "15 Jan 2025")
          const parseDateString = (dateStr: string) => {
            try {
              const [day, monthStr, year] = String(dateStr).toLowerCase().split(' ');
              const monthMap: { [key: string]: number } = {
                'jan': 0, 'fev': 1, 'mar': 2, 'avr': 3, 'mai': 4, 'juin': 5,
                'juil': 6, 'aou': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11,
                // Adding variants with accents
                'fév': 1, 'août': 7, 'déc': 11
              };
              const monthNum = monthMap[monthStr];
              if (monthNum === undefined) return 0;
              return new Date(parseInt(year), monthNum, parseInt(day)).getTime();
            } catch (e) {
              return 0;
            }
          };

          const aTime = parseDateString(String(aValue));
          const bTime = parseDateString(String(bValue));
          return direction === 'asc' ? aTime - bTime : bTime - aTime;

        default:
          // Default sorting
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return direction === 'asc' ? aValue - bValue : bValue - aValue;
          }
          // Alphabetical sorting by default for other types
          return direction === 'asc'
            ? String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase())
            : String(bValue).toLowerCase().localeCompare(String(aValue).toLowerCase());
      }
    });

    setTableData(sortedData);
  };

  return (
    <>
      <Toaster />
      <div className="overflow-x-auto max-w-[1550px] m-auto bg-white border-none rounded-xl shadow-[0_3px_5px_rgba(0,0,0,0.1)]">
        {/* Header filter and title in the same block */}
        <div className="flex items-center justify-between p-4 border-[#e2e4e9]">
          <h2 className="font-semibold text-[#000929] text-lg">{title}</h2>
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9d9e9f]" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-md border border-[#e2e4e9] focus:outline-none focus:ring-1 focus:ring-[#1c5df3] text-sm"
              />
            </div>
            {/* Date Range Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "d MMM yyyy", { locale: fr })}, {" "}
                        {format(date.to, "d MMM yyyy", { locale: fr })}
                      </>
                    ) : (
                      format(date.from, "d MMM yyyy", { locale: fr })
                    )
                  ) : (
                    <span>Sélectionner une période</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setDateFilterActive(!!newDate);
                  }}
                  numberOfMonths={2}
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
            {/* More options */}
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreVertical className="w-6 h-6 text-sky-900"  />
            </Button>
          </div>
        </div>
        {/* Table */}
        <div className="px-3">
          <Table className="min-w-full table-auto">
            <TableHeader className="bg-white border-b border-[#e2e4e9]">
              <TableRow>
                {columns.map((col, index) => (
                  <TableHead
                    key={index}
                    className={`${col.key === "actions" ? "text-right w-[1%] p-4"
                      : col.key === "checked" ? "pl-2 pr-0"
                        : col.key === "name" ? "pl-2 pr-4 w-[250px] truncate"
                          : col.key === "date" ? "p-4 w-[200px] truncate"
                            : col.key === "evaluator" ? "p-4 w-[200px] truncate"
                              : "p-4"
                      } text-[#9d9e9f] font-normal whitespace-nowrap text-[13px]`}
                  >
                    <div className="flex items-center gap-2">
                      {col.key === "checked" ? (
                        <Checkbox
                          checked={selectAll}
                          onCheckedChange={handleSelectAll}
                        />
                      ) : (
                        <>
                          <span>{col.label}</span>
                          {col.key !== "actions" && (
                            <div className="flex flex-col">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-3 w-3 p-0 hover:bg-transparent ${sortConfig.key === col.key && sortConfig.direction === 'asc'
                                  ? 'text-primary'
                                  : 'text-[#9d9e9f]'
                                  }`}
                                onClick={() => handleSort(col.key as keyof T)}
                              >
                                <ChevronUp className="h-3 w-3 mb-[-3px]" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-3 w-3 p-0 hover:bg-transparent ${sortConfig.key === col.key && sortConfig.direction === 'desc'
                                  ? 'text-primary'
                                  : 'text-[#9d9e9f]'
                                  }`}
                                onClick={() => handleSort(col.key as keyof T)}
                              >
                                <ChevronDown className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            {tableData.length > 0 ? (
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-[#f9fafb]">
                      {columns.map((col, colIndex) => (
                        <TableCell
                          key={colIndex}
                          className={`${col.key === "actions" ? "p-2 text-right align-middle w-[1%]"
                            : col.key === "checked" ? "pl-2 pr-0"
                              : col.key === "name" ? "pl-2 pr-4 w-[250px] truncate"
                                : col.key === "date" ? "p-4 w-[200px] truncate"
                                  : col.key === "evaluator" ? "p-4 w-[200px] truncate"
                                    : "p-4 whitespace-nowrap"
                            }`}
                        >
                          {renderCell(row, col)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-10 text-[#9d9e9f]">
                      Aucune donnée trouvée
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={columns.length} className="text-center py-10 text-[#9d9e9f]">
                    Aucune donnée à afficher
                  </td>
                </tr>
              </tbody>
            )}
          </Table>

          {/* Pagination */}
          {tableData.length > 0 && (
            <div className="flex flex-wrap items-center justify-between p-4 text-[16px] text-[#737475] border-t border-[#e2e4e9]">
              <div>Page {currentPage} of {totalPages}</div>
              <div className="flex items-center gap-1 mx-auto">
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {pages.slice(0, 5).map((page) => (
                  <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" className={`h-8 w-8 text-[#737475] border-[#dee0e1] ${page === currentPage ? "border border-[#DEE0E1] bg-[#F6F8FA] text-black" : ""}`} onClick={() => setCurrentPage(page)}>
                    {page}
                  </Button>
                ))}
                {totalPages > 5 && (
                  <>
                    <Button variant="outline" size="sm" className="h-8 w-8 border-[#dee0e1]">...</Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 text-[#737475] border-[#dee0e1]" onClick={() => setCurrentPage(totalPages)}>
                      {totalPages}
                    </Button>
                  </>
                )}
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
              <Select
                defaultValue={`${rowsPerPage}`}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="relative w-[120px] border-[#E2E4E9] rounded-md text-black text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5" className="text-base text-black">5 / page</SelectItem>
                  <SelectItem value="10" className="text-base text-black">10 / page</SelectItem>
                  <SelectItem value="20" className="text-base text-black">20 / page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
