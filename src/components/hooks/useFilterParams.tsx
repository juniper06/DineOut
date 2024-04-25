import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useFilterParams(paramName: string) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const handleFilterChange = (value: string) => {
    if (value === "All") {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return { defaultValue: params.get(paramName) || "All", handleFilterChange };
}