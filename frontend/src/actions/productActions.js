import { PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../productConstants"
 import axios from "axios";
export const listProducts =() => async(dispatch)=>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    try {
        const { data } = await axios.get("/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS , payload :data})
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAILED , payload :error.message})
        
    }
}

 export const detailsProduct = (productId)=> async (dispatch)=>{
    dispatch({type:PRODUCT_DETAILS_REQUEST , payload: productId});
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({type:PRODUCT_DETAILS_SUCCESS , payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAILED , payload: error.response &&  error.response.data.message ? error.response.data.message : error.message})
    }
 }
