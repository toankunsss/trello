import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      background: 'primary.dark',
      height: (theme) => `calc(100vh - ${theme.trello.BoardBarHeight} - ${theme.trello.AppBarHeight})`,
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
      board content
    </Box>
  )
}

export default BoardContent