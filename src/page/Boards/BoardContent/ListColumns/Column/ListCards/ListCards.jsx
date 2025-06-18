import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


function ListCards({ cards }) {
  return (
    <SortableContext items={cards.map(card => card._id)} strategy={verticalListSortingStrategy}>

      <Box sx={{
        p: '0 5px',
        m: '0 5px',
        gap: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.ColumnHeaderHeight} - ${theme.trello.ColumnFooterHeight})`,
        '*::-webkit-scrollbar': {
          backgroundColor: '#ced0da'
        },
        '*::-webkit-scrollbar:hover': {
          backgroundColor: '#bfc2cf'
        }
      }}>
        {cards?.map((card) => {
          return (<Card key={card._id} card = {card} />)
        })}
      </Box>
    </SortableContext>
  )
}

export default ListCards
