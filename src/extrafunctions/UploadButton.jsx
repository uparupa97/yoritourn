import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

function UploadButton() {
  const data = [
    {
      numbering: 1,
      chefName: '에드워드 리',
      color: '백',
      dishName: '묵은지 항정살 샐러드',
      chiefIngredient: '묵은지',
    },
    {
      numbering: 2,
      chefName: '고기깡패',
      color: '흑',
      dishName: '홍어 베이컨 묵은지 삼합',
      chiefIngredient: '묵은지',
    },
    {
      numbering: 3,
      chefName: '정지선',
      color: '백',
      dishName: '시래기 바쓰 흑초 강정',
      chiefIngredient: '시래기',
    },
    {
      numbering: 4,
      chefName: '중식 여신',
      color: '흑',
      dishName: '시래기 도미탕',
      chiefIngredient: '시래기',
    },
    {
      numbering: 5,
      chefName: '이영숙',
      color: '백',
      dishName: '미소곰탕',
      chiefIngredient: '우둔살',
    },
    {
      numbering: 6,
      chefName: '장사 천재 조사장',
      color: '흑',
      dishName: '전립투골',
      chiefIngredient: '우둔살',
    },
    {
      numbering: 7,
      chefName: '조은주',
      color: '백',
      dishName: '매생이 풍미의 전복 요리',
      chiefIngredient: '매생이',
    },
    {
      numbering: 8,
      chefName: '키친 갱스터',
      color: '흑',
      dishName: '관자와 매생이 보리 리소토',
      chiefIngredient: '매생이',
    },
    {
      numbering: 9,
      chefName: '장호준',
      color: '백',
      dishName: '훈연 낙지 오뎅 카츠 산도',
      chiefIngredient: '산낙지',
    },
    {
      numbering: 10,
      chefName: '야키토리왕',
      color: '흑',
      dishName: '산낙지 튀김 덮밥',
      chiefIngredient: '산낙지',
    },
    {
      numbering: 11,
      chefName: '안유성',
      color: '백',
      dishName: '남도 냉이 족찜',
      chiefIngredient: '돼지 족발',
    },
    {
      numbering: 12,
      chefName: '영탉',
      color: '흑',
      dishName: '홍콩식 카오 족발',
      chiefIngredient: '돼지 족발',
    },
    {
      numbering: 13,
      chefName: '최지형',
      color: '백',
      dishName: '맥적구이와 개성나물',
      chiefIngredient: '오겹살',
    },
    {
      numbering: 14,
      chefName: '트리플 스타',
      color: '흑',
      dishName: '오겹살 떡갈비와 소스 에푸아스',
      chiefIngredient: '오겹살',
    },
    {
      numbering: 15,
      chefName: '최강록',
      color: '백',
      dishName: '들기름에 구운 무와 굴 조림',
      chiefIngredient: '들기름',
    },
    {
      numbering: 16,
      chefName: '승우아빠',
      color: '흑',
      dishName: '들기름 막국수 디저트',
      chiefIngredient: '들기름',
    },
    {
      numbering: 17,
      chefName: '최현석',
      color: '백',
      dishName: '장 트리오 스테이크',
      chiefIngredient: '장 트리오',
    },
    {
      numbering: 18,
      chefName: '원투쓰리',
      color: '흑',
      dishName: '제주 장 트리오',
      chiefIngredient: '장 트리오',
    },
    {
      numbering: 19,
      chefName: '조셉 리저우드',
      color: '백',
      dishName: '담백한 바다장어',
      chiefIngredient: '바다장어',
    },
    {
      numbering: 20,
      chefName: '요리하는 돌아이',
      color: '흑',
      dishName: '프렌치 장어 계란찜',
      chiefIngredient: '바다장어',
    },
    {
      numbering: 21,
      chefName: '김도윤',
      color: '백',
      dishName: '반건조 우럭찜',
      chiefIngredient: '반건조 우럭',
    },
    {
      numbering: 22,
      chefName: '반찬 셰프',
      color: '흑',
      dishName: '반건조 우럭 국밥',
      chiefIngredient: '반건조 우럭',
    },
    {
      numbering: 23,
      chefName: '파브리치오 페라리',
      color: '백',
      dishName: '파인다이닝 홍어 삼합',
      chiefIngredient: '홍어',
    },
    {
      numbering: 24,
      chefName: '나폴리 맛피아',
      color: '흑',
      dishName: '홍어 그린 리소토',
      chiefIngredient: '홍어',
    },
    {
      numbering: 25,
      chefName: '황진선',
      color: '백',
      dishName: '탕수 호박',
      chiefIngredient: '늙은 호박',
    },
    {
      numbering: 26,
      chefName: '만찢남',
      color: '흑',
      dishName: '늙은 호박 타르트',
      chiefIngredient: '늙은 호박',
    },
    {
      numbering: 27,
      chefName: '여경래',
      color: '백',
      dishName: '두반장 소꼬리찜',
      chiefIngredient: '소꼬리',
    },
    {
      numbering: 28,
      chefName: '철가방 요리사',
      color: '흑',
      dishName: '동파우미',
      chiefIngredient: '소꼬리',
    },
    {
      numbering: 29,
      chefName: '오세득',
      color: '백',
      dishName: '중동식 곱창 요리',
      chiefIngredient: '소곱창',
    },
    {
      numbering: 30,
      chefName: '히든 천재',
      color: '흑',
      dishName: '마라 소곱창 바오번',
      chiefIngredient: '소곱창',
    },
    {
      numbering: 31,
      chefName: '선경 롱게스트',
      color: '백',
      dishName: '고추장 뼈등심 빠에야',
      chiefIngredient: '돼지 뼈등심',
    },
    {
      numbering: 32,
      chefName: '간귀',
      color: '흑',
      dishName: '매콤새콤달콤 뼈등심',
      chiefIngredient: '돼지 뼈등심',
    },
    {
      numbering: 33,
      chefName: '김승민',
      color: '백',
      dishName: '고등어 토마토 수프',
      chiefIngredient: '고등어',
    },
    {
      numbering: 34,
      chefName: '이모카세 1호',
      color: '흑',
      dishName: '고등어 어탕 국수',
      chiefIngredient: '고등어',
    },
    {
      numbering: 35,
      chefName: '남정석',
      color: '백',
      dishName: '도화새우 캬라멜레',
      chiefIngredient: '도화새우',
    },
    {
      numbering: 36,
      chefName: '셀럽의 셰프',
      color: '흑',
      dishName: '도화새우선과 토마토 응이',
      chiefIngredient: '도화새우',
    },
    {
      numbering: 37,
      chefName: '박준우',
      color: '백',
      dishName: '건표고 리소토와 사블레 그리고 크림',
      chiefIngredient: '표고버섯',
    },
    {
      numbering: 38,
      chefName: '불꽃남자',
      color: '흑',
      dishName: '흑화고 뇨끼',
      chiefIngredient: '표고버섯',
    },
    {
      numbering: 39,
      chefName: '방기수',
      color: '백',
      dishName: '오골계 찜국',
      chiefIngredient: '오골계',
    },
    {
      numbering: 40,
      chefName: '급식 대가',
      color: '흑',
      dishName: '오골계 볶음탕',
      chiefIngredient: '오골계',
    },
    // ... 나머지 37개의 데이터 요소들
  ];

  const handleClick = async () => {
    const yorilistRef = collection(db, 'yorilist');
    try {
      for (const item of data) {
        await addDoc(yorilistRef, item);
      }
      console.log('데이터가 성공적으로 업로드되었습니다.');
    } catch (error) {
      console.error('데이터 업로드 중 오류 발생: ', error);
    }
  };

  return (
    <button className="bg-slate-400 text-red-500" onClick={handleClick}>
      데이터 업로드
    </button>
  );
}

export default UploadButton;
