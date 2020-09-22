import { Role } from "Global/constants";
import roleData from "../mock/role_data.json";

function simulatedAPI (): Promise<{ data: Array<Role>}> {
    return new Promise ( function (resolve) {
        setTimeout ( () => {
            resolve(roleData);
        }, 500);
    });
}

function loadRoles (): Promise<{ data: Array<Role>}> {
    return simulatedAPI();
}

export { loadRoles };