// import React, { forwardRef, useCallback, useEffect } from 'react'
// import { useState, useRef, useContext } from 'react'
// import { FixedSizeList, FixedSizeListProps } from 'react-window'
// import { render } from 'react-dom'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@material-ui/core/TableCell'
// import TableContainer from '@material-ui/core/TableContainer'
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
// import AutoSizer from 'react-virtualized-auto-sizer'
// import InfiniteLoader from 'react-window-infinite-loader'
// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles({
//   tableContainer: {
//     overflowX: 'initial',
//   },
// })

// /** Context for cross component communication */
// const VirtualTableContext = React.createContext<{
//   top: number
//   setTop: (top: number) => void
//   header: React.ReactNode
//   footer: React.ReactNode
// }>({
//   top: 0,
//   setTop: (value: number) => {},
//   header: <></>,
//   footer: <></>,
// })

// interface Props
//   extends Omit<FixedSizeListProps, 'children' | 'innerElementType'> {
//   header?: React.ReactNode
//   footer?: React.ReactNode
//   row: FixedSizeListProps['children']
// }
// /** The virtual table. It basically accepts all of the same params as the original FixedSizeList.*/
// const VirtualTable = forwardRef(
//   ({ row, header, footer, ...rest }: Props, ref) => {
//     const listRef = useRef<FixedSizeList | null>()
//     const [top, setTop] = useState(0)

//     const setRefs = useCallback(
//       (node) => {
//         if (typeof ref === 'function') {
//           ref(node)
//         }
//         listRef.current = node
//       },
//       [ref]
//     )

//     return (
//       <VirtualTableContext.Provider value={{ top, setTop, header, footer }}>
//         <FixedSizeList
//           {...rest}
//           innerElementType={Inner}
//           onItemsRendered={(props) => {
//             const style =
//               listRef.current &&
//               // @ts-ignore private method access
//               listRef.current._getItemStyle(props.overscanStartIndex)
//             setTop((style && style.top) || 0)

//             // Call the original callback
//             rest.onItemsRendered && rest.onItemsRendered(props)
//           }}
//           ref={setRefs}
//         >
//           {row}
//         </FixedSizeList>
//       </VirtualTableContext.Provider>
//     )
//   }
// )

// /** The Row component. This should be a table row, and noted that we don't use the style that regular `react-window` examples pass in.*/
// function Row({ index }: { index: number }) {
//   return (
//     <TableRow>
//       {/** Make sure your table rows are the same height as what you passed into the list... */}
//       <TableCell style={{ height: '36px' }}>Row {index}</TableCell>
//       <TableCell>Col 2</TableCell>
//       <TableCell>Col 3</TableCell>
//       <TableCell>Col 4</TableCell>
//     </TableRow>
//   )
// }

// /**
//  * The Inner component of the virtual list. This is the "Magic".
//  * Capture what would have been the top elements position and apply it to the table.
//  * Other than that, render an optional header and footer.
//  **/
// const Inner = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
//   function Inner({ children, ...rest }, ref) {
//     const { header, footer, top } = useContext(VirtualTableContext)
//     const classes = useStyles()
//     return (
//       <TableContainer
//         classes={{ root: classes.tableContainer }}
//         {...rest}
//         ref={ref}
//       >
//         <Table
//           stickyHeader
//           aria-label="sticky table"
//           style={{ top, position: 'absolute', width: '100%' }}
//         >
//           {header}
//           <TableBody>{children}</TableBody>
//           {footer}
//         </Table>
//       </TableContainer>
//     )
//   }
// )

// /**
//  * Render Our Example
//  **/
// render(
//   <TableContainer style={{ height: 'calc(100vh)' }}>
//     <AutoSizer>
//       {({ height, width }: { height: number; width: number }) => (
//         <InfiniteLoader
//           isItemLoaded={() => true}
//           itemCount={5000}
//           loadMoreItems={(startIndex: number, stopIndex: number) => {
//             console.log(`${startIndex} - ${stopIndex}`)
//           }}
//         >
//           {({ onItemsRendered, ref }) => (
//             <VirtualTable
//               ref={ref}
//               height={height}
//               width={width}
//               itemCount={1000}
//               itemSize={36}
//               onItemsRendered={onItemsRendered}
//               header={
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Index</TableCell>
//                     <TableCell>Header 2</TableCell>
//                     <TableCell>Header 3</TableCell>
//                     <TableCell>Header 4</TableCell>
//                   </TableRow>
//                 </TableHead>
//               }
//               row={Row}
//             />
//           )}
//         </InfiniteLoader>
//       )}
//     </AutoSizer>
//   </TableContainer>,
//   document.querySelector('main')
// )
