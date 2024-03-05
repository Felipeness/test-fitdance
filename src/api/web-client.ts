/* eslint-disable */
import { SdkgenError, SdkgenErrorWithData, SdkgenHttpClient } from "@sdkgen/browser-runtime";

export type InvalidArgumentDataReason = "required" | "invalid" | "minLength" | "maxLength";

export interface InvalidArgumentData {
    field: string
    reason: InvalidArgumentDataReason
}

export interface User {
    name: string
    email: string
    password: string
    cpf: string
    birthDate: Date
}

export interface SetupUser {
    name: string
    email: string
    password: string
    cpf: string
    birthDate: Date
}

export interface UserInfo {
    name: string
    email: string
    password: string
    cpf: string
    birthDate: Date
    id: number
    isActive: boolean
    inactiveReason: string | null
    deletedAt: Date | null
}

export class UserNotFound extends SdkgenError {}

export class InvalidArgument extends SdkgenErrorWithData<InvalidArgumentData> {}

export class Fatal extends SdkgenError {}

export class ApiClient extends SdkgenHttpClient {
    constructor(baseUrl: string) {
        super(baseUrl, astJson, errClasses);
    }

    activateUser(args: {userId: number}): Promise<boolean> { return this.makeRequest("activateUser", args || {}); }
    createUser(args: {user: SetupUser}): Promise<UserInfo> { return this.makeRequest("createUser", args || {}); }
    deleteUser(args: {userId: number}): Promise<boolean> { return this.makeRequest("deleteUser", args || {}); }
    getAllUsers(args?: {}): Promise<UserInfo[]> { return this.makeRequest("getAllUsers", args || {}); }
    getUserById(args: {id: number}): Promise<UserInfo> { return this.makeRequest("getUserById", args || {}); }
    inactivateUser(args: {userId: number, reason?: string | null}): Promise<boolean> { return this.makeRequest("inactivateUser", args || {}); }
    updateUser(args: {id: number, user: SetupUser}): Promise<UserInfo> { return this.makeRequest("updateUser", args || {}); }
}

const errClasses = {
    UserNotFound,
    InvalidArgument,
    Fatal
};

const astJson = {
    annotations: {},
    errors: [
        "UserNotFound",
        [
            "InvalidArgument",
            "InvalidArgumentData"
        ],
        "Fatal"
    ],
    functionTable: {
        activateUser: {
            args: {
                userId: "uint"
            },
            ret: "bool"
        },
        createUser: {
            args: {
                user: "SetupUser"
            },
            ret: "UserInfo"
        },
        deleteUser: {
            args: {
                userId: "int"
            },
            ret: "bool"
        },
        getAllUsers: {
            args: {},
            ret: "UserInfo[]"
        },
        getUserById: {
            args: {
                id: "uint"
            },
            ret: "UserInfo"
        },
        inactivateUser: {
            args: {
                userId: "int",
                reason: "string?"
            },
            ret: "bool"
        },
        updateUser: {
            args: {
                id: "uint",
                user: "SetupUser"
            },
            ret: "UserInfo"
        }
    },
    typeTable: {
        InvalidArgumentData: {
            field: "string",
            reason: "InvalidArgumentDataReason"
        },
        User: {
            name: "string",
            email: "email",
            password: "string",
            cpf: "string",
            birthDate: "date"
        },
        SetupUser: {
            name: "string",
            email: "email",
            password: "string",
            cpf: "string",
            birthDate: "date"
        },
        UserInfo: {
            name: "string",
            email: "email",
            password: "string",
            cpf: "string",
            birthDate: "date",
            id: "uint",
            isActive: "bool",
            inactiveReason: "string?",
            deletedAt: "date?"
        },
        InvalidArgumentDataReason: [
            "required",
            "invalid",
            "minLength",
            "maxLength"
        ]
    }
} as const;
