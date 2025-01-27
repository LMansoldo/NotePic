import { Button } from "@components";
import { useAnnotations } from "@context";
import { Slider } from "../../Slider/Slider";
import styles from './ClassList.module.css';

const ClassList = () => {
  const { state } = useAnnotations();

  if (!state?.classes) {
    return null;
  }

  return (
    <>
      <div className={styles.classList}>
        {state.classes.map((classItem) => (
          <Button key={classItem.color} shape="flat" size="small" accentColor={classItem.color}>
            {classItem.name}
          </Button>
        ))}
      </div>
      
      <div className={styles.sliderContainer}>
        <Slider items={state.classes.map((classItem) => (
          <Button key={classItem.color} shape="flat" size="small" accentColor={classItem.color}>
            {classItem.name}
          </Button>
        ))} />
      </div>
    </>
  );
};

export { ClassList };