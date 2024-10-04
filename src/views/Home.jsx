import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

export default function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Our Dashboard</h1>
            <div className="links-container">
                <Link to="/products" className="link-button">
                    View Products
                </Link>
                
                <Link to="/users" className="link-button">
                    View Users
                </Link>
            </div>
        </div>
    );
}
