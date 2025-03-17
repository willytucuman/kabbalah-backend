import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HasRoleEnums } from 'src/common/decorators/has-roles.decorator';
import { PaginationArgs } from 'src/common/pagination/pagination.dto';
import { RoleEnum } from 'src/constants';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RoleEnumsGuard } from '../auth/guards/roles.guard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HasRoleEnums(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RoleEnumsGuard)
  @Post('')
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiBearerAuth()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @HasRoleEnums(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RoleEnumsGuard)
  @Get('/')
  @ApiOperation({
    summary: 'Gets a paginated list of all users',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getAllUsers(@Query() pagination: PaginationArgs, @Req() req) {
    const { userId } = req.user;
    return this.usersService.getAllUsers(pagination, userId);
  }

  @HasRoleEnums(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RoleEnumsGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Gets a user by its ID' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getUserById(id);
  }

  @HasRoleEnums(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RoleEnumsGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Updates an existing user' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, data);
  }

  @HasRoleEnums(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RoleEnumsGuard)
  @Delete('/:id')
  @ApiOperation({ summary: 'Deletes a user' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}
