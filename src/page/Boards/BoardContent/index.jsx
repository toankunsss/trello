import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/contants/sort'
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  const [activeDraggedItem, setactiveDraggedItem] = useState(null)
  const [activeDraggedType, setactiveDraggedType] = useState(null)
  const [activeDraggedData, setactiveDraggedData] = useState(null)


  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (event) => {
    console.log('event: ', event)
    setactiveDraggedItem(event?.active?.id)
    setactiveDraggedType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDraggedData(event?.active?.data?.current)
  }


  console.log('activeDraggedType', activeDraggedType )
  console.log('activeDraggedItem', activeDraggedItem )
  console.log('activeDraggedData', activeDraggedData )
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id)
      const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)
      const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex)

      setOrderedColumnsState(dndOrderedColumns)
    }
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} onDragStart={handleDragStart}>
      <Box sx={{
        height: (theme) => theme.trello.boardContentHeight,
        width: '100%',
        display: 'flex',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumnsState} />
        <DragOverlay dropAnimation={dropAnimation}>
          {activeDraggedType && null}
          {(activeDraggedType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDraggedData} /> }
          {(activeDraggedType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDraggedData} /> }


        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent