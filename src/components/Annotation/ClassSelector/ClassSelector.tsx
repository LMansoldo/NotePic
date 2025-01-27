import { useState, useCallback } from "react";
import { Button, Input } from "@components";
import { useAnnotations } from "@context";
import { Class } from "@types";
import { LiaPlusSolid } from "react-icons/lia";
import styles from './ClassSelector.module.css'

const ClassSelector = () => {
  const { dispatch } = useAnnotations();
  const [classLabel, setClassLabel] = useState("");
  const [inputError, setInputError] = useState("");

  const generateRandomColor = useCallback((): string => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }, []);

  const addNewClass = useCallback(() => {
    if (!classLabel.trim()) {
      return setInputError("This field is required");
    }
    setInputError("");
    const newClass: Class = { name: classLabel, color: generateRandomColor() };
    dispatch({ type: 'ADD_CLASS', payload: newClass });
    setClassLabel("");
  }, [classLabel, dispatch, generateRandomColor]);

  return (
    <div className={styles.classSelector}>
			      <Input
        label="Add Class"
        onChange={setClassLabel}
        value={classLabel}
        error={inputError}
        onFocus={() => setInputError("")}
      />
      <Button shape="circle" size="small" onClick={addNewClass}>
        <LiaPlusSolid />
      </Button>

    </div>
  );
};

export { ClassSelector };