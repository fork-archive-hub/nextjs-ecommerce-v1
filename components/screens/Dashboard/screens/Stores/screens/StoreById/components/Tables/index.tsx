import { useSharedMainState } from '@components/layouts/Main/context';
import { flexRender, Table } from '@tanstack/react-table';
import { TCreateColumnHelper } from '../utils';

interface IProps {
	table: Table<TCreateColumnHelper>;
}

const Table = ({ table }: IProps) => {
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();

	return (
		<table
			className='border border-solid border-collapse'
			style={
				{
					/*borderColor: currentBgColorMode, color: currentFontColorMode*/
				}
			}
		>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr
						key={headerGroup.id}
						className='hover:bg-zinc-200 dark:hover:bg-zinc-800'
					>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								className='border border-solid p-2 text-center'
								style={{
									backgroundColor: currentBgColorMode,
									color: currentFontColorMode,
									borderColor: currentBgColorMode,
								}}
							>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr
						key={row.id}
						className='hover:bg-zinc-200 dark:hover:bg-zinc-800 odd:bg-neutral-100 dark:odd:bg-neutral-900'
					>
						{row.getVisibleCells().map((cell) => (
							<td
								key={cell.id}
								className='border border-solid p-2 text-center'
								style={{ borderColor: currentBgColorMode }}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
			{/* <tfoot>
  {table.getFooterGroups().map(footerGroup => (
    <tr key={footerGroup.id}>
      {footerGroup.headers.map(header => (
        <th key={header.id}>
          {header.isPlaceholder
            ? null
            : flexRender(
                header.column.columnDef.footer,
                header.getContext()
              )}
        </th>
      ))}
    </tr>
  ))}
</tfoot> */}
		</table>
	);
};

export default Table;
