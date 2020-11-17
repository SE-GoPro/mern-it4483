import auth from '@utils/auth'
class BaseService {
    auth
    withAuth = () => {
        this.auth = auth()
        return this;
    }

    makeQuery(data = {}) {
        let query = [];
        for (let key in data) {
            if (Array.isArray(data[key])) {
                for (let value of data[key]) {
                    if (typeof value == "object") value = JSON.stringify(value)
                    query.push({
                        key: `${key}[]`,
                        value: value
                    })
                }
            } else if (typeof data[key] == "object") {
                query.push({
                    key: key,
                    value: JSON.stringify(data[key])
                })
            } else {
                query.push({
                    key: key,
                    value: data[key]
                })
            }
        }
        return query.map(q => `${q.key}=${q.value}`).join("&")
    }

    //  { url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any, options?: any }
    request = async ({
        url,
        method,
        data,
        options
    } = {}) => {
        if (["GET", "DELETE"].includes(method)) {
            url += "?" + this.makeQuery(data)
        } else {
            options = {
                ...options,
                body: JSON.stringify(data)
            }
        }
        let requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            ...options
        };

        if (this.auth && this.auth.token) {
            requestOptions.headers['Authorization'] = `Bearer ${this.auth.token}`;
        }
        const BASE_URL = process.env.REACT_APP_API_DOMAIN;

        const result = await fetch(BASE_URL + url, requestOptions)
        return await this.handleResponse(result)
    }

    handleResponse = async (response) => {
        const text = await response.text();
        let data = {
            data: "",
            message: ""
        }
        try {
            data = text && JSON.parse(text);
        } catch (e) {
            console.log(e)
        }
        let url = response.url || ""
        if (!response.ok) {
            if ([401].indexOf(response.status) !== -1 && !url.includes("/login")) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                auth().logout();
                window.location.href = "/login"
            }
            const error = data || (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data.data || data
    }
}

export default BaseService