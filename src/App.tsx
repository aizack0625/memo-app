import React, {useState, useEffect} from 'react';
import MemoList from './components/MemoList';
import MemoForm from './components/MemoForm';
import './App.css';
import { Button, TextField, Container, Typography } from '@mui/material';

type Memo = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
};

const App: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);

  // ローカルストレージからメモを読み込む
  useEffect(() => {
    const savedMemos = localStorage.getItem('memos');
    if(savedMemos){
      setMemos(JSON.parse(savedMemos));
    }
  }, []);

  // メモ変更時にローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  // メモ追加
  const addMemo = (title: string, content: string) => {
    const newMemo: Memo = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date()
    };
    setMemos([...memos, newMemo]);
  };

  // メモ削除
  const deleteMemo = (id: number) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  // メモ編集
  const editMemo = (updatedMemo: Memo) => {
    setMemos(memos.map(memo =>
      memo.id === updatedMemo.id ? updatedMemo : memo
    ));
    setEditingMemo(null);
  };

  return (
    <div className='container'>
      <h1>メモ帳アプリ</h1>
      <div className='container'>
        <div className='memoForm'>
          <MemoForm
            onAddMemo={addMemo}
            editingMemo={editingMemo}
            onEditMemo={editMemo}
          />
        </div>
        <div>
          <MemoList
            memos={memos}
            onDelete={deleteMemo}
            onEdit={setEditingMemo}
          />
        </div>
      </div>
    {/* <Container>
      <Typography variant='h4' gutterBottom>
        MUIの基本例
      </Typography>
      <TextField label="名前" variant='outlined' fullWidth margin='normal' />

    </Container> */}
    </div>
  );
};

export default App;
