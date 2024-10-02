import { CreateUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserWithAdminDto } from "./dto/admin-user.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
        
    ) {}

    /**
     * Método para iniciar sesión
    //  */
    async login(loginUser: LoginUserDto): Promise<{ token: string }> {
        const user = await this.usersRepository.findOneBy({ email: loginUser.email });

        // Verificar si la contraseña coincide
        const isPasswordMatching = user && await bcrypt.compare(loginUser.password, user.password);
        if (!isPasswordMatching) {
            throw new HttpException('Email o password incorrectos', HttpStatus.UNAUTHORIZED);
        }

        const token = await this.createToken(user);
        return { token };
    }

    /**
     * Método para crear el token JWT
     */
    public async createToken(user: User): Promise<string> {
        const payload = {
          id: user.id,
          email: user.email,
          admin: user.admin
        };
        const token = await this.jwtService.signAsync(payload);
        user.token = token; // Assign the token to the user object
        return token;
      }
    public async getToken(user: User): Promise<string> {
        return this.createToken(user);
      }
    /**
     * Método para obtener usuarios con paginación
     */
    async getUsers(page: number, limit: number): Promise<UserWithAdminDto[]> {
        const offset = (page - 1) * limit; 

        const users = await this.usersRepository.find({
            skip: offset,
            take: limit 
        });

        return users.map(user => {
            const userDto = new UserWithAdminDto();
            userDto.name = user.name;
            userDto.email = user.email;
            userDto.address = user.address;
            userDto.phone = user.phone;
            userDto.city = user.city;
            userDto.admin = user.admin;
            return userDto;
        });
    }

    /**
     * Método para obtener un usuario por ID
     */
    async getUserById(id: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
    }

    /**
     * Método para crear un nuevo usuario
     */
    async createUser(createUser: CreateUserDto): Promise<User> {
        // Verificar que las contraseñas coincidan
        if (createUser.password !== createUser.passwordConfirm) {
            throw new HttpException('La contraseña no coincide', HttpStatus.BAD_REQUEST);
        }
    
        // Verificar si el email ya existe en la base de datos
        const existingUser = await this.usersRepository.findOne({ where: { email: createUser.email } });
        if (existingUser) {
            throw new HttpException('El email ya está registrado', HttpStatus.CONFLICT);
        }
    
        // Crear una nueva instancia de usuario
        const newUser = new User();
        Object.assign(newUser, createUser);
    
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(createUser.password, 10);
        newUser.password = hashedPassword;
    
        try {
            return await this.usersRepository.save(newUser);
        } catch (error) {
            // Manejo de errores para identificar claves duplicadas
            if (error.code === '23505') { // Código de error para violación de restricción de unicidad en PostgreSQL
                throw new HttpException('Error de duplicación de clave: ' + error.detail, HttpStatus.CONFLICT);
            }
            throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    /**
     * Método para encontrar un usuario por email
     */
    async findOneEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } });
    }

    /**
     * Método para actualizar un usuario
     */
    async updateUsers(id: string, userUpdate: updateUserDto): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException(`El usuario con ID ${id} no fue encontrado`, HttpStatus.NOT_FOUND);
        }

        if (userUpdate.password) {
            userUpdate.password = await bcrypt.hash(userUpdate.password, 10);
        }

        Object.assign(user, userUpdate);
        return this.usersRepository.save(user);
    }

    /**
     * Método para eliminar un usuario
     */
    async removeUsers(id: string): Promise<string> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException(`El usuario con ID ${id} no fue encontrado`, HttpStatus.NOT_FOUND);
        }

        await this.usersRepository.remove(user);
        return id;
    }
}
