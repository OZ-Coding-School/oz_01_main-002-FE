"use client";

import { useState } from "react";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    profileImage: "/images/ryoni.jpeg",
    name: "김료니",
    nickname: "료니",
    email: "ryoni@gmail.com",
    phoneNumber: "010-1234-5678",
    birthDate: "2020-08-20",
    gender: "암컷",
    address: "부산광역시 중구",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="max-w-[800px] mx-auto mt-4 mb-4 p-4 rounded-lg bg-slate-100 shadow-md">
        <div>
          <div className="flex justify-between">
            <div className="flex items-center mb-4">
              <div
                className="w-28 h-28 rounded-full bg-cover bg-no-repeat bg-center mr-4"
                style={{ backgroundImage: `url(${userInfo.profileImage})` }}
              ></div>
              <div>
                <p className="text-2xl font-semibold">{userInfo.nickname}</p>
                <p className="text-gray-500">{userInfo.name}</p>
              </div>
            </div>
            <button
              className="px-4 mt-20 h-8 bg-slate-500 text-white rounded-md"
              onClick={handleEditClick}
            >
              프로필 수정
            </button>
          </div>
          {isEditing && (
            <div>
              <label className="block mb-2">이름</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              <label className="block mb-2">닉네임</label>
              <input
                type="text"
                name="nickname"
                value={userInfo.nickname}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              <label className="block mb-2">이메일</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              <label className="block mb-2">폰번호</label>
              <input
                type="tel"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              <label className="block mb-2">생년월일</label>
              <input
                type="date"
                name="birthDate"
                value={userInfo.birthDate}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              <label className="block mb-2">성별</label>
              <input
                type="text"
                name="gender"
                value={userInfo.gender}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              <label className="block mb-2">주소</label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                onClick={handleSaveClick}
              >
                저장
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                onClick={handleCancelClick}
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[800px] h-60 mx-auto mt-4 mb-4 p-4 rounded-lg bg-slate-100 shadow-md"></div>
      <div className="max-w-[800px] h-60 mx-auto mt-4 mb-4 p-4 rounded-lg bg-slate-100 shadow-md"></div>
      <div className="max-w-[800px] h-60 mx-auto mt-4 mb-4 p-4 rounded-lg bg-slate-100 shadow-md"></div>
    </div>
  );
};

export default MyPage;
