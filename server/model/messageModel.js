const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        message:{
            text : {
                    type:String,
                    required : true
                }
            },
        users : Array,
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required : true,
        }
    },
    {
     timestamps : true
    }
);

module.exports = mongoose.model("Messages" , messageSchema);

// Fields in the Schema:
// message: This is an object that contains:

// text: A string that is required (type: String, required: true).
// users: This is an array (users: Array). The content of this array is not specified in detail, so it can hold any kind of data.

// ObjectId: This is a special type in MongoDB that is used as a unique identifier for documents. It's a 12-byte identifier typically used for the _id field in MongoDB collections.
// mongoose.Schema.Types.ObjectId: In Mongoose, this specifies that the type of this field is an ObjectId. This tells Mongoose that this field will store ObjectId values.
// ref: This option tells Mongoose that this field is a reference to another document in a different collection.

// "Users": This is the name of the collection that this field references. In this case, it indicates that the sender field references the "Users" collection.

// sender: This is an object with:

// type: It references an ObjectId (type: mongoose.Schema.Types.ObjectId) from the "User" collection (ref: "Users"), making it a relational reference.
// required: This field is required (required: true).
// Schema Options:
// timestamps: The { timestamps: true } option tells Mongoose to automatically add createdAt and updatedAt timestamps to the schema.