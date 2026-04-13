import { React, useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function ViewTeams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/getTeams')
            .then((response) => setTeams(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <h1>View Teams</h1>
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th>Team Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teams.map((team, index) => (
                        <tr key={index}>
                            <td>{team.team_name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewTeams;