(()=>{
    module.exports = {
        name: "student",
        schema: {
            name: {
                type: String,
                required: true
            },
            parents: {
                type: Array,
                required: true
            },
            num: {
                type: Number,
                required: true
            },
            ket: {
                type: String,
                required: true
            }
        }
    };
})();