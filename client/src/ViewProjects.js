import { React, useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function ViewProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/getProjects')
            .then((response) => setProjects(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <h1>View Projects</h1>
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Product Owner</th>
                        <th>Manager</th>
                        <th>Team</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.proj_name}</td>
                            <td>{project.proj_desc}</td>
                            <td>{project.owner_details ? `${project.owner_details.firstName} ${project.owner_details.lastName}` : 'N/A'}</td>
                            <td>{project.manager_details ? `${project.manager_details.firstName} ${project.manager_details.lastName}` : 'N/A'}</td>
                            <td>{project.teams_details ? project.teams_details.team_name : 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewProjects;