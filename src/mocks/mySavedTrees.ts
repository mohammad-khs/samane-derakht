export interface FavoriteType {
  avg: number | null;
  breif_description: string;
  count: number;
  id: string;
  scan_numbers: number;
  time_irani: string;
  tree_name: string;
}

export const mockMySavedTrees: FavoriteType[] = [
  {
    id: "tree-1",
    avg: 4.5,
    breif_description: "درخت گردوی زیبا در باغ تاريخي اصفهان",
    count: 12,
    scan_numbers: 45,
    time_irani: "1404/03/10",
    tree_name: "گردو",
  },
  {
    id: "tree-2",
    avg: 4.8,
    breif_description: "درخت سرو افتخاری در شیراز",
    count: 8,
    scan_numbers: 32,
    time_irani: "1404/02/20",
    tree_name: "سرو",
  },
  {
    id: "tree-3",
    avg: 4.2,
    breif_description: "درخت نخل در پارک ملت تهران",
    count: 15,
    scan_numbers: 67,
    time_irani: "1404/01/05",
    tree_name: "نخل",
  },
];