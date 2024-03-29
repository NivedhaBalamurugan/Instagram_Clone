const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {

        title : {
            type: String, 
            required: true,
        },
        body : {
            type: String, 
            required: true,
        },
        photo : {
            type: Buffer,
            default: "no photo",
        },
        photoType: {
            type: String,
        },
        postedBy : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        comments : [
            {
				text: String,
				com_postedBy: {
					type:  mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			},
        ]

    },
    {
        timestamps : true,
    }

)

module.exports = mongoose.model("Post" , PostSchema)