export interface IHeader {
  text?: string;
  value?: string;
  align?: string;
  rowStyles?: string;
  rowCallback?: () => void;
  sortable?: boolean;
  width?: number;
}


export interface DataTableProps {
  headers: IHeader[];
  dataSource: any[];
  setDataSource?: any;
  showFilterIcon?: boolean;
}