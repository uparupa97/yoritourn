import React, { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  orderBy,
} from 'firebase/firestore';

function ChefImageList() {
  const [chefImages, setChefImages] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchChefImages = async () => {
      try {
        const yorilistRef = collection(db, 'tryyorilist');
        const q = query(yorilistRef, orderBy('numbering', 'asc'));
        const querySnapshot = await getDocs(q);
        const images = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.chefImage) {
            images.push({
              id: doc.id,
              chefName: data.chefName,
              chefImage: data.chefImage,
              numbering: data.numbering,
            });
          }
        });
        setChefImages(images);
      } catch (error) {
        console.error('Error fetching chef images:', error);
      }
    };

    fetchChefImages();
  }, [db]);

  return (
    <div>
      <h1>흑수저 셰프 이미지 리스트</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {chefImages.map((chef) => (
          <li key={chef.id} style={{ marginBottom: '20px' }}>
            <h2>{chef.chefName}</h2>
            <h2>chef {chef.numbering}</h2>
            {chef.chefImage ? (
              <img
                src={chef.chefImage}
                alt={chef.chefName}
                style={{ maxWidth: '200px' }}
              />
            ) : (
              <p>이미지가 없습니다.</p>
            )}
            <p>Image URL: {chef.chefImage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChefImageList;
