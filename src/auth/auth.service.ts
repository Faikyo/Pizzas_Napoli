import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Customer } from '../entities/Customer';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Vérifier si l'email existe déjà
    const existingCustomer = await this.customerRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingCustomer) {
      throw new ConflictException('Email already exists');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(registerDto.mdp, 10);

    // Créer le client
    const customer = this.customerRepository.create({
      ...registerDto,
      mdp: hashedPassword,
    });

    const savedCustomer = await this.customerRepository.save(customer);

    // Retourner sans le mot de passe
    const { mdp, ...result } = savedCustomer;
    return result;
  }

  async login(loginDto: LoginDto) {
    // Trouver le client par email
    const customer = await this.customerRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!customer) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(loginDto.mdp, customer.mdp);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Générer le JWT token
    const payload = { sub: customer.idCustomer, email: customer.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }

  async getMe(userId: number) {
    const customer = await this.customerRepository.findOne({
      where: { idCustomer: userId },
    });

    if (!customer) {
      throw new UnauthorizedException('User not found');
    }

    // Retourner sans le mot de passe
    const { mdp, ...result } = customer;
    return result;
  }
}
