import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserJwtGurad implements CanActivate{
    constructor(
        private readonly jwtService: JwtService) {}
    canActivate(
        context: ExecutionContext
        ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
            
        const tokenString = req.headers.authhorization;

        const [type, token] = tokenString.split(' ');

        if(type !== 'Bearer' || !token) {
            throw new UnauthorizedException({
                message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
            });
        }
        const user = this.jwtService.verify(token);
        req.user=user;

        console.log(user);
        return true;
    }
}