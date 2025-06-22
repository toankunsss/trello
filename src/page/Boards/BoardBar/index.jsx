import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/contants/formatter'

const MENU = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  padding: '5px',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  },
  '& .MuiChip-label': {
    color: 'white'
  }
}
function BoardBar({ board }) {
  return (
    <Box px={2} sx={{
      height: (theme) => theme.trello.BoardBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#2980b9')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 } }>
        <Chip
          sx={MENU}
          icon={<DashboardIcon /> }
          label={board?.title}
          clickable />
        <Chip
          sx={MENU}
          icon={<VpnLockIcon /> }
          label={capitalizeFirstLetter(board?.type)}
          clickable />
        <Chip
          sx={MENU}
          icon={<AddToDriveIcon /> }
          label="Add to drive"
          clickable />
        <Chip
          sx={MENU}
          icon={<FilterListIcon /> }
          label="Filler project"
          clickable />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'transparent' // hoặc màu khác
            },
            '& .MuiSvgIcon-root': {
              color: 'white'
            }
          }}
        >
  Invite
        </Button>

        <AvatarGroup total={20} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 14, border: 'none', color: 'white' } }}>
          <Tooltip title='vantoan'>
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
          <Tooltip title='vantoan'>
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
          <Tooltip title='vantoan'>
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
          <Tooltip title='vantoan'>
            <Avatar alt="Remy Sharp" src="" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar