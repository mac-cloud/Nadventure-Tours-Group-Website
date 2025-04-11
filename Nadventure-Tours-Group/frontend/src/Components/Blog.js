import React, { useEffect, useState } from 'react';
import '../Styles/styles.css';
import axios from 'axios';

const Blog = () => {
    const [blogData, setBlogData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/api/blogs/')
            .then(res => {
                setBlogData(res.data);
                const categories = Object.keys(res.data);
                if (categories.length > 0) {
                    setSelectedCategory(categories[0]);
                }
            })
            .catch(err => console.error('Error fetching blog data:', err));
    }, []);

    const categories = Object.keys(blogData);
    const blogs = blogData[selectedCategory] || [];

    const nextBlog = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    };

    const prevBlog = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + blogs.length) % blogs.length);
    };

    return (
        <section className='blog-section'>
            <h1>Explore Our Blog</h1>

            <div className="blog-categories">
                {categories.map((category, index) => (
                    <div className='category'>
                    <button 
                        key={index} 
                        className={`category-btn ${category === selectedCategory ? "active" : ""}`} 
                        onClick={() => { setSelectedCategory(category); setCurrentIndex(0); }}
                    >
                        {category}
                    </button>
                    </div>
                ))}
            </div>

            {blogs.length > 0 ? (
                <div className="blog-item">
                    <h2>{selectedCategory}</h2>
                    <img src={`http://localhost:8000${blogs[currentIndex].image}`} alt={blogs[currentIndex].title} className="blog-image" />
                    <a 
                        href={blogs[currentIndex].link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="blog-title"
                    >
                        {blogs[currentIndex].title}
                    </a>
                    <p className="blog-excerpt">{blogs[currentIndex].excerpt}</p>
                    <p className="blog-date">{blogs[currentIndex].date}</p>
                </div>
            ) : (
                <p>No blogs available for this category.</p>
            )}

            <div className="blog-navigation">
                <button onClick={prevBlog} className="nav-arrow">⬅️</button>
                <button onClick={nextBlog} className="nav-arrow">➡️</button>
            </div>
        </section>
    );
};

export default Blog;
