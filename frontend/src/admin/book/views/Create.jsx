import validator from "utils/validator";
import createBookSchema from "utils/createBookSchema";
import Input from "common/Input";
import Button from "common/Button";
import { useState } from "react";

import { postBook } from 'api/request.api';
import { useNavigate } from "react-router-dom";

function Create() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        title: "",
        author: "",
        price:"",
        discount:"",
        image: ""
    });

    const [errors, setErrors] = useState({});

    const validate = validator(createBookSchema);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setData({ ...data, [e.target.name]: e.target.files[0] });
          } else {
            const { name, value } = e.target;
            validate(name, value, { errors, setErrors });
            setData({ ...data, [name]: value });
          }
    }
   
    const isValid = () => {
        for (const [key, value] of Object.entries(data))
            validate(key, value, { errors, setErrors })

        if (Object.keys(errors).length === 0)
            return true
        else
            return false
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValid()) {
            try{
                const res = await postBook(data);//call axios from register
                console.log(res);
                navigate("/admin/book");
            }catch(err)
            {
                setErrors(err.response.data.error);
            }
        } else {
            console.log("Form validation failed");
        }
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row vh-100 justify-content-center align-items-center" style={{ "backgroundColor": "darkgray" }}>
                    <div className="col-5">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1>Create Book</h1>
                            </div>

                            <div className="col-12 border rounded-2 p-5 bg-white">
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        label="Title"
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={data.title}
                                        error={errors?.title}
                                        handler={handleChange}
                                    />
                                    <Input
                                        label="Author"
                                        type="text"
                                        name="author"
                                        id="author"
                                        value={data.author}
                                        error={errors?.author}
                                        handler={handleChange}
                                    />
                                    <Input
                                        label="Price"
                                        type="text"
                                        name="price"
                                        id="price"
                                        value={data.price}
                                        error={errors?.price}
                                        handler={handleChange}
                                    />
                                    <Input
                                        label="Discount"
                                        type="text"
                                        name="discount"
                                        id="discount"
                                        value={data.discount}
                                        error={errors?.discount}
                                        handler={handleChange}
                                    />
                                    <Input
                                        label="Image"
                                        type="file"
                                        name="image"
                                        id="image"
                                        error={errors?.image}
                                        handler={handleChange}
                                    />
                                   
                                    
                                   
                                   
                                    <Button
                                        type="submit"
                                        label="Create"
                                        color="primary"
                                    />

                                </form>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;