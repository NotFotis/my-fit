import keycloak from "../keycloak"

const apiKey = process.env.REACT_APP_API_LOCAL_KEY;
export const HeadersApi = ()=>{
    console.log(apiKey);
    return{
        "Content-Type": "application/json",
        'Authorization':  `Api-key ${apiKey}`,
        // 'Authorization': 'Bearer ' + keycloak.token
        'x-api-key':apiKey
    }
}