"use client";

// components/CourseRecommendations.js
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

async function loadModel() {
  const model = await tf.loadLayersModel("/model/model.json"); // Place model in /public/model
  return model;
}

async function loadCourseEmbeddings() {
  const response = await fetch("/data/course_embeddings.json"); // Place data in /public/data
  const embeddings = await response.json();
  return embeddings;
}

async function loadCourseData() {
  const response = await fetch("/data/course_data.json"); // Place data in /public/data
  const courseData = await response.json();
  return courseData;
}

async function recommendCourses(userPreferences, numRecommendations = 3) {
  const model = await loadModel();
  const courseEmbeddings = await loadCourseEmbeddings();

  // Ensure userPreferences length matches course embeddings length
  const userTensor = tf
    .tensor(userPreferences)
    .reshape([1, userPreferences.length]);

  const similarityScores = {};
  for (const courseId in courseEmbeddings) {
    const courseTensor = tf
      .tensor(courseEmbeddings[courseId])
      .reshape([userPreferences.length, numRecommendations]);
    const score = userTensor.dot(courseTensor).dataSync()[0];
    similarityScores[courseId] = score;
  }

  const sortedCourses = Object.entries(similarityScores).sort(
    ([, scoreA], [, scoreB]) => scoreB - scoreA,
  );

  const recommendations = sortedCourses
    .slice(0, numRecommendations)
    .map(([courseId]) => courseId);
  return recommendations;
}

export default function CourseRecommendations({ userPreferences }) {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      if (userPreferences) {
        const recommendations = await recommendCourses(userPreferences);
        const data = await loadCourseData();
        setCourseData(data);
        setRecommendedCourses(recommendations);
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [userPreferences]);

  if (loading) {
    return <p>Loading recommendations...</p>;
  }

  return (
    <div>
      <h2>Recommended Courses</h2>
      <ul>
        {recommendedCourses.map((courseId) => (
          <li key={courseId}>
            <h3>{courseData[courseId].title}</h3>
            <p>{courseData[courseId].description}</p>
            <p>Instructor: {courseData[courseId].instructor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
