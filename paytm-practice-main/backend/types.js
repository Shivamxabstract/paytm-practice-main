const Zod = require("zod");

const userSchema = Zod.object({
    firstName: Zod.string().optional(),
    lastName: Zod.string().optional(),
    password: Zod.string().min(6).optional(),
    userName: Zod.string().email().optional(),
})



module.exports = userSchema;