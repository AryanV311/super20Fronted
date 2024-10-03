/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";


// eslint-disable-next-line react-refresh/only-export-components
export const storeContext = createContext(null)

const StoreContextprovider = (props) => {

    const [cartItems, setCartItems] = useState({});  
    const [token, setToken] = useState("");
    const url = "https://super20backened.onrender.com";
    const[food_list, setFoodList] = useState([]);

    const addToCart = async(itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]:1}));
        }
        else{
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId] + 1}));
        }

        if(token){
            await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId] - 1}));
        if(token){
            await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}});
        }
    }
    
   const getTotalCartAmount =() => {
    let totalAmount = 0;
    for ( const item in cartItems){
        if(cartItems[item] > 0){
            let itemInfo = food_list.find((product) => product._id === item);
            totalAmount += itemInfo.price * cartItems[item]
        }
    }
       return totalAmount;
   }

   const fetchFoodList = async() => {
    try {
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.data)
    } catch (error) {
        console.log(error);
    }
   }

   const loadCartData = async(token) => {
    const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}})
    console.log(response.data.cartData);
    setCartItems(response.data.cartData);
   }


   useEffect(() => {
    async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
    }
    loadData();
   },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextprovider;