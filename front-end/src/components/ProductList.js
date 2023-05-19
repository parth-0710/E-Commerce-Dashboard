import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                console.error("No token found in local storage");
                return;
            }

            let result = await fetch("http://localhost:5000/products", {
                headers: {
                    authorization: `bearer ${token}`,
                },
            });

            if (result.status === 401) {
                console.error("Unauthorized - Invalid token");
                return;
            }

            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                console.error("No token found in local storage");
                return;
            }

            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${token}`,
                },
            });

            if (result.status === 401) {
                console.error("Unauthorized - Invalid token");
                return;
            }

            result = await result.json();
            if (result) {
                getProducts();
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const searchHandle = async (event) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                console.error("No token found in local storage");
                return;
            }

            let key = event.target.value;
            if (key) {
                let result = await fetch(`http://localhost:5000/search/${key}`, {
                    headers: {
                        authorization: `bearer ${token}`,
                    },
                });

                if (result.status === 401) {
                    console.error("Unauthorized - Invalid token");
                    return;
                }

                result = await result.json();
                if (result) {
                    setProducts(result);
                }
            } else {
                getProducts();
            }
        } catch (error) {
            console.error("Error searching products:", error);
        }
    };

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input
                type="text"
                placeholder="Search Product"
                className="search-product-box"
                onChange={searchHandle}
            />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {products.length > 0 ? (
                products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>DELETE</button>
                            <Link to={"/update/" + item._id}>UPDATE</Link>
                        </li>
                    </ul>
                ))
            ) : (
                <h1>No Product Found</h1>
            )}
        </div>
    );
};

export default ProductList;
