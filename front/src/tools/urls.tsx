
const protocol = "http";
const baseURLdev = "localhost";
const port = "3000";

export default function urls() {
    return {
        auth: {
            login: {
                dev: `${protocol}://${baseURLdev}:${port}/auth/login`
            },
            register: {
                dev: `${protocol}://${baseURLdev}:${port}/auth/register`
            }
        }
    }
}