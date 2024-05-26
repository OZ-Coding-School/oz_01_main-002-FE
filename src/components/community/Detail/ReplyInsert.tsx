import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
type ReplyInsertProps = {
  replyData: {
    content: string;
    date: any;
    id: string;
    nickname: string;
  }[],
  data: {
    nickname: string;
  };
  paramsId: string;
}

const ReplyInsert = ({ replyData, data, paramsId }: ReplyInsertProps) => {
  const [focus, setFocus] = useState(false);
  const [reply, setReply] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const handleReply = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  }
  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
  }, [])

  const handleReplySubmit = async (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const replyId = uuid().replace(/-/g, '').substring(0, 10);;
    if (reply === '') {
      alert('댓글을 입력해주세요.');
      return;
    }
    if (!data) return;
    try {
      const replyData = doc(db, 'community', `${paramsId}`, 'reply', replyId)
      await setDoc(replyData, {
        id: replyId,
        nickname: data,
        content: reply,
        date: new Date(),
      })
    } catch (error) {
      console.log('댓글 등록 실패', error);
    }
    setReply('');
  }

  const handleLogin = () => {
    alert('로그인이 필요합니다.');
    router.push('/login');
  }

  return (
    <div className={`pt-10 ${replyData.length === 0 ? 'mb-10' : ''}`}>
      <div className="text-lg font-bold flex items-center">
        <p>댓글</p>
        <p className="ml-2">{replyData.length}</p>
      </div>
      <div className="mt-4">
        <div className="relative">
          <textarea
            className={`w-full h-[50px] flex items-center pt-3 border pl-4 pr-24 outline-none rounded-lg scrollbar-hide resize-none `}
            value={reply}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            placeholder="댓글 입력"
            onChange={(e) => handleReply(e)}
            onKeyUp={(e) => {
              if (reply.trim() === '') return;
              if (e.key === 'Enter' && !e.shiftKey) {
                if (e.nativeEvent.isComposing) return;
                e.preventDefault();
                handleReplySubmit(e)
              }
            }}
          />
          {!token && <div className="absolute w-full h-[50px] rounded-lg top-0" onClick={handleLogin} />}
          {focus && <button className="absolute w-[80px] h-[40px] rounded-lg border top-1/2 right-2 transform -translate-y-1/2" onMouseDown={(e) => handleReplySubmit(e)}>입력</button>}
        </div>
      </div>
    </div>
  )
}

export default ReplyInsert