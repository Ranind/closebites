"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const user_repository_service_1 = require("../api/user/user-repository.service");
let SignUpComponent = class SignUpComponent {
    constructor(router, route, userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.route.params.subscribe(params => {
            this.mode = params['mode'];
        });
        this.passwordMatch = true;
        this.emailExists = false;
    }
    go() {
        if (this.password != this.password2) {
            this.passwordMatch = (this.password == this.password2); //passwords don't match
            // console.log(this.userService.exists(this.email));
            //if (this.userService.exists(this.email))  //email address already exists
            //  this.emailExists = true;
            //else this.emailExists = false;
        }
        else {
            this.passwordMatch = true;
            this.emailExists = false;
            let body = { email: this.email, password: this.password,
                name: this.name, accountType: this.mode == 'vendor' ? 'vendor' : 'consumer' };
            if (this.mode == 'vendor') {
                body['address'] = this.address;
                body['type'] = this.type;
            }
            this.userService.register(body).then((x) => {
                console.log(x);
                if (x) {
                    if (this.mode == 'vendor')
                        this.router.navigate(['/vendor']);
                    else
                        this.router.navigate(['/user']);
                }
                else {
                    this.error = true;
                }
            });
        }
    }
};
SignUpComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sign-up',
        templateUrl: 'sign-up.component.html',
        styleUrls: ['sign-up.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, user_repository_service_1.UserRepository])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=sign-up.component.js.map