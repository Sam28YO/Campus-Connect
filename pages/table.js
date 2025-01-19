import { useTable } from 'react-table';

const data = [
  { name: 'John', age: 28, country: 'USA' },
  { name: 'Sara', age: 22, country: 'UK' },
  { name: 'Mike', age: 32, country: 'Canada' },
];

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Age', accessor: 'age' },
  { Header: 'Country', accessor: 'country' },
];

function MyTable() {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="min-w-full table-auto border-collapse">
  <thead className="bg-gray-200">
    {headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
        {headerGroup.headers.map(column => (
          <th {...column.getHeaderProps()} className="px-6 py-3 text-sm font-medium text-gray-700">{column.render('Header')}</th>
        ))}
      </tr>
    ))}
  </thead>
  <tbody {...getTableBodyProps()}>
    {rows.map(row => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()} className="border-b ">
          {row.cells.map(cell => {
            return <td {...cell.getCellProps()} className="px-6 py-4 text-sm text-gray-800">{cell.render('Cell')}</td>;
          })}
        </tr>
      );
    })}
  </tbody>
</table>

  );
}

export default MyTable;
