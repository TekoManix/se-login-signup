import { React, useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

function ManageTeamRoster() {
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [currentMembers, setCurrentMembers] = useState([]);
    const [selectedToAdd, setSelectedToAdd] = useState([]);
    const [selectedToRemove, setSelectedToRemove] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/getTeams')
            .then((res) => setTeams(res.data))
            .catch((err) => console.log(err));
        axios.get('http://localhost:9000/getUsers')
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err));
    }, []);

    const fetchTeamMembers = (teamId) => {
        if (!teamId) {
            setCurrentMembers([]);
            return;
        }
        axios.get(`http://localhost:9000/getTeamMembers/${teamId}`)
            .then((res) => {
                let members = res.data.map(r => r.member_id).filter(m => m && m._id);
                // Deduplicate by _id
                members = Array.from(new Map(members.map(m => [m._id.toString(), m])).values());
                console.log('Fetched members:', members);
                setCurrentMembers(members);
            })
            .catch((err) => console.log('Error fetching members:', err));
    };

    const handleTeamChange = (e) => {
        const teamId = e.target.value;
        setSelectedTeam(teamId);
        fetchTeamMembers(teamId);
        setSelectedToAdd([]);
        setSelectedToRemove([]);
    };

    const handleAddMembers = () => {
        if (!selectedTeam || selectedToAdd.length === 0) {
            alert('Please select a team and at least one member to add');
            return;
        }
        console.log('Adding members:', selectedToAdd, 'to team:', selectedTeam);
        axios.post('http://localhost:9000/addTeamMembers', { team_id: selectedTeam, member_ids: selectedToAdd })
            .then((res) => {
                console.log('Add members response:', res.data);
                alert('Members added successfully');
                // Refresh the members list
                fetchTeamMembers(selectedTeam);
                setSelectedToAdd([]);
            })
            .catch((err) => console.log('Error adding members:', err));
    };

    const handleRemoveMembers = () => {
        if (!selectedTeam || selectedToRemove.length === 0) {
            alert('Please select at least one member to remove');
            return;
        }
        console.log('Removing members:', selectedToRemove, 'from team:', selectedTeam);
        axios.delete('http://localhost:9000/removeTeamMembers', { data: { team_id: selectedTeam, member_ids: selectedToRemove } })
            .then((res) => {
                console.log('Remove members response:', res.data);
                alert('Members removed successfully');
                // Refresh the members list
                fetchTeamMembers(selectedTeam);
                setSelectedToRemove([]);
            })
            .catch((err) => console.log('Error removing members:', err));
    };

    const availableUsers = users.filter(u => !currentMembers.some(m => m._id === u._id));

    return (
        <div>
            <NavBar />
            <div style={{ padding: '20px' }}>
                <h1>Manage Team Roster</h1>
                <label>Select Team:</label>
                <select value={selectedTeam} onChange={handleTeamChange}>
                    <option value="">Select a team</option>
                    {teams.map(team => (
                        <option key={team._id} value={team._id}>{team.team_name}</option>
                    ))}
                </select>

                {selectedTeam && (
                    <>
                        <h2>Current Members ({currentMembers.length})</h2>
                        <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px', minHeight: '20px' }}>
                            <strong>Debug - Current Members Count:</strong> {currentMembers.length}
                            <br />
                            {currentMembers.length > 0 ? (
                                <div>
                                    <strong>Members:</strong>
                                    <ul>
                                        {currentMembers.map(m => (
                                            <li key={m._id}>{m.firstName} {m.lastName} (ID: {m._id})</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <span style={{ color: 'red' }}>No members in this team yet</span>
                            )}
                        </div>
                        <select multiple value={selectedToRemove} onChange={(e) => setSelectedToRemove(Array.from(e.target.selectedOptions, o => o.value))} style={{ height: '150px', width: '300px', padding: '5px', color: 'black', backgroundColor: 'white' }}>
                            {currentMembers.map(member => (
                                <option key={member._id} value={member._id}>{member.firstName} {member.lastName}</option>
                            ))}
                        </select>
                        <button onClick={handleRemoveMembers}>Remove Selected Members</button>

                        <h2>Add Members</h2>
                        <select multiple value={selectedToAdd} onChange={(e) => setSelectedToAdd(Array.from(e.target.selectedOptions, o => o.value))} style={{ height: '150px', width: '300px', padding: '5px', color: 'black', backgroundColor: 'white' }}>
                            {availableUsers.map(user => (
                                <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                            ))}
                        </select>
                        <button onClick={handleAddMembers}>Add Selected Members</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ManageTeamRoster;
