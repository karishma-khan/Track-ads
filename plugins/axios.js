export default function({ $axios, redirect }) {
    // This function is executed every time a request is made using $axios in the application.

    $axios.onRequest(config => {
        // This onRequest hook allows you to modify the request configuration before it is sent.

        config.withCredentials = true;
        // Set the 'withCredentials' property to 'true' to ensure that credentials (such as cookies) are sent with the request.
        // This is useful when making requests to a different domain where the API requires authentication.

        return config;
        // Return the modified configuration so that Axios can proceed with the request.
    });
}
