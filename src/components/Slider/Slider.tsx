import React, { useState } from 'react';
import { Button } from "@components";
import { LiaArrowLeftSolid, LiaArrowRightSolid } from "react-icons/lia"
import styles from './Slider.module.css'

interface SliderProps {
  items: React.ReactNode[];
}

const Slider: React.FC<SliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
  };

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
  };

  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < Math.min(3, items.length); i++) {
      visibleItems.push(items[(currentIndex + i) % items.length]);
    }
    return visibleItems;
  };

  return (
    <div className={styles.sliderContainer}>
      <Button onClick={handlePrev} size="small" shape="circle"><LiaArrowLeftSolid /></Button>
      <div className={`${styles.sliderItems} ${styles[direction]}`}>
        {getVisibleItems().map((item, index) => (
          <div key={index} className={styles.sliderItem}>
            {item}
          </div>
        ))}
      </div>
			<Button onClick={handleNext} size="small" shape="circle"><LiaArrowRightSolid /></Button>
    </div>
  );
};

export { Slider };