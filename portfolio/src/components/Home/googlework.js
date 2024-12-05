import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

function App() {
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
            fetch('http://localhost:5000/api/users', {
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

    const errorMessage = (error) => {
        console.log('Login failed:', error);
    };

    const sendTimeSpent = async (timeSpent) => {
        try {
            // Send time spent on site to backend
            await fetch('http://localhost:5000/api/users/time', {
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

    const testBackend = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/test');
            const data = await response.json();
            setTestMessage(data.message);
        } catch (error) {
            console.error('Error testing backend:', error);
            setTestMessage('Failed to fetch test message');
        }
    };

    return (
        <div>
            <h1>Welcome to the Website</h1>
            <GoogleLogin
    onSuccess={(response) => {
        console.log('Login Success:', response);
        responseMessage(response);
        console.log("Got here, something needs to be modified I guess")
    }}
    onError={() => {
        console.error('Login Failed');
    }}
/>;
        </div>
    );
}

export default App;