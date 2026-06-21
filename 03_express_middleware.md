# 🛠️ Express Middleware & Global Error Handling (Hinglish)

Express mein **Middleware** aur **Global Error Handling** do aisi powers hain jo aapke code ko clean, reusable aur secure banati hain. Chaliye inhe detail mein samajhte hain.

---

## 🚦 Middleware Kya Hota Hai? (What is Middleware?)

Middleware ko aap ek **"Checkpost / Filter"** ki tarah samajh sakte hain. Jab client server ko request bhejta hai, toh controller function chalne se PEHLE request in checkposts se guzarti hai.

```mermaid
graph LR
    Client[Client Request] --> MW1[Middleware 1: Body Parser]
    MW1 --> MW2[Middleware 2: Authenticate]
    MW2 --> MW3[Middleware 3: Validate Inputs]
    MW3 --> Controller[Controller API Logic]
    Controller --> Response[Send Response]
```

Har middleware ke paas teen properties ka access hota hai:
1. `req` (Request Object)
2. `res` (Response Object)
3. `next` (Next function - call karne par request agle checkpost/middleware/controller par chali jati hai)

Agar kisi middleware ko lagta hai ki request sahi nahi hai, toh wo request ko aage badhne se rok sakta hai (jaise `res.status(401).send(...)` call karke return ho jaye, bina `next()` chalaye).

---

## 🛡️ Types of Middleware in Express

### 1. Built-in Middlewares
Jaise `express.json()`. Yeh incoming raw text requests ko automatic JSON main parse kar deta hai.
```typescript
app.use(express.json()); // Mounts globally
```

### 2. Custom Authentication Middleware
Aapke project mein [auth.middleware.ts](file:///c:/Gaurav/backend/backend-learning/src/middleware/auth.middleware.ts) iska solid example hai:
```typescript
export const protectRoute = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
     res.status(401).json({ success: false, message: "No token provided" });
     return; // response yahi se return, next() execute nahi hoga!
  }
  // JWT verification successfully hone par:
  req.user = decodedUser;
  next(); // Request aage controller function pe chali jayegi
};
```

### 3. Custom Input Validation Middleware
Aapke project mein [validate.middleware.ts](file:///c:/Gaurav/backend/backend-learning/src/middleware/validate.middleware.ts) standard Zod validation process karta hai. Controller logic run hone se pehle check ho jata hai ki body structure correct hai ya nahi.

---

## 💥 Global Error Handling (Advanced Practice)

Agar aap har controller ke code mein manually `try-catch` lagayenge, toh controller file duplicate lines se bhar jayegi aur use maintenance karna impossible ho jayega.

Aapke project mein humne ek centralized error tracking pattern use kiya hai jo 3 components par chalta hai:

### 1. Custom `AppError` Class
Normal Error class ko extend karke humne status codes aur static errors manage karne ke liye [appError.ts](file:///c:/Gaurav/backend/backend-learning/src/utils/appError.ts) banaya:
```typescript
export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
```

### 2. Async Handler Wrapper (`asyncHandler`)
Yeh wrapper functions controller ke functions ko wrap karta hai. Agar controller mein kahin bhi error aati hai (jaise `throw new AppError("User not found", 404)`), toh use automatically catch karke checkpost (Express `next()`) ke paas bhej deta hai.
```typescript
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next); // catches error & passes to next()
  };
};
```

### 3. Global Error Handling Middleware
Express tabhi kisi middleware ko error handler ki tarah treat karta hai jab use **exactly 4 parameters** diye jayein (`err, req, res, next`). 

Check out [error.middleware.ts](file:///c:/Gaurav/backend/backend-learning/src/middleware/error.middleware.ts):
```typescript
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
```

### How they work together:
Controller mein sirf logic likhein aur throws execute karein:
```typescript
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new AppError("User not found", 404); // Caught by asyncHandler -> sent to globalErrorHandler
  }
  res.status(200).json({ success: true, data: user });
});
```
Isse backend stability bohot improve hoti hai aur single standard error template poori app pe client side implement ho jati hai.
