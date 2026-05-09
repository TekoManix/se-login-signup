const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    proj_name: String,
    proj_desc: String,
    prod_owner_id: mongoose.Schema.Types.ObjectId,
    mgr_id: mongoose.Schema.Types.ObjectId,
    team_id: mongoose.Schema.Types.ObjectId
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;