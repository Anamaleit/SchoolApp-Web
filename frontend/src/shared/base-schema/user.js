(()=>{
    const mongoose = require('mongoose');
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
            },
            isTeacher: {
                type: Boolean,
                required: true
            },
            viewableStudents: [{type: mongoose.Types.ObjectId}],
        }
    };
})();