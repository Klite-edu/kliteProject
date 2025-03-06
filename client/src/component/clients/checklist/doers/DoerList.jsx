import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoerList = () => {
    const [doers, setDoers] = useState([]);

    useEffect(() => {
        const fetchDoers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/doers');
                setDoers(res.data);
            } catch (error) {
                console.error('Error fetching doers:', error);
            }
        };
        fetchDoers();
    }, []);

    return (
        <div>
            <h2>Doer List</h2>
            <ul>
                {doers.map((doer, index) => (
                    <li key={index}>{doer.name} - {doer.department} ({doer.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default DoerList;
