(()=>{
    module.exports = {
        name: "class",
        schema: {
            name: {
                type: Array,
                required: true
            },
            teachers: {
                type: Array,
                required: true
            },
            students: {
                type: Array,
                required: true
            },
            ket: {
                type: String,
                required: true
            }
        }
    };
})();