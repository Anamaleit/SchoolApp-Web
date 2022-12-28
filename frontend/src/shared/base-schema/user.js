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
            isTeacher: {type: Boolean},
            isAdmin: {type: Boolean},
            viewableStudents: [{type: mongoose.Types.ObjectId}],
        }
    };
})();