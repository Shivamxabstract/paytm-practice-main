import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";

export const userInfoSelector = selector({
    key: "userInfoSelector",
    get:async ({get})=>{
        const user = await axios.get(`http://localhost:3000/api/v1/user/`,{headers: {
            'Authorization': 'Bearer '+ localStorage.getItem("token"),
            'Content-Type': 'application/json'
          }});
        return user;
    }
})

export const balanceDetails = selector({
    key: "balanceDetailsSelector",
    get: async ({get})=>{
        const balance = await axios.get("http://localhost:3000/api/v1/account/balance",{headers: {
            'Authorization': 'Bearer '+ localStorage.getItem("token"),
            'Content-Type': 'application/json'
          }});
        return balance;
    }
})


export const usersSelector = selector({
    key: "usersSelector",
    get: async ({get})=>{
        const users = await axios.get("http://localhost:3000/api/v1/user/bulk",{headers: {
            'Authorization': 'Bearer '+ localStorage.getItem("token"),
            'Content-Type': 'application/json'
          }});
        return users;
    }
})


export const userQuery = selectorFamily({
    key: 'User',
    get: (userId) => async ({get}) => {
      const response = await fetch(`http://localhost:3000/api/v1/user/${userId}`);
      const user = await response.json();
  
      return user;
    },
  });