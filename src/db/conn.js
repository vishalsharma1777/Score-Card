const mongoose = require("mongoose");

        mongoose.connect("mongodb+srv://Vishal:vu6ywxhp3M05UTYb@userregistration.jcaijdw.mongodb.net/test", {
        }).then(() => {
            console.log(`connection successful`);
        }).catch((e) => {
            console.log(`connection failed`)
        })
        //mongodb+srv://Vishal:vu6ywxhp3M05UTYb@userregistration.jcaijdw.mongodb.net/test
        //mongodb://localhost:27017/scoreCard

// // COMMENT THE ABOVE AND UN COMMENT THE BELOW IF YOU WANT TO USE IT IN YOUR LOCAL DATABAE AND VICE VERSA


// const mongoose = require("mongoose");

//         mongoose.connect("mongodb://localhost:27017/scoreCard", {
//         }).then(() => {
//             console.log(`connection successful`); //if connection is established 
//         }).catch((e) => {
//             console.log(`connection failed`) //if connection is not successfull

//         })