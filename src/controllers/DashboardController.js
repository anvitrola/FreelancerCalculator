const Job = require("../models/Job.js");
const Profile = require("../models/Profile.js");
const JobUtils = require("../utils/jobUtils.js");

module.exports = {
    async index(_, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();
        let jobTotalHours = 0;

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? "done" : "progress";

            //Ex.: statusCount[done] += 1 --> vai pegar o "done" dentro do statusCount e vai somar 1. Se o status for progress, vai pegar o "progress" e somar 1
            statusCount[status] += 1;

            jobTotalHours = status == "progress" ? jobTotalHours += Number(job["daily-hours"]) : jobTotalHours;


            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile   ["value-hour"])
            }
        });

        //qtd de horas que quero trabalhar - qtd de horas de cada job em progresso
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours})
    }
}