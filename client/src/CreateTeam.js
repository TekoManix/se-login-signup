import { React, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function CreateTeam() {
    const [team_name, setTeamName] = useState('');

    const handleCreateTeam = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9000/createTeam', { team_name })
            .then((res) => alert('Team created successfully!'))
            .catch((err) => alert('Error creating team'));
    };

    return (
        <div>
            <NavBar />
            <div className="form-container">
                <h1>Create Team</h1>
                <form onSubmit={handleCreateTeam}>
                    <label>Team Name</label>
                    <input type="text" value={team_name} onChange={(e) => setTeamName(e.target.value)} required />
                    <button type="submit">Create Team</button>
                </form>
            </div>
        </div>
    );
}

export default CreateTeam;