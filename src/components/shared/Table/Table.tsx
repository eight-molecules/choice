import { HTMLAttributes, PropsWithChildren, TdHTMLAttributes, useId } from "react"
import { Id } from "../../../types/Id";

function TableHead<T, U extends Id<T>>({ children, RowElement }: PropsWithChildren<{ 
  data?: Array<U>
  RowElement?: React.JSXElementConstructor<PropsWithChildren>
}> & HTMLAttributes<HTMLTableSectionElement>) {
  if (RowElement !== undefined) {
    return <thead>
      <RowElement />
    </thead>
  }

  return <thead>
    {children}
  </thead>
};

const TableHeaderRow = ({ children, bg = "bg-gray-50 dark:bg-gray-900"  }: PropsWithChildren<{ bg?: string }> & HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr className={bg} children={children} />
  )
}

const TableHeaderCell = ({ children }: PropsWithChildren & HTMLAttributes<HTMLTableCellElement>) => {
  return <TableCell children />
}

function TableBody<T, U extends Id<T>>({ children, data, RowElement }: PropsWithChildren<{ 
  data?: Array<U>
  RowElement?: React.JSXElementConstructor<PropsWithChildren<{ datum: U }>>
}> & HTMLAttributes<HTMLTableSectionElement>) {
  const id = useId();
  
  if (Array.isArray(data) && RowElement !== undefined) {
    return <tbody>
      {data.map((datum) => <RowElement key={`${id}${datum.id}`} datum={datum} />)} 
    </tbody>
  }

  return <tbody>
    {children}
  </tbody>
};


const TableRow = ({ children, className = '', bg = 'bg-gray-100 even:bg-gray-200 dark:bg-gray-950 even:dark:bg-gray-900' }: PropsWithChildren<{ bg?: string }> & HTMLAttributes<HTMLTableRowElement>) => {
  return <tr className={`${bg} ${className}`}>
    {children}
  </tr>
}

const TableCell = ({ children, className = '', width = '', wrap = false, colSpan }: PropsWithChildren<{ width?: string | number, wrap?: boolean }> & TdHTMLAttributes<HTMLTableCellElement>) => {

  return (
    <td colSpan={colSpan} width={`${width}`} className={`${wrap ? '' : 'text-nowrap'} px-3 py-2 ${className}`}>
      {children}
    </td>
  )
}

const Table = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table-fixed ${className}`}>
        {children}
      </table>
    </div>
  )
}

TableHead.Row = TableHeaderRow;
TableBody.Row = TableRow;

Table.Head = TableHead; 
Table.Body = TableBody;

// Convenience Mappings for export
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;