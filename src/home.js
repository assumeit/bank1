import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      
        <div className="hero-content">
          <div className="hero-right">
            <img src="/images/a.png" alt="Hero Image" />
          </div>
        </div>
      

      {/* Additional Links */}
      <section className="additional-links">
        <div className="link-container">
          <Link to="/ways-to-bank">Ways to Bank</Link>
          <Link to="/find-branch">Find a Branch</Link>
          <Link to="/investor-relations">Investor Relations</Link>
          <Link to="/contact-us">Contact Us</Link>
        </div>
      </section>

      {/* Grid of Services */}
      <section className="services-grid">
        <h2>Welcome to RBC Personal Banking</h2>
        <p>Explore RBC services and related products</p>
        <div className="grid">
          <div className="grid-item">
            <img src="/images/wallet.png" alt="Find a chequing account" />
            <h3>Find a chequing account</h3>
            <p>For daily spending, making bill payments, and more.</p>
          </div>
          <div className="grid-item">
            <img src="/images/pig.jpg" alt="Find a savings account" />
            <h3>Find a savings account</h3>
            <p>Accounts to help you grow your savings.</p>
          </div>
          <div className="grid-item">
            <img src="/images/credit.jpg" alt="Find a credit card" />
            <h3>Find a credit card</h3>
            <p>RBC credit cards offer a host of benefits and features.</p>
          </div>
          <div className="grid-item">
            <img src="/images/house.jpg" alt="Explore mortgage options" />
            <h3>Explore mortgage options</h3>
            <p>Get specialized advice to help with your home ownership journey.</p>
          </div>
          <div className="grid-item">
            <img src="/images/graph.jpg" alt="Personal investing" />
            <h3>Personal investing</h3>
            <p>Registered plans and investments to help you reach your goals.</p>
          </div>
          <div className="grid-item">
            <img src="/images/loan.jpg" alt="Borrowing" />
            <h3>Borrowing</h3>
            <p>Find a borrowing option that fits your life.</p>
          </div>
        </div>
        
      </section>
    </div>
    
  );
};

export default Home;
