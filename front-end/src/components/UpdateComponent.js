import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                console.error("No token found in local storage");
                return;
            }

            let result = await fetch(`http://localhost:5000/product/${params.id}`, {
                headers: {
                    authorization: `bearer ${token}`,
                },
            });

            if (result.status === 401) {
                console.error("Unauthorized - Invalid token");
                return;
            }

            result = await result.json();
            console.warn(result);
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const updateProduct = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                console.error("No token found in local storage");
                return;
            }

            console.warn(name, price, category, company);
            let result = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            });

            if (result.status === 401) {
                console.error("Unauthorized - Invalid token");
                return;
            }

            result = await result.json();
            console.warn(result);
            navigate("/");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="product">
            <h1>UPDATE PRODUCT</h1>
            <input
                type="text"
                placeholder="Enter Product Name"
                className="inputBox"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />

            <input
                type="text"
                placeholder="Enter Product Price"
                className="inputBox"
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value);
                }}
            />

            <input
                type="text"
                placeholder="Enter Product Category"
                className="inputBox"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
            />

            <input
                type="text"
                placeholder="Enter Product Company"
                className="inputBox"
                value={company}
                onChange={(e) => {
                    setCompany(e.target.value);
                }}
            />

            <button onClick={updateProduct} className="btn">
                Update Product
            </button>
        </div>
    );
};

export default UpdateProduct;
