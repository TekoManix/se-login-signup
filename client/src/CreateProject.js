import { React, useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function CreateProject() {
    const [proj_name, setProjectName] = useState('');
    const [proj_desc, setProjectDescription] = useState('');
    const [prod_owner_id, setProductOwner] = useState('');
    const [mgr_id, setManager] = useState('');
    const [team_id, setTeam] = useState('');
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/getUsers')
            .then((response) => setUsers(response.data))
            .catch((error) => console.log(error));

        axios.get('http://localhost:9000/getTeams')
            .then((response) => setTeams(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleCreateProject = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9000/createProject', { proj_name, proj_desc, prod_owner_id, mgr_id, team_id })
            .then((res) => alert('Project created successfully!'))
            .catch((err) => alert('Error in creating project'));
    };

    return (
        <div>
            <NavBar />
            <div className="form-container">
                <h1>Create Project</h1>
                <form onSubmit={handleCreateProject}>
                    <label>Project Name</label>
                    <input type="text" value={proj_name} onChange={(e) => setProjectName(e.target.value)} required />

                    <label>Project Description</label>
                    <textarea value={proj_desc} onChange={(e) => setProjectDescription(e.target.value)} required />

                    <label>Product Owner</label>
                    <select onChange={(e) => setProductOwner(e.target.value)} value={prod_owner_id}>
                        <option value="">Select Product Owner</option>
                        {users.map((user, index) => (
                            <option key={index} value={user._id}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>

                    <label>Manager</label>
                    <select onChange={(e) => setManager(e.target.value)} value={mgr_id}>
                        <option value="">Select Manager</option>
                        {users.map((user, index) => (
                            <option key={index} value={user._id}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>

                    <label>Team</label>
                    <select onChange={(e) => setTeam(e.target.value)} value={team_id}>
                        <option value="">Select Team</option>
                        {teams.map((team, index) => (
                            <option key={index} value={team._id}>
                                {team.team_name}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Create Project</button>
                </form>
            </div>
        </div>
    );
}

export default CreateProject;