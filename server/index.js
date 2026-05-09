const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./Users.js");
const Project = require("./Projects.js");
const Team = require("./TeamName.js");
const TeamRoster = require("./TeamRoster.js");
const UserStory = require("./UserStory.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://protectorofmanix_db_user:survival6redone@cluster0.at6pfzv.mongodb.net/icsi418y?appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Signup
app.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        console.log(`User created! ${user}`);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { userid, password } = req.body;
        const user = await User.findOne({ userid, password });
        if (user) {
            res.send(user);
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all users (for dropdowns)
app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, { firstName: 1, lastName: 1 });
        res.send(userList);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create project
app.post('/createProject', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        console.log(`Project created! ${project}`);
        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all projects with resolved names
app.get('/getProjects', async (req, res) => {
    try {
        const projects = await Project.find();
        let responseDetails = [];
        for (const project of projects) {
            const manager = await User.findById(project.mgr_id);
            const owner = await User.findById(project.prod_owner_id);
            const team = await Team.findById(project.team_id);
            responseDetails.push({
                _id: project._id,
                proj_name: project.proj_name,
                proj_desc: project.proj_desc,
                manager_details: manager,
                owner_details: owner,
                teams_details: team
            });
        }
        res.send(responseDetails);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create team
app.post('/createTeam', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        console.log(`Team created! ${team}`);
        res.send(team);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all teams
app.get('/getTeams', async (req, res) => {
    try {
        const teams = await Team.find();
        res.send(teams);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add members to team
app.post('/addTeamMembers', async (req, res) => {
    try {
        const { team_id, member_ids } = req.body;
        const rosters = member_ids.map(member_id => ({ team_id, member_id }));
        // Insert only if not already exists
        const inserted = [];
        for (const roster of rosters) {
            const exists = await TeamRoster.findOne({ team_id: roster.team_id, member_id: roster.member_id });
            if (!exists) {
                const saved = await TeamRoster.create(roster);
                inserted.push(saved);
            }
        }
        res.send(inserted);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get team members
app.get('/getTeamMembers/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const rosters = await TeamRoster.find({ team_id: teamId }).populate('member_id');
        res.send(rosters);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Remove members from team
app.delete('/removeTeamMembers', async (req, res) => {
    try {
        const { team_id, member_ids } = req.body;
        await TeamRoster.deleteMany({ team_id, member_id: { $in: member_ids } });
        res.send({ message: 'Members removed' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Create user story
app.post('/createUserStory', async (req, res) => {
    try {
        const userStory = new UserStory(req.body);
        await userStory.save();
        res.send(userStory);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get user stories for a project
app.get('/getUserStories/:projId', async (req, res) => {
    try {
        const { projId } = req.params;
        const stories = await UserStory.find({ proj_id: projId });
        res.send(stories);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get user data for home page
app.get('/getUserData/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // Get teams where user is member
        const teamRosters = await TeamRoster.find({ member_id: userId }).populate('team_id');
        let teams = teamRosters.map(r => r.team_id);
        // Deduplicate teams by _id
        teams = Array.from(new Map(teams.map(t => [t._id.toString(), t])).values());
        // Get projects for those teams
        const projects = await Project.find({ team_id: { $in: teams.map(t => t._id) } });
        // Get user stories for those projects
        const userStories = await UserStory.find({ proj_id: { $in: projects.map(p => p._id) } });
        res.send({ teams, projects, userStories });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(9000, () => {
    console.log("Server running on port 9000");
});