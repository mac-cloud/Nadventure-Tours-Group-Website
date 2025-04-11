import React, { useState, useEffect } from 'react';
import '../Styles/styles.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Story = () => {
    const [stories, setStories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8000/api/stories/") // Adjust URL based on your setup
            .then((response) => {
                setStories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching stories:", error);
            });
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
    };

    if (stories.length === 0) return <div>Loading...</div>;

    return (
        <section className='storytelling'>
            <button className="arrow-btn left" onClick={handlePrev}>
                <FaArrowLeft />
            </button>

            <div className='story-wrapper'>
                <div className='story-content'>
                    <h2>{stories[currentIndex].title}</h2>
                    <p>{stories[currentIndex].content}</p>
                    <div className="year-founded">Est. {stories[currentIndex].year_founded}</div>
                </div>

                <div className="video-section">
                    {stories[currentIndex].videos.map((video, vidIndex) => (
                        <div key={vidIndex} className="video-container">
                            <iframe
                                src={video.url}
                                title={`Story Video ${currentIndex + 1}-${vidIndex + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>

            <button className="arrow-btn right" onClick={handleNext}>
                <FaArrowRight />
            </button>
        </section>
    );
};

export default Story;
