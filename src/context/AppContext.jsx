import { createContext, useEffect, useState, } from 'react'
import { dummyCourses } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const currency = "Rs. "
    const navigate = useNavigate

    const [allCourses, setAllCourses] = useState([])

    // Fetch All Courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    const calculateChaptertime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration);
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]});
    }

    const calculateCourseDuration = (course) => {
        let time = 0;

        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ))
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]});
    }

    const calculteNoOfLecture = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length
            }
        });
        return totalLectures;
    }

    useEffect(() => {
        fetchAllCourses()
    },[])

    const value = {
        currency, allCourses, navigate,
        calculateChaptertime, calculateCourseDuration, calculteNoOfLecture,

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}