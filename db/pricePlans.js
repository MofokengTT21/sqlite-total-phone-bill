const knex = require("./knex");

function createPricePlan(pricePlan) {
    return knex('pricePlans').insert(pricePlan);
};

function getAllPricePlans() {
    return knex("pricePlans").select("*");
};

function deletePricePlan(id) {
    return knex("pricePlans").where("id", id).del();
};

function updatePricePlan(id, pricePlan) {
    return knex("pricePlans").where("id", id).update(pricePlan)
};

function getPricePlanByName(planName) {
    return knex("pricePlans").where("plan_name", planName).first(); 
}


module.exports = {
    getPricePlanByName,
    createPricePlan,
    getAllPricePlans,
    deletePricePlan,
    updatePricePlan,
}