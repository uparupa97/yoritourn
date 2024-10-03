import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, increment, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const Result = ({ userName, winner }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [topChefs, setTopChefs] = useState([]);

  useEffect(() => {
    const fetchLikeCount = async () => {
      const dishRef = doc(db, 'tryyorilist', winner.id);
      const dishSnap = await getDoc(dishRef);
      if (dishSnap.exists()) {
        const data = dishSnap.data();
        setLikeCount(data.likeCount || 0);
      }
    };

    const fetchTopChefs = async () => {
      const dishesRef = collection(db, 'tryyorilist');
      const q = query(dishesRef, orderBy('likeCount', 'desc'), limit(3));
      const querySnapshot = await getDocs(q);

      const chefs = [];
      querySnapshot.forEach((doc) => {
        chefs.push({ id: doc.id, ...doc.data() });
      });
      setTopChefs(chefs);
    };

    fetchLikeCount();
    fetchTopChefs();
  }, [winner]);

  const handleLike = async () => {
    const dishRef = doc(db, 'tryyorilist', winner.id);
    await updateDoc(dishRef, {
      likeCount: increment(1),
    });
    setLikeCount((prev) => prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '최고의 요리사 결과',
        text: `${winner.dishName}이(가) 최종 우승했습니다!`,
        url: window.location.href,
      })
        .then(() => console.log('공유 성공'))
        .catch((error) => console.log('공유 실패', error));
    } else {
      alert('공유하기가 지원되지 않는 브라우저입니다.');
    }
  };

  return (
    <div className="text-center pt-9">
      <h1 className="text-3xl font-bold my-4">{userName}님이 뽑은 최종 요리!</h1>
      <img
        src={winner.foodImage}
        alt={winner.dishName}
        className="h-[180px] object-cover rounded-lg shadow-md mx-auto"
      />
      <p className="mt-2 text-xl font-semibold">{winner.dishName}</p>
      <img
        src={winner.chefImage}
        alt={winner.chefName}
        className="h-64 w-auto mt-4 object-cover rounded-lg shadow-md mx-auto"
      />
      <p className="mt-2 text-lg">셰프: {winner.chefName}</p>

      <button onClick={handleLike} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        ❤️ {likeCount}
      </button>

      <button onClick={handleShare} className="mt-4 ml-2 px-4 py-2 bg-blue-500 text-white rounded">
        공유하기
      </button>

      <h2 className="text-2xl font-bold my-4">인기 많은 요리사 TOP 3</h2>
      <ul>
        {topChefs.map((chef, index) => (
          <li key={chef.id} className="my-1">
            {index + 1}. {chef.chefName} - ❤️ {chef.likeCount || 0}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
