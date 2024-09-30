import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = ({ setUserName }) => {
  const [name, setName] = useState('');
  const history = useNavigate();

  const handleStart = () => {
    setUserName(name);
    history('/tournament');
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="https://blog.kakaocdn.net/dn/cjqmiE/btsJDnyfJ86/TpsnoHcWgzOIRUCzWAtEC0/img.jpg"
        alt="배경이미지"
        className="m-3"
      />
      <h1 className="text-2xl mt-2 mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent animate-pulse">
        당신의 최고의 요리를 고르세요
      </h1>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded mb-4 text-center"
      />
      <button
        onClick={handleStart}
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
      >
        시작하기
      </button>
    </div>
  );
};

export default Start;
