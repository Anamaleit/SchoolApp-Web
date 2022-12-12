(()=>{
    module.exports = {
        name: "announcement",
        schema: {
            classes: {
                type: Array,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    };
})();