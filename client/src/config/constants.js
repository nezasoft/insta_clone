export const config = (jwt) =>{
    return {
        headers: {
            Authorization: "Bearer" + jwt,
        },
    };
};

