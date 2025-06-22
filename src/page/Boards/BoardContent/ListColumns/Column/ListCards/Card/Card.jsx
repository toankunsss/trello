import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as CardMui } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupsIcon from '@mui/icons-material/Groups'
import CommentIcon from '@mui/icons-material/Comment'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card( { card } ) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } })

  const dntKitCardStyle = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }


  const shouldShowCartItem = () => {
    return !!card?.memberIds?.length || !!card?.memberIds?.length || !!card?.memberIds?.length
  }

  return (
    <CardMui ref={setNodeRef}
      style={dntKitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        opacity: card.FE_PlaceholderCard ? 0 : 1,
        minHeight: card.FE_PlaceholderCard ? '60px' : 'auto',
        pointerEvents: card.FE_PlaceholderCard ? 'none' : 'auto',
        visibility: card.FE_PlaceholderCard ? 'hidden' : 'visible'
      }}
    >
      { card?.cover &&
        <CardMedia
          sx={{ height: 140 }}
          image={card?.cover}
          title={card?.title}
        />
      }
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>

      {shouldShowCartItem() &&
        <CardActions sx={{ p: '0 4px 0px 0px' }}>
          { !!card?.memberIds?.length &&
            <Button startIcon={ <GroupsIcon /> } size="small">{card?.memberIds?.length}</Button>
          }
          { !!card?.comments?.length &&
            <Button startIcon={ <CommentIcon /> } size="small">{card?.comments?.length}</Button>
          }
          { !!card?.attachments?.length &&
            <Button startIcon={ <AttachFileIcon /> } size="small">{card?.attachments?.length}</Button>
          }
        </CardActions>
      }
    </CardMui>
  )
}

export default Card
