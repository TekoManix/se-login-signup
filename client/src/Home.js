import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function Home() {
    const [user, setUser] = useState(null);
    const [data, setData] = useState({ teams: [], projects: [], userStories: [] });
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            axios.get(`http://localhost:9000/getUserData/${parsedUser._id}`)
                .then((res) => setData(res.data))
                .catch((err) => console.log(err));
        } else {
            navigate('/Login');
        }
    }, [navigate]);

    const handleSignOut = () => {
        localStorage.removeItem('user');
        navigate('/Login');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <h1>Welcome, {user.firstName} {user.lastName}!</h1>
                <button onClick={handleSignOut}>Sign Out</button>

                <h2>Your Teams</h2>
                <ul>
                    {data.teams.map(team => (
                        <li key={team._id}>{team.team_name}</li>
                    ))}
                </ul>

                <h2>Your Projects</h2>
                <ul>
                    {data.projects.map(project => (
                        <li key={project._id}>{project.proj_name}: {project.proj_desc}</li>
                    ))}
                </ul>

                <h2>User Stories</h2>
                <ul>
                    {data.userStories.map(story => (
                        <li key={story._id}>{story.user_story} (Priority: {story.priority})</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
