import * as React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

interface EditProps {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonEditör: React.FC<EditProps> = ({ edit, setEdit }) => {
  function handleEditableChange() {
    setEdit(!edit);
  }
  const sx = {
    padding: '4px 20px',
    position: 'initial',
    display: 'inline-table',
    margin: '40px'
  };

  return (
    <Button
      sx={sx}
      variant="contained"
      size="large"
      onClick={handleEditableChange}
      endIcon={<EditIcon />}>
      EDIT
    </Button>
  );
};
export default ButtonEditör;
