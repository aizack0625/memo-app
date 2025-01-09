import React, {useState, useEffect} from 'react';
import {Button} from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

type Memo = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

type MemoFormProps = {
  onAddMemo: (title: string, content: string) => void;
  editingMemo: Memo | null;
  onEditMemo: (memo: Memo) => void;
}

const MemoForm: React.FC<MemoFormProps> = ({
  onAddMemo,
  editingMemo,
  onEditMemo
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 編集モード時にフォームに既存データを設定
  useEffect(() => {
    if (editingMemo) {
      setTitle(editingMemo.title);
      setContent(editingMemo.content);
    }
  }, [editingMemo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!title.trim()) return;

    if(editingMemo) {
      onEditMemo({
        ...editingMemo,
        title,
        content
      });
    } else {
      onAddMemo(title, content);
    }

    // フォームリセット
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='メモのタイトル'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='メモの内容'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type='submit' variant="contained" color='primary' endIcon={<AddCircleOutline />}>
        {editingMemo ? '更新' : '追加'}
      </Button>
    </form>
  );
};

export default MemoForm;
