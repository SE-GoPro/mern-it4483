import Base from "./baseService";

class Service extends Base {
    index = async (filter) => {
        return this.request({
            url: "/api/users",
            method: "GET",
            data: filter,
        });
    };
    create = async (data) => {
        return this.request({
            url: "/api/users",
            method: "POST",
            data: data
        });
    };
    edit = async (user) => {
        return this.request({
            url: `/api/users/${user.id}`,
            method: "PUT",
            data: user
        });
    };
    detail = async (id) => {
        return this.request({
            url: `/api/users/${id}`,
            method: "GET",
            data: {
                id
            },
        });
    };
    delete = async ({
        ids
    } = {}) => {
        return this.request({
            url: "/api/users",
            method: "DELETE",
            data: {
                ids
            },
        });
    };

    login = async ({
        email,
        password,
    } = {}) => {
        return this.request({
            url: "/api/users/login",
            method: "POST",
            data: {
                email,
                password
            },
        });
    };
}

export default () => new Service();