const Profile = require("../models/Profile.js");

module.exports = {
    async index(req, res) { 
        return res.render("profile", { profile: await Profile.get()})
    }, 
    async update(req, res){
        const profile = await Profile.get();
        const data = req.body;
        const weeksPerYear = 52;

        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;

        const valueHour = data["monthly-budget"] / monthlyTotalHours;

        await Profile.update({
            ...profile,
            ...req.body, //sobrescrevendo os campos do Profile.get()
            "value-hour": valueHour
        });
        
        return res.redirect("profile");
    }
}