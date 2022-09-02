import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FolderService } from 'app/service/folder.service';
import { AuthService } from 'app/core/auth/auth.service';


@Component({
    selector: 'classy-layout',
    templateUrl: './classy.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ConfirmationService, MessageService]
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    tipoRol: string;
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        public dialog: MatDialog,
        private _authService: AuthService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to the user service
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

            this.tipoRol = this._authService.tipoUsuario;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    openDialog() {
        const dialogRef = this.dialog.open(subirArchivo);
    
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

}


@Component({
    selector: 'subirArchivo',
    templateUrl: 'subirArchivos.html',
    styleUrls: ['subirArchivo.scss'],
    providers: [ConfirmationService, MessageService]
})
export class subirArchivo  {
    formTaller: FormGroup;

    talleres = [{
        id: 1,
        name: 'Taller 1',
        description: 'description 1'
    }, {
        id: 2,
        name: 'Taller 2',
        description: 'description 2'
    }]

    

    constructor(private fb: FormBuilder,
        public folderService: FolderService,
        private messageService: MessageService,
        public dialog: MatDialog
        ) { }

    ngOnInit() {

        this.formTaller = this.fb.group({
            tallerSelect: [null, Validators.required],
            nombrePresentacion: [null, Validators.required],
            descripcion: [null, Validators.required],
            archivo: [null, Validators.required]
        });

        const toSelect = this.talleres.find(c => c.id == 3);
        this.formTaller.get('tallerSelect').setValue(toSelect);
        
        
    }

    selectedFile: any = null;
    private archivo: File = null;

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0] ?? null;
        this.archivo = event.target.files[0];
    }

    public subirArchivo() : void {
        
        console.log(this.archivo);
        console.log(this.formTaller.get('tallerSelect').value.id);
        this.folderService.subirArchivo(this.archivo, this.formTaller.get('nombrePresentacion').value, this.formTaller.get('descripcion').value, this.formTaller.get('tallerSelect').value.id).subscribe((data) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Confirmado',
                detail: 'Se subio la presentación.',
            });
            alert('Se subio la presentación.');
            this.dialog.closeAll();
            window.location.reload();
        });
    }

}
