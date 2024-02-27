import React, { useState, useEffect } from 'react';
import Content from '../../Layout/Content/Content';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Welcome = () => {
    const [userProfile, setUserProfile] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3030/v1/user/profile/${userId}`);
                setUserProfile(response.data.profile);
            } catch (error) {
                console.error('Fehler beim Abrufen des Benutzerprofils:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    return (
        <Content>
            <div>
                <h2>Willkommen!</h2>
                {userProfile ? (
                    <div>
                        <p>Herzlich willkommen, {userProfile.firstName} {userProfile.lastName} (Benutzer mit der ID: {userId})!</p>
                        <p>E-Mail: {userProfile.email}</p>
                    </div>
                ) : (
                    <p>Lade Benutzerdaten...</p>
                )}
            </div>
        </Content>
    );
};

export default Welcome;
