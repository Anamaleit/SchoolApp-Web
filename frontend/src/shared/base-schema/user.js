(()=>{
    module.exports = {
        name: "user",
        schema: {
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            }
        }
    };
})();