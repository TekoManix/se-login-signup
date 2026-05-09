import { React, useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function CreateUserStory() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [userStory, setUserStory] = useState('');
    const [priority, setPriority] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:9000/getProjects')
            .then((res) => setProjects(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/createUserStory', { user_story: userStory, proj_id: selectedProject, priority })
            .then(() => {
                alert('User story created');
                setUserStory('');
                setPriority(0);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <h1>Create User Story</h1>
                <form onSubmit={handleSubmit}>
                    <label>Select Project:</label>
                    <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} required>
                        <option value="">Select a project</option>
                        {projects.map(project => (
                            <option key={project.proj_name} value={project._id}>{project.proj_name}</option>
                        ))}
                    </select>
                    <label>User Story Description:</label>
                    <textarea value={userStory} onChange={(e) => setUserStory(e.target.value)} required />
                    <label>Priority:</label>
                    <input type="number" value={priority} onChange={(e) => setPriority(e.target.value)} />
                    <button type="submit">Create User Story</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUserStory;
