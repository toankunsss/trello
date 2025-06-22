export const capitalizeFirstLetter = (string) => {
  if ( !string ) return ''
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}

export const generatePlaceholderCard = (column) => {
  return {
    _id: 'placeholder',
    boardId: column.boardId,
    columnId: column._id,
    FE_Placeholder: true
  }
}