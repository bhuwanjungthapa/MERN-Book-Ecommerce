function createBookSchema(name, value) {
    switch (name) {
        case "title":
            if (value === "")
                return "Title  is required";
            else
                return false
        case "author":
            if (value === "")
                return "Author is required";
            else
                return false
        case "price":
            if (value === "")
                return "Price is Required";
            else
                return false
        default:
            break;
    }
}

export default createBookSchema;