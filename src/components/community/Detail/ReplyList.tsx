import { db } from '@/firebase';
import { useOnclickOutside } from '@/hooks/useOnClickOutSide';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { IoMdTime } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import OptionButton from './OptionButton';


type ReplyListProps = {
  replyData: {
    content: string;
    date: any;
    id: string;
    nickname: string;
  }[],
  myNickname: string;
  paramsId: string;
  detailNickname: string;
}

const ReplyList = ({ replyData, myNickname, paramsId, detailNickname }: ReplyListProps) => {
  const [replyUpdateForm, setReplyUpdateForm] = useState(false);
  const [upDateReply, setupDateReply] = useState<string>('');
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);
  const [token, setToken] = useState<string | null>(null);
  const handleUpdateSubmit = async (id: string) => {
    if (upDateReply === '') return alert('수정할 내용을 입력해주세요.');
    try {
      await updateDoc(doc(db, "community", paramsId, 'reply', id), { content: upDateReply });
    } catch (error) {
      console.log('댓글 수정 실패', error);
    }
    setReplyUpdateForm(false);
  }

  useOnclickOutside(ref, () => {
    setIsClicked(false);
  })


  const handleReplyDelete = async (id: string) => {
    const result = confirm("정말 삭제하시겠습니까?");
    if (result) {
      try {
        await deleteDoc(doc(db, "community", paramsId, 'reply', id));
        setIsClicked(false);
      } catch (error) {
        console.log('댓글 삭제 실패', error);
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));


  }, [])


  return (
    <div>
      {replyData.map((item: any) => {
        const givenDate: any = new Date(
          item.date.seconds * 1000 + item.date.nanoseconds / 1000000
        );
        const currentDate: any = new Date();
        const timeDifference = currentDate - givenDate;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        let timeAgo;
        if (minutesDifference < 60) {
          timeAgo = `${minutesDifference}분 전`;
        } else {
          const hoursDifference = Math.floor(minutesDifference / 60);
          if (hoursDifference < 24) {
            timeAgo = `${hoursDifference}시간 전`;
          } else {
            const daysDifference = Math.floor(hoursDifference / 24);
            timeAgo = `${daysDifference}일 전`;
          }
        }
        return (
          <div key={item.id} className="border-b py-5 last:border-b-0">
            <div className="mb-2 flex items-center">
              <p className="font-bold">{item.nickname.substring(0, 1) + "*".repeat(Math.max(item.nickname.length - 1, 0))}</p>
              {detailNickname === item.nickname && <p className="ml-2 text-sm text-[red]">작성자</p>}
            </div>
            <div className="flex items-center justify-between">
              {replyUpdateForm === item.id ?
                <div className="w-full relative flex items-center">
                  <textarea className="w-full h-[40px] pl-4 pt-2 pr-[130px] resize-none scrollbar-hide rounded-lg border" value={upDateReply} onChange={(e) => setupDateReply(e.target.value)} />
                  <div className="absolute flex items-center top-1/2 transform -translate-y-1/2 right-3">
                    <button className="mr-2 w-[50px] border rounded-lg" onClick={() => handleUpdateSubmit(item.id)}>수정</button>
                    <button className="w-[50px] border rounded-lg" onClick={() => {
                      setReplyUpdateForm(false)
                      setupDateReply(item.content)
                    }}>취소</button>
                  </div>
                </div>
                : <p className="pr-4 whitespace-pre-wrap">{item.content}</p>}
              {token && myNickname === item.nickname &&
                <div className="relative">
                  {
                    replyUpdateForm !== item.id &&
                    <div className="cursor-pointer text-nowrap" onClick={() => setIsClicked(item.id)}>
                      <SlOptions className="text-sm mr-2" />
                    </div>
                  }
                  {isClicked === item.id &&
                    <div className="w-[100px] absolute rounded-lg left-1/2 transform -translate-x-1/2" ref={ref}>
                      <ul className="w-full flex flex-col items-center bg-white leading-10">
                        <OptionButton title={'수정하기'} onClick={() => {
                          setupDateReply(item.content);
                          setReplyUpdateForm(item.id);
                          setIsClicked(false);
                        }} />
                        <OptionButton title={'삭제'} onClick={() => handleReplyDelete(item.id)} />
                      </ul>
                    </div>
                  }
                </div>}
            </div>
            <div className="flex items-center text-gray-500 mt-2 text-sm">
              <IoMdTime className="mr-1" />
              <p>{timeAgo}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReplyList