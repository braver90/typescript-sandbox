const createBoard = () => {
  const mainDiv = document.getElementById('app');
  const board = document.createElement('div');
  const innerBoard = document.createElement('p');
  board.append(innerBoard);
  mainDiv.append(board);

  const write = (text: string) => {
    if (innerBoard.children.length > 0) {
      const newLine = document.createElement('br');
      innerBoard.append(newLine);
    }
    const span = document.createElement('span');
    span.innerHTML = text;
    innerBoard.append(span);
  };
  return { write };
};

export default createBoard;
