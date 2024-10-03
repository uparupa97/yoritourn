import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Tournament = ({userName, setWinner})=> {
  const [currentRound, setCurrentRound] = useState([]); 
  const [index, setIndex] = useState(0); 
  const [roundNumber, setRoundNumber] = useState(1); 
  const [nextRound, setNextRound] = useState([]); 

  const history = useNavigate(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tryyorilist'));
        const dishes = [];
        querySnapshot.forEach((doc) => {
          dishes.push({ id: doc.id, ...doc.data() });
        });
        const shuffledDishes = dishes.sort(() => Math.random() - 0.5);
        setCurrentRound(shuffledDishes);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleSelect = (selectedDish) => { 
    setNextRound((prev) => [...prev, selectedDish]); 
    setIndex((prev) => prev + 2); 
  }
  

  
  useEffect(() => {
    if (index >= currentRound.length) {
      // 현재 라운드의 모든 매치가 끝났을 때
      if (nextRound.length === 1) {
        // 최종 우승자가 결정된 경우
        setCurrentRound(nextRound);
        setWinner(nextRound[0]);
        setNextRound([]);
        setIndex(0);
        history('/result'); 
      } else if (nextRound.length > 0) {
        // 다음 라운드로 진행
        let updatedNextRound = [...nextRound];
        let byeDish = null;

        // 부전승 처리 (요리 수가 홀수인 경우)
        if (updatedNextRound.length % 2 !== 0) {
          byeDish = updatedNextRound.pop();  // 부전승 요리 마지막 요리 추출
        }

        setCurrentRound(updatedNextRound);
        setNextRound([]);

        // 부전승 요리를 다음 라운드에 미리 추가
        if (byeDish) {
          setNextRound([byeDish]);
        }

        console.log('update', updatedNextRound);

        setIndex(0);
        setRoundNumber((prev) => prev + 1);
      }
    }
  }, [index, currentRound, nextRound]);
  

  
  const currentPair = currentRound.slice(index, index + 2);

  
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h2>{userName}님이 뽑은 최고의 요리는?</h2>
    {currentRound.length > 1 ? (
      currentPair.length === 2 ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold my-4">{roundNumber} 라운드</h2>
          <div className="flex flex-col justify-center">
            <div
              onClick={() => handleSelect(currentPair[0])}
              className="mx-4 cursor-pointer"
            >
              <img
                src={currentPair[0].foodImage}
                alt={currentPair[0].dishName}
                className="h-60 w-auto object-cover rounded-lg shadow-md hover:scale-105 transform transition duration-300 mx-auto"
              />
              <p className="mt-2 text-lg font-semibold">
                {currentPair[0].dishName}
              </p>
            </div>
            <p className="text-3xl mt-2 mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent animate-pulse">
VS</p>
            <div
              onClick={() => handleSelect(currentPair[1])}
              className="mx-4 cursor-pointer"
            >
              <img
                src={currentPair[1].foodImage}
                alt={currentPair[1].dishName}
                className="h-60 w-auto object-cover rounded-lg shadow-md hover:scale-105 transform transition duration-300 mx-auto"
              />
              <p className="mt-2 text-lg font-semibold">
                {currentPair[1].dishName}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
        <p className="text-center text-xl">dd</p>
        </div>
      )
    ) : currentRound.length === 1 ? (
      <div className="text-center">
        <h1 className="text-3xl font-bold my-4">최종 우승 요리!</h1>
        <img
          src={currentRound[0].foodImage}
          alt={currentRound[0].dishName}
          className="h-30 object-cover rounded-lg shadow-md mx-auto"
        />
        <p className="mt-2 text-xl font-semibold">
          {currentRound[0].dishName}
        </p>
        <img src={currentRound[0].chefImage} alt={currentRound[0].chefName} className='h-80 w-auto mt-4 object-cover rounded-lg shadow-md mx-auto'/>
        <p className="mt-2 text-lg">셰프: {currentRound[0].chefName}</p>
      </div>
    ) : (
      <p className="text-center text-xl">로딩 중...</p>
    )}
  </div>
  );
};

export default Tournament;
