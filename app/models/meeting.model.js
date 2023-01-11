module.exports = mongoose => {

    // default with _id
    // const Meeting = mongoose.model(
    //     "meeting",
    //     mongoose.Schema(
    //         {
    //             title: String,
    //             capacity: String,
    //             active: Boolean
    //         },
    //         { timestamps: true }
    //     )
    // );

    // *** modified _id to id
    var schema = mongoose.Schema(
        {
            title: String,
            capacity: String,
            active: Boolean
        },
        { timestamps: true }
    )

    schema.method("toJSON", function () {
        const { _v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Meeting = mongoose.model("meeting", schema);
    // ***

    return Meeting;
}