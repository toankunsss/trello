import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'


function ListColumns({ columns }) {
  return (
    <SortableContext items={columns.map(column => column._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Box column */}
        {columns?.map((column) => {
          return (<Column key={column._id} column = {column} />)
        })}
        <Box sx={{ backgroundColor: '#ffffff3d', minWidth: '200px', maxWidth: '200px', height: 'fit-content', borderRadius: '6px', mx: 2 }}>
          <Button startIcon={<PostAddIcon/>}>Add to column</Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
