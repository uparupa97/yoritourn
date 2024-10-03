import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Tournament = ()=> {
  const [currentImages, setCurrentImages] = useState([]); // 현재 라운드의 이미지들
  const [nextImages, setNextImages] = useState([]); // 다음 라운드로 진출할 이미지들
  const [index, setIndex] = useState(0); // 현재 이미지 쌍의 인덱스
  const [round, setRound] = useState(1); // 현재 라운드 번호
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tryyorilist'));
        const imageData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          imageData.push(data); // 전체 데이터를 배열에 추가
        });
  
        // 이미지 섞기
        const shuffledData = imageData.sort(() => Math.random() - 0.5);
        setCurrentImages(shuffledData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError(err);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const handleSelect = (imageData) => {
    setNextImages((prev) => [...prev, imageData]);
    setIndex((prev) => prev + 2);
  };
  
  useEffect(() => {
    if (index >= currentImages.length) {
      if (nextImages.length === 1) {
        // 우승자 결정
        setCurrentImages(nextImages);
      } else {
        // 부전승 처리
        let updatedNextImages = [...nextImages];
        if (updatedNextImages.length % 2 !== 0) {
          const byeImage = updatedNextImages.shift();
          updatedNextImages.push(byeImage);
        }
        setCurrentImages(updatedNextImages);
        setNextImages([]);
        setIndex(0);
        setRound((prev) => prev + 1);
      }
    }
  }, [index, currentImages.length, nextImages]);
  
  if (loading) {
    return <h1>로딩 중...</h1>;
  }
  
  if (error) {
    return <h1>데이터를 불러오는 중 오류가 발생했습니다.</h1>;
  }
  
  if (currentImages.length === 1) {
    return (
      <div>
        <h1>최종 우승자!</h1>
        <img
          src={currentImages[0].foodImage}
          alt={currentImages[0].dishName}
          style={{ width: '300px' }}
        />
        <p>요리 이름: {currentImages[0].dishName}</p>
        <p>셰프 이름: {currentImages[0].chefName}</p>
      </div>
    );
  }


  if (currentImages.length > 1) {
    return (
      <div>
        <h1>{round} 라운드</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div onClick={() => handleSelect(currentImages[index])}>
            <img
              src={currentImages[index].foodImage}
              alt={currentImages[index].dishName}
              style={{ width: '300px', cursor: 'pointer' }}
            />
            <p>{currentImages[index].dishName}</p>
            <p>{currentImages[index].chefName}</p>
          </div>
          <div onClick={() => handleSelect(currentImages[index + 1])}>
            <img
              src={currentImages[index + 1].foodImage}
              alt={currentImages[index + 1].dishName}
              style={{ width: '300px', cursor: 'pointer' }}
            />
            <p>{currentImages[index + 1].dishName}</p>
            <p>{currentImages[index + 1].chefName}</p>
          </div>
        </div>
      </div>
    );
  }
  

  
  return  null;
};

export default Tournament;
