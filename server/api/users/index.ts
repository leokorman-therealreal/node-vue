import { User, PaginatedResult } from "Global/constants";
import userData from "../mock/user_data.json";

function simulatedAPI (index: number = 0, page: number = 10): Promise<{ data: PaginatedResult<User>}>{
    return new Promise (function (resolve) {
        setTimeout ( () => {
            const total = userData.data.length;
            let results: User[] = [];
            if (total > 0){
                let from = Number(index);
                let to = from + Number(page);
                results = userData.data.slice (from, to);
            }
            resolve({
                data: {
                    results,
                    index,
                    page,
                    total
                }
            });
        }, 500);
    });
}

function loadUsers (index?: number, page?: number): Promise<{ data: PaginatedResult<User>}> {
    return simulatedAPI(index, page);
}

export { loadUsers };