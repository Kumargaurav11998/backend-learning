import { z } from "zod";

export const DeviceSchema = z.object({
    body: z.object({
        pushtoken: z.string({
            message: "Push token is required",
        }),
        os: z.string({
            message: "OS is required",
        }),
        devicename: z.string({
            message: "Device name is required",
        }),
        
        appversion: z.string({
            message: "App version is required",
        }),
    })
})