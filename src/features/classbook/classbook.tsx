import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { getAllStudents } from "../students/students.slice";
import { getLessons, updateRating } from "./classbook.slice";
import styles from "./style.module.css";
import { AddLesson } from "../../utils/add-lesson";
import { RateModal } from "./rate-modal";

export const ClassBook = () => {
  const students = useAppSelector((state) => state.students.list);
  const lessons = useAppSelector((state) => state.classbook.lessons);
  const dispatch = useAppDispatch();
  const empty = new Array(16 - lessons.length).fill(null);
  const [selectedLesson, setSelectedLesson] = useState<null | string>(null);
  const [selectedStudent, setSelectedStudent] = useState<null | string>(null);

  useEffect(() => {
    dispatch(getAllStudents());
    dispatch(getLessons());
  }, [dispatch]);

  const handleMarkClick = (studentId: string, lessonId: string, hasRating: boolean) => {
    if (!hasRating) {
      setSelectedStudent(studentId);
      setSelectedLesson(lessonId);
    }
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setSelectedLesson(null);
  };

  const saveRating = (rate: number) => {
    if (selectedLesson && selectedStudent) {
      dispatch(
        updateRating({
          lessonId: selectedLesson,
          rating: { student: selectedStudent, rate },
        })
      );
      closeModal();
    }
  };

  return (
    <>
      <h3>classbook</h3>
      <Link to={"/students"}>Students</Link>
      <p>students {students.length}</p>
      <p>lessons {lessons.length}</p>
      <AddLesson />
      <table className={styles.table}>
        <thead>
          <tr>
            <th rowSpan={2}>Student</th>
            <th colSpan={16}>Lessons</th>
          </tr>
          <tr>
            {lessons.map((lesson) => (
              <td className={styles.vertical} key={lesson.id}>
                {lesson.title}
              </td>
            ))}
            {empty.map((_, index) => (
              <th key={index}></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name} {student.surname}</td>
              {lessons.map((lesson) => {
                const found = lesson.ratings.find((r) => r.student === student.id);
                return (
                  <td
                    key={lesson.id}
                    onClick={() => handleMarkClick(student.id, lesson.id, !!found)}
                  >
                    {found?.rate ?? ""}
                  </td>
                );
              })}
              {empty.map((_, index) => (
                <td key={index}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedLesson && selectedStudent && (
        <RateModal
          onClose={closeModal}
          onSave={saveRating}
        />
      )}
    </>
  );
};