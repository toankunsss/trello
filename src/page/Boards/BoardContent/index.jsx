import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/contants/sort'
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, rectIntersection, getFirstCollision, closestCenter } from '@dnd-kit/core'
import { useEffect, useState, useCallback, useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

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
  const [oldColumnData, setOldColumnData] = useState(null)
  const lastOverId = useRef(null)


  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumCardId = (cardId) => {
    return orderedColumnsState.find(column => column.cards.map( card => card._id)?.includes(cardId))
  }

  const moveCardBetweenColumns = (overColumn,
    overCardId,
    active, over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumnsState(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOVerItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOVerItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length +1

      const nextColums = cloneDeep(prevColumns)
      const nextActiveColumn = nextColums.find(c => c._id === activeColumn._id)
      const nextOverColumn = nextColums.find(c => c._id === overColumn._id)

      // remove card from activeColumn
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)

        if (isEmpty(nextActiveColumn.cards)) {
          console.log('card cuối cùng bị kéo đi')
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn._id)]
        }
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      console.log('nextColums', nextColums)
      return nextColums
    })
  }

  const handleDragStart = (event) => {
    setactiveDraggedItem(event?.active?.id)
    setactiveDraggedType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDraggedData(event?.active?.data?.current)

    // chi khi keo card moi thuc hien set gia tri cho oldColumn
    if (event?.active?.data?.current?.columnId) {
      // card
      const column = findColumCardId(event?.active?.id)
      setOldColumnData(column)
    }
  }

  // trigger trong qua trinh keo/
  const handleDragOver = (event) => {

    if (activeDraggedType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // card

    const { active, over } = event

    if (!active || !over) return

    // activeDraggingCard la card dang keo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    // tim 2 column dua theo cardId
    const activeColumn = findColumCardId(activeDraggingCardId)
    const overColumn = findColumCardId(overCardId)

    if (!activeColumn || !overColumn ) return

    if (activeColumn._id !== overColumn._id) {
      // keo tha 2 column
      moveCardBetweenColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (activeDraggedType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard la card dang keo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      // tim 2 column dua theo cardId
      const activeColumn = findColumCardId(activeDraggingCardId)
      const overColumn = findColumCardId(overCardId)

      if (!activeColumn || !overColumn ) return
      if (oldColumnData._id !== overColumn._id) {
        // keo tha 2 column
        moveCardBetweenColumns(overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        const oldColumnIndex = oldColumnData?.cards.findIndex(c => c._id === activeDraggedItem)
        const newCardIndex = overColumn?.cards.findIndex(c => c._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnData?.cards, oldColumnIndex, newCardIndex)
        setOrderedColumnsState(prevColumns => {
          const nextColums = cloneDeep(prevColumns)
          const targetColumn = nextColums.find(c => c._id === oldColumnData._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColums

        })

      }

      if (activeDraggedType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        if (active.id !== over.id) {
          const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id)
          const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)
          const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex)
          setOrderedColumnsState(dndOrderedColumns)
        }
      }

      setactiveDraggedItem(null)
      setactiveDraggedType(null)
      setactiveDraggedData(null)
      setOldColumnData(null)
    }
  }

  const collisionDetectionStrategy = useCallback( (args) => {
    if (activeDraggedType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // tim cac diem giao nhau giua cac item dang keo
    const poiterIntersection = pointerWithin(args)

    if (!poiterIntersection?.length) return
    // const intersections = poiterIntersection?.length ? poiterIntersection : rectIntersection(args)
    let overId = getFirstCollision(poiterIntersection, 'id')

    if (overId) {
      const checkColumn = orderedColumnsState.find(c => c._id === overId)

      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(c => {
            return (c.id !== overId) && (checkColumn?.cardOrderIds?.includes(c.id))
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDraggedType, orderedColumnsState] )

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      collisionDetection={collisionDetectionStrategy}
      // collisionDetection={closestCorners}
    >
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