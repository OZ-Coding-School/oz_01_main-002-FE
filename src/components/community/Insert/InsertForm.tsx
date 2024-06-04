'use client';

import { useGetCommunity } from "@/api/communityApi";
import { useGetUser } from "@/api/userApi";
import { db, storage } from "@/firebase";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';

type InsertFormProps = {
  paramsId: string;
};

const InsertForm = ({ paramsId }: InsertFormProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useGetUser();
  const { data: communityItem, isLoading: communityLoading, refetch } = useGetCommunity(paramsId.replace('update%3D', ''));
  const [file, setFile] = useState<File>();
  const [renderImage, setRenderImage] = useState<string>('');
  const router = useRouter();
  let imageUrl: any = null;
  const [communityData, setCommunityData] = useState({
    title: '',
    content: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    title: '',
    content: ''
  })

  const loader = ({ src }: { src: string }) => {
    return src;
  };

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.push('/login');
      return;
    }
    if (paramsId === 'insert') return;
    if (!paramsId || typeof paramsId !== 'string' || !paramsId.startsWith('update%') || paramsId.length !== 19) {
      // 유효하지 않은 ID이거나 존재하지 않는 경우 리디렉션
      router.push('/community');
    }
  }, []);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setErrorMessage({
        ...errorMessage,
        title: ''
      })
    }

    if (e.target.value.length !== 0) {
      setErrorMessage({
        ...errorMessage,
        title: ''
      })
    }

    setCommunityData({
      ...communityData,
      title: e.target.value
    })
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setErrorMessage({
        ...errorMessage,
        content: ''
      })
    }

    if (e.target.value.length !== 0) {
      setErrorMessage({
        ...errorMessage,
        content: ''
      })
    }

    setCommunityData({
      ...communityData,
      content: e.target.value
    })
  }

  const handleError = () => {
    const regex = /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/;
    if (communityData.title === '') {
      setErrorMessage({
        ...errorMessage,
        title: '제목을 입력해주세요'
      })
      return true;
    }

    if (regex.test(communityData.title)) {
      setErrorMessage({
        ...errorMessage,
        title: '특수문자는 사용할 수 없습니다'
      })
      return true;
    }

    if (communityData.content === '') {
      setErrorMessage({
        ...errorMessage,
        content: '내용을 입력해주세요'
      })
      return true;
    }
    return false;
  }

  const handleClick = () => {
    fileInput.current?.click();
  };

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (!files) {
      setFile(files![0]);
    }
    if (!files) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        return;
      }
      setRenderImage(result);
    };
  }

  const handleImageDelete = () => {
    setRenderImage('');
    fileInput.current!.value = '';
  }

  const handleInsert = async () => {
    const itemId = uuid().replace(/-/g, '').substring(0, 10);
    const error = handleError();
    if (error) return;
    if (isLoading) return;
    try {
      if (renderImage) {
        const storageRef = ref(storage, `images/${itemId}`);
        await uploadString(storageRef, renderImage, "data_url");
        imageUrl = await getDownloadURL(ref(storage, `images/${itemId}`));
      }
      const docRef = doc(collection(db, "community"), itemId);
      const data1 = {
        id: itemId,
        nickname: data?.data.nickname,
        title: communityData.title,
        content: communityData.content,
        date: new Date(),
        category: "자유게시판",
        imageUrl: "",
      }
      if (
        imageUrl !== null &&
        imageUrl !== "" &&
        imageUrl !== undefined
      ) {
        data1.imageUrl = imageUrl;
      }

      await setDoc(docRef, data1);

      alert('게시물이 등록되었습니다');
      setCommunityData({
        title: '',
        content: ''
      })
      setRenderImage('');
      router.push('/community');
    } catch (error) {
      console.log('게시물 등록 실패', error);
    }
  }

  // ============================================= 게시물 수정 =======================================================//
  useEffect(() => {
    if (paramsId === 'insert') return;
    refetch();
    if (!communityLoading && communityItem?.exists()) {
      const updateData = communityItem?.data();
      setCommunityData({
        title: updateData.title,
        content: updateData.content
      })
      setRenderImage(updateData.imageUrl);
    }
  }, [communityLoading])

  const handleUpdate = async () => {
    try {
      if (communityData.title === '' && communityData.content === '') return;
      const validDataUrlRegex =
        /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)?(?:;base64)?,(.*)$/;
      let newImageUrl = null;
      if (validDataUrlRegex.test(renderImage)) {
        if (renderImage) {
          const storageRef = ref(storage, `images/${paramsId.replace('update%3D', '')}`);
          await uploadString(storageRef, renderImage, "data_url");
          newImageUrl = await getDownloadURL(
            ref(storage, `images/${paramsId.replace('update%3D', '')}`)
          );
        }
      }
      const updateData: {
        title: string;
        content: string;
        imageUrl?: string | null;
      } = {
        title: communityData.title,
        content: communityData.content,
      };
      if (
        newImageUrl !== null &&
        newImageUrl !== "" &&
        newImageUrl !== undefined
      ) {
        updateData.imageUrl = newImageUrl;
      } else if (fileInput.current!.value === '') {
        updateData.imageUrl = '';
      }

      await updateDoc(doc(db, "community", paramsId.replace('update%3D', '')), updateData);
      alert('게시물이 수정되었습니다');
      router.push('/community');
    } catch (error) {
      console.log("error", error);
    }
  };
  // ============================================= 게시물 수정 =======================================================//
  if (paramsId !== 'insert' && communityLoading && communityData.title === '' && communityData.content === '') {
    return <div>
      <div className="w-full h-[20px] bg-[#222]" />
      <div className="w-full max-w-[1200px] h-[700px] mx-auto bg-white flex items-center justify-center rounded-lg">
        <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-t from-[#D1B383] to-white flex justify-center items-center animate-spin">
          <div className="w-[65px] h-[65px] rounded-full bg-white"></div>
        </div>
      </div>
    </div>;
  }
  return (
    <>
      <div className="w-full h-[20px] bg-[#222]" />
      <div className="w-full max-w-[1200px] mx-auto bg-white rounded-lg">
        <div className="text-3xl text-center font-semibold">
          <div className="h-10" />
          <p className="">{paramsId === 'insert' ? '게시물 등록' : '게시물 수정'}</p>
          <div className="h-10" />
        </div>
        <div className="w-full max-w-[700px] mx-auto px-4">
          <div className="text-2xl font-bold">
            <label htmlFor="title">제목</label>
            <input id="title" type="text" className="w-full h-[50px] text-xl font-normal mt-[10px] pl-4 outline-none border rounded-lg " value={communityData.title} placeholder="제목을 입력해주세요" onChange={(e) => handleTitle(e)} />
          </div>
          <p className="text-red-700">{errorMessage.title}</p>
          <div className="mt-[10px] text-2xl font-bold">
            <label htmlFor="content">내용</label>
            <textarea id="content" className="w-full h-[400px] mt-[10px] text-xl outline-none font-normal p-4 border rounded-lg resize-none" value={communityData.content} placeholder="내용을 입력해주세요 (건전한 게시판 문화를 만듭시다.)" onChange={(e) => handleContent(e)} />
          </div>
          <p className="text-red-700">{errorMessage.content}</p>
          {renderImage ?
            <div className="flex items-center justify-center">
              <div className="w-[250px] h-[250px] rounded-lg cursor-pointer relative overflow-hidden" onClick={handleImageDelete}>
                <Image src={renderImage} className="" fill sizes="1" alt="미리보기 이미지" loader={loader} />
              </div>
            </div>
            : null}
          <div className="w-full mt-[10px] flex justify-end">
            <div className="w-[120px] h-[35px] flex justify-center items-center border-[#D1B383] rounded-xl border cursor-pointer" onClick={() => handleClick()}>
              <p>이미지</p>
            </div>
            <input type="file" className="hidden" ref={fileInput} onChange={(e) => handleImages(e)} />
          </div>
          <div className="w-full flex justify-center items-center mt-[20px]">
            <button className="w-[150px] h-[50px] border border-[#D1B383]] rounded-lg bg-[#D1B383] text-white" onClick={() => paramsId === 'insert' ? handleInsert() : handleUpdate()}>{paramsId === 'insert' ? '등록' : '수정'}</button>
          </div>
        </div>
        <div className="h-10" />
      </div>
    </>
  )
}

export default InsertForm