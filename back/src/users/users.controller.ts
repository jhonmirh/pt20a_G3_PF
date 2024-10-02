import {
    Body,
    Controller,
    Res,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseGuards,
    Response,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserWithAdminDto } from "./dto/admin-user.dto";
import {
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiSecurity,
    ApiTags,
} from "@nestjs/swagger";
import UserResponseDto from "./dto/response-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { RolesGuard } from "src/guard/roles.guard";
import { Roles } from "src/decorators/roles.decorator";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    // @Post('login')
    // async login(@Body() loginUser: LoginUserDto, @Req() req: Request, @Res() res: Response) {
    //   try {
    //     const { user, token } = await this.usersService.login(loginUser);
    //     res.json({ user, token });
    //   } catch (error) {
    //     res.status(error.status || 500).json({ message: error.message });
    //   }
    // }
  

    @Post("register")
    @ApiOperation({ summary: "Crear un nuevo usuario" })
    @ApiResponse({
      status: 201,
      description: "Usuario creado exitosamente",
      type: CreateUserDto,
    })
    @ApiResponse({
      status: 500,
      description: "Error inesperado al crear el usuario",
    })
    async createUser(@Body() createUser: CreateUserDto): Promise<any> {
      try {
        // Llamada al servicio para crear un usuario
        const user = await this.usersService.createUser(createUser);
    
        // Devolver un JSON bien estructurado directamente
        return {
          success: true,
          message: "Usuario creado exitosamente",
          userId: user.id,
          user: {
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
            age: user.age,
            city: user.city,
          },
        };
      } catch (error) {
        // Manejo de errores y devolver un JSON con el mensaje de error
        throw new HttpException({
          success: false,
          message: error.message || "Error inesperado al crear el usuario",
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
  
    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Usuarios obtenidos', type: [UserWithAdminDto] })
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    @ApiSecurity("bearer")
    @ApiQuery({ name: "page", required: false, description: "Número de página", example: 1 })
    @ApiQuery({ name: "limit", required: false, description: "Cantidad de resultados por página", example: 5 })
    async getUsersPag(
      @Query("page") page: string = "1",
      @Query("limit") limit: string = "5"
    ): Promise<UserWithAdminDto[]> {
      // Conversión de los parámetros de consulta a números utilizando parseInt
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
    
      // Validar si pageNumber y limitNumber son números válidos
      if (isNaN(pageNumber) || isNaN(limitNumber)) {
        throw new HttpException('Parámetros de página o límite no válidos', HttpStatus.BAD_REQUEST);
      }
    
      return this.usersService.getUsers(pageNumber, limitNumber);
    }
    
    @Get(":id")
    @ApiOperation({ summary: "Obtener usuario por ID" })
    @ApiResponse({ status: 200, description: "Usuario obtenido", type: UserResponseDto })
    @ApiResponse({ status: 404, description: "Usuario no encontrado" })
    @UseGuards(AuthGuard)
    @ApiSecurity("bearer")
    @HttpCode(HttpStatus.OK)
    async getUser(@Param("id", new ParseUUIDPipe()) id: string): Promise<UserResponseDto> {
      const user = await this.usersService.getUserById(id);
      if (!user) {
        throw new HttpException("El usuario no fue encontrado", HttpStatus.NOT_FOUND);
      }
      return new UserResponseDto(user);
    }
  
    @Put(":id")
    @ApiOperation({ summary: "Actualizar un usuario por ID" })
    @ApiResponse({ status: 200, description: "Usuario actualizado", type: updateUserDto })
    @ApiResponse({ status: 404, description: "Usuario no encontrado" })
    @UseGuards(AuthGuard)
    @ApiSecurity("bearer")
    @HttpCode(HttpStatus.OK)
    async updateUsers(@Param("id", new ParseUUIDPipe()) id: string, @Body() updateUser: updateUserDto): Promise<User> {
      const user = await this.usersService.updateUsers(id, updateUser);
      if (!user) {
        throw new NotFoundException(`El usuario con ID ${id} no fue encontrado`);
      }
      return user;
    }
  
    @Delete(":id")
    @ApiOperation({ summary: "Eliminar un usuario por ID" })
    @ApiResponse({ status: 204, description: "Usuario eliminado exitosamente" })
    @ApiResponse({ status: 404, description: "Usuario no encontrado" })
    @UseGuards(AuthGuard)
    @ApiSecurity("bearer")
    @HttpCode(HttpStatus.OK)
    async deleteUsers(@Param("id", new ParseUUIDPipe()) id: string): Promise<{ id: string }> {
      const result = await this.usersService.removeUsers(id);
      if (!result) {
        throw new NotFoundException(`El usuario con ID ${id} no fue encontrado`);
      }
      return { id };
    }
  }
  
