import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '~/assets/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Template from './Menus/Template'
import Starred from './Menus/Starred'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Tooltip } from '@mui/material'
import Profile from './Menus/profile'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'


function AppBar() {
  return (
    <Box sx={{
      height: (theme) => theme.trello.AppBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowY: 'hidden',
      overflowX: 'auto',
      paddingX: 2,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#0984e3')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'white' }} />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
            Trello
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Template />
          </Box>
          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none' }
            }}
            variant='outlined'
            endIcon={<AddToPhotosIcon/>}
          >
            CREATE
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 } }>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          size="small"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white'}} />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: '120px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            },
            '& .MuiInputLabel-root': {
              color: 'white'
            },
            '& label.Mui-focused': {
              color: 'white'
            },
            input: {
              color: 'white'
            }
          }}
        />
        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar