// src/pages/BlogPage.js
import React from 'react';

function BlogPage() {
  // Sample data for blog posts (you can replace this with real data from an API or CMS)
  const blogPosts = [
    {
      id: 1,
      title: 'Our Step-by-Step Guide to Fact-Checking a News Story',
      description: 'Lorem ipsum dolor sit amet consectetur. Amet sed eleifend aliquet neque id.',
      date: 'Sep 3, 2024',
    },
    {
      id: 2,
      title: 'Our Step-by-Step Guide to Fact-Checking a News Story',
      description: 'Lorem ipsum dolor sit amet consectetur. Amet sed eleifend aliquet neque id.',
      date: 'Sep 3, 2024',
    },
    {
      id: 3,
      title: 'Our Step-by-Step Guide to Fact-Checking a News Story',
      description: 'Lorem ipsum dolor sit amet consectetur. Amet sed eleifend aliquet neque id.',
      date: 'Sep 3, 2024',
    },
    {
      id: 4,
      title: 'Our Step-by-Step Guide to Fact-Checking a News Story',
      description: 'Lorem ipsum dolor sit amet consectetur. Amet sed eleifend aliquet neque id.',
      date: 'Sep 3, 2024',
    },
  ];

  return (
    <div className="blog-page">
      <div className="container">
        <h1>Blog</h1>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <div className="blog-post-image"></div>
              <h2 className="blog-post-title">{post.title}</h2>
              <p className="blog-post-description">{post.description}</p>
              <div className="blog-post-footer">
                <button className="learn-more-button">Learn More</button>
                <span className="truth-check-label">
                  <span className="truth-check-icon">✓</span> truth check • {post.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;