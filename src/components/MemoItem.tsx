import React from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from "@mui/icons-material/Edit";


type Memo = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

type MemoItemProps = {
  memo: Memo;
  onDelete: (id: number) => void;
  onEdit: (memo: Memo) => void;
};

const MemoItem: React.FC<MemoItemProps> = ({
  memo,
  onDelete,
  onEdit
}) => {
  return (
    <div className="memoItem">
      <h3>{memo.title}</h3>
      <p>{memo.content}</p>
      <small>{memo.createdAt.toLocaleString()}</small>
        <Button
          onClick={() => onEdit(memo)}
          variant="contained"
          startIcon={<Edit />}
        >
          編集
        </Button>
        <Button
          onClick={() => onDelete(memo.id)}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          削除
        </Button>
    </div>
  );
};

export default MemoItem;
