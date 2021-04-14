const Job = require("../models/Job.js");
const JobUtils = require("../utils/jobUtils.js");
const Profile = require("../models/Profile.js");

module.exports = {
    async save(req, res) {
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        });

        return res.redirect('/')
    },
    create(req, res){
        return res.render("job")
    },
    async show(req, res){
        const jobId = req.params.id;
        const jobs = await Job.get();
        const profile = await Profile.get();

        const job = jobs.find(job => Number(jobId) === Number(job.id)); //return job with the required id and save it in const job
        if (!job) return res.send("Job not found!");

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

        return res.render("job-edit", {job})
    },
    async update(req, res){
        const jobId = req.params.id;

        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        };

        await Job.update(updatedJob, jobId);

        res.redirect("/job/" + jobId)
    },
    async delete (req, res){
        const jobId = req.params.id;
        await Job.delete(jobId);
        return res.redirect("/");
    }
}