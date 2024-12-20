import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

function App() {
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [startTime, setStartTime] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [testMessage, setTestMessage] = useState('');

    useEffect(() => {
        // Set the start time when the user enters the site
        setStartTime(Date.now());

        // Calculate the time spent when the user leaves the site
        const handleBeforeUnload = () => {
            if (userInfo) {
                const timeSpent = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
                sendTimeSpent(timeSpent);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [startTime, userInfo]);

    const responseMessage = (response) => {
        try {
            // Decode the Google JWT token to extract user info
            const decodedToken = jwtDecode(response.credential);
            const { given_name, family_name, sub: googleId } = decodedToken;

            const userData = {
                firstName: given_name,
                lastName: family_name,
                googleId,
            };

            setUserInfo(userData);

            // Send user data to backend (MongoDB)
            fetch('https://ennjaywithagreyhat.github.io/portfolio/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
        } catch (error) {
            console.error('Error decoding token or sending data:', error);
        }
    };

    const sendTimeSpent = async (timeSpent) => {
        try {
            // Send time spent on site to backend
            await fetch('https://ennjaywithagreyhat.github.io/portfolio/api/users/time', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    googleId: userInfo.googleId,
                    timeSpent,
                }),
            });
        } catch (error) {
            console.error('Error sending time spent:', error);
        }
    };

    return (
        <div>
            <div className='disclaimer-container'>
            {showLoginButton &&(
                <p className="disclaimer" style={{ 
                    fontFamily: "'Times New Roman', serif",
                    position: "absolute",
                    left: "200%",
                    width: "1000%",
                 }}>
            By clicking "Sign in", you are consenting to your PUBLIC Google information being stored in my database.
            If this is an issue and you would like your information removed, reach out to <u>njsvoboda04@gmail.com</u></p>
            )}
            </div>
            {showLoginButton &&(
            <GoogleLogin
    onSuccess={(response) => {
        console.log('Login Success:', response);
        responseMessage(response);
        setShowLoginButton(false);
        console.log("Got here! Data passed to backend (very skibidi)");
    }}
    onError={() => {
        console.error('Login Failed');
    }}
/>
)}
        </div>
    );
}

export default App;