import { useState } from "react"
import { useAppDispatch } from "../app/hooks";
import { addLessons } from "../features/classbook/classbook.slice";

export const AddLesson = () => {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    dispatch(addLessons({ title: text, ratings: [] }))
    .unwrap()
    .then(response => {
      setText("")
    })
  }

  return <>
    <input 
      value={text}
      onChange={e => setText(e.target.value)}
      onKeyDown={e => e.key == "Enter" && handleSubmit()}
    />
  </>
}