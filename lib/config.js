/**
 * Created with IntelliJ IDEA.
 * User: eprystupa
 * Date: 10/6/13
 * Time: 1:15 AM
 */

module.exports = {

    scrapping: {
        parentsPortal: {
            site: "https://parents.westfieldnjk12.org",
            username: "olga@sqlapi.com",
            password: process.env.APP_PARENTS_PORTAL_PASSWORD
        }
    },

    storage: {
        mongoUrl: process.env.MONGOHQ_URL || "mongodb://localhost/myfamily2"
    },

    cron: {
        gradebook: process.env.APP_CRON_GRADEBOOK || "0 5,18 * * *"
    }
};
