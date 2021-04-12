const Job = require("../models/Job.js");
const JobUtils = require("../utils/jobUtils.js");
const Profile = require("../models/Profile.js");

module.exports = {
    index(_, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress"

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        });

        return res.render("index", {jobs: updatedJobs})
    },
    save(req, res) {
        const jobs = Job.get();
        const lastId = jobs[jobs.length - 1]?.id || 0; //getting last id || means do another thing if you don't find last id.

        jobs.push({
            id: lastId + 1,
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
    show(req, res){
        const jobId = req.params.id;
        const jobs = Job.get();
        const profile = Profile.get();

        const job = jobs.find(job => Number(jobId) === Number(job.id)); //return job with the required id and save it in const job
        if (!job) return res.send("Job not found!");

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

        return res.render("job-edit", {job})
    },
    update(req, res){
        const jobId = req.params.id;
        const jobs = Job.get();

        const job = jobs.find(job => Number(jobId) === Number(job.id)); 
        if (!job) return res.send("Job not found!");

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        };

        const newJob = jobs.map(job => {
            if(Number(job.id) === Number(jobId)){
                job = updatedJob
            }
            return job
        });

        Job.update(newJob);

        res.redirect("/job/" + jobId)
    },
    delete (req, res){
        const jobId = req.params.id;
        Job.delete(jobId);
        return res.redirect("/");
    }
}