import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Tournament = ({userName})=> {
  const [dish, setDish] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tryyorilist'));
        const dishes = [];
        querySnapshot.forEach((doc) => {
          dishes.push({ id: doc.id, ...doc.data() });
        });
        const shuffledDishes = dishes.sort(() => Math.random() - 0.5);
        setDish(shuffledDishes);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, []);
  

  console.log('shuffledish', dish); 

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
     <h2 className='text-2xl text-white'>{userName}님이 뽑은 흑백요리사는?</h2>

    </div>
  );
};

export default Tournament;
