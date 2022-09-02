import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Usuario } from 'app/models/usuario.interface';
 
@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    styleUrls: ['./sign-up.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
                nombre      : ['', Validators.required],
                organizacion      : ['', Validators.required],
                telefono      : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                password  : ['', Validators.required]
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;


        let datos: Usuario;

        datos = {
            id: 0,
            nombre: this.signUpForm.controls['nombre'].value,
            organizacion: this.signUpForm.controls['organizacion'].value,
            correo: this.signUpForm.controls['email'].value,
            password: this.signUpForm.controls['password'].value,
            telefono: this.signUpForm.controls['telefono'].value,
            tokenPassword: null,
            rol: {
                id: 1
            },
            estatus: 2
         };

        // Sign up
        this._authService.signUp(datos)
            .subscribe(
                (response) => {

                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {

                        // Set the alert
                        this.alert = {
                            type   : 'error',
                            message: response.error.message
                        };

                        // Show the alert
                        this.showAlert = true;

                        // Re-enable the form
                        this.signUpForm.enable();

                        // Reset the form
                        this.signUpNgForm.resetForm();
                }
            );
    }
}
