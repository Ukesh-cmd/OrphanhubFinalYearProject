

import React, { useState, useEffect } from 'react';
import DonationSection from './DonationSection';

const DonationForm = ({ onClose, categories }) => {
    const [showForm, setShowForm] = useState(false);
    const [showGoal, setShowGoal] = useState(true);
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [donationStatus, setDonationStatus] = useState(null);
    const [donationGoalReached, setDonationGoalReached] = useState(false);
    const [allocationDetails, setAllocationDetails] = useState(null);
    const [totalDonatedAmount, setTotalDonatedAmount] = useState(0);
    const calculateAllocation = (donatedAmount) => {
        const allocation = {};
        let remainingAmount = donatedAmount;

        categories.forEach((category) => {
            const allocationAmount = donatedAmount * category.weight;
            allocation[category.name] = allocationAmount;
            remainingAmount -= allocationAmount;
        });

        if (remainingAmount > 0) {
            const mostImportantCategory = categories.reduce((prev, current) =>
                prev.weight > current.weight ? prev : current
            );
            allocation[mostImportantCategory.name] += remainingAmount;
        }

        return allocation;
    };
   
    
    const handleCloseForm = () => {
        if (showForm) {
            setShowForm(false);
            setShowGoal(true);
        }
    };

    const handleDonateNowClick = () => {
        setShowGoal(true);
        setShowForm(true);
    };
 
        
    const [sparkles, setSparkles] = useState([]);

    useEffect(() => {
        const createSparkle = () => {
            return {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
            };
        };

        const newSparkles = Array.from({ length: 10 }, createSparkle);
        setSparkles(newSparkles);
    }, []);
//     const completedGoals = Math.floor(totalDonation / donationGoal);
// const remainingForCurrentGoal = totalDonation % donationGoal;

// const donationProgress = (remainingForCurrentGoal / donationGoal) * 100;

    return (
        <div>
            {!showForm && showGoal && (
                <div className="donation-goal">
                <h3>Donation Goal</h3>
                <p>Our goal is to raise Rs <span id="goalValue">20000</span> for the children.</p>
                <div className="progress-bar">
                    <div id="progressBar" style={{ width: `${(totalDonatedAmount / 20000) * 100}%` }}></div>
                </div>
                <div className="progress-info">
                    <span id="progressAmount">Rs{totalDonatedAmount}</span>
                    <span id="progressTotal">/ Rs20000</span>
                </div>
                {/* <h4>Donation Progress</h4>
                <div className="progress-bar">
                <div style={{ width: `${donationProgress}% `}}></div>
                </div>
                <p>{donationProgress.toFixed(2)}% completed</p> */}
                <div className="gift-box" id="giftBox" onClick={handleDonateNowClick}>
                    <div className="ribbon"></div>
                    <div className="box">
                            <button className="donate-button-inside" onClick={handleDonateNowClick}>Donate Now</button>
                        </div>
                        <div className="sparkles-container">
                            {sparkles.map((sparkle, index) => (
                                <div
                                    key={index}
                                    className="sparkle"
                                    style={{ right: sparkle.right, left: sparkle.left, top: sparkle.top, bottom: sparkle.top }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {showForm && (
                <div className={`paymentFormContainer ${showForm ? 'show' : ''}`}>
                    <button className="close-button" onClick={handleCloseForm}>X</button>
                    <DonationSection />
                </div>
            )}
            {donationGoalReached && (
                <div className="donation-allocation">
                    <h3>Donation Allocation</h3>
                    <p>Thank you for helping us reach our goal! Your donation will make a difference in the lives of the orphans.</p>
                </div>
            )}
            {donationStatus && <div className="notification">{donationStatus}</div>}
        </div>
    );
};

export default DonationForm;
