import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../repository/authRepository';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export class AuthService {
    private authRepo: AuthRepository;

    constructor() {
        this.authRepo = new AuthRepository();
    }

    async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
}) {
    //Check if user exists
    const existingUser = await this.authRepo.findByEmail(data.email);
    if (existingUser) {
        throw new Error ('User with this email already exists');
    }

    //Hashing of password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    //Cretae user
    const user = await this.authRepo.createUser({
        ...data,
        password: hashedPassword,
        role: (data.role as any) || 'STAFF',
    });

    return { message: 'User registered successfully' }
}

async login (email: string, password: string) {
    const user = await this.authRepo.findByEmail(email);
    if(!user) {
        throw  new Error ('Invalid credentials');
    }

    if (user.isActive === false) {
        throw new Error('Account is deactivated');
    } 

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error ('Password Invalid');
    }    
    
    //Generate JWT 
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET!,
        { expiresIn: JWT_EXPIRES_IN }
    );

    await this.authRepo.updateLastLogin(user.id);

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }
    };
}

    async logout() {
        return { message: 'Logged out Successfully' }
    }   
}

