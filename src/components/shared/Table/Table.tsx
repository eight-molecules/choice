import { HTMLAttributes, PropsWithChildren, useId } from "react"
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

const TableHeaderRow = ({ children }: PropsWithChildren & HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr className="bg-gray-50 dark:bg-gray-900" children={children} />
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


const TableRow = ({ children, className }: PropsWithChildren & HTMLAttributes<HTMLTableRowElement>) => {
  return <tr className="bg-gray-100 even:bg-gray-200 dark:bg-gray-950 even:dark:bg-gray-900">
    {children}
  </tr>
}

const TableCell = ({ children, className, width = '', wrap = false }: PropsWithChildren<{ width?: string | number, wrap?: boolean }> & HTMLAttributes<HTMLTableElement>) => {

  return (
    <td width={`${width}`} className={`${wrap ? '' : 'text-nowrap'} px-3 py-2 ${className}`}>
      {children}
    </td>
  )
}

const Table = ({ children }: PropsWithChildren) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed">
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