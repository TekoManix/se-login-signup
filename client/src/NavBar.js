import { React } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#4a90d9', marginBottom: '20px' }}>
            <Link to="/Login" style={linkStyle}>Login</Link>
            <Link to="/Signup" style={linkStyle}>Signup</Link>
            <Link to="/Home" style={linkStyle}>Home</Link>
            <Link to="/CreateProject" style={linkStyle}>Create Project</Link>
            <Link to="/CreateTeam" style={linkStyle}>Create Team</Link>
            <Link to="/ManageTeamRoster" style={linkStyle}>Manage Team Roster</Link>
            <Link to="/CreateUserStory" style={linkStyle}>Create User Story</Link>
            <Link to="/ViewProjects" style={linkStyle}>View Projects</Link>
            <Link to="/ViewTeams" style={linkStyle}>View Teams</Link>
        </nav>
    );
}

const linkStyle = {
    color: 'white',
    marginRight: '15px',
    textDecoration: 'none',
    fontWeight: 'bold'
};

export default NavBar;