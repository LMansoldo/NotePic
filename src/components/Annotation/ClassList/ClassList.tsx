import { Button } from "@components";
import { useAnnotations } from "@context";
import { Slider } from "../../Slider/Slider";
import { ClassSelector } from "@components";

const ClassList = () => {
  const { state } = useAnnotations();

  if (!state?.classes) {
    return null;
  }

  return (
		<>
	
						<Slider items={state.classes.map((classItem) => (
      <Button key={classItem.color} shape="flat" size="small" accentColor={classItem.color}>
        {classItem.name}
      </Button>
    ))} />
		</>

  );
};

export { ClassList };