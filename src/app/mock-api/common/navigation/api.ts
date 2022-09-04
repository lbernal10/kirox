import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { compactNavigation, defaultNavigation, defaultNavigationConsultante, defaultNavigationStakeholder, futuristicNavigation, horizontalNavigation } from 'app/mock-api/common/navigation/data';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { Usuario } from 'app/models/usuario.interface';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    //private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private  _defaultNavigation: FuseNavigationItem[];
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    user: Usuario;

    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _userService: UserService,
        )
        
    {
        // Register Mock API handlers
        this.getUser();
    }

    getUser(): void
    {
        // Subscribe to user changes
        this._userService.usuario$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: Usuario) => {
                this.user = user;
                this.registerHandlers();
            });
            console.log("user login2: "  + JSON.stringify(this.user))
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {

        if(this.user.rol.id === 3){
            console.log("Es admin");
            this._defaultNavigation = defaultNavigation;
        } 
        if(this.user.rol.id === 1){
            console.log("Es Stakeholder");
            this._defaultNavigation = defaultNavigationStakeholder;
        }
        if(this.user.rol.id === 2){
            console.log("Es Consultante");
            this._defaultNavigation = defaultNavigationConsultante;
        }

        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {

                // Fill compact navigation children using the default navigation
                this._compactNavigation.forEach((compactNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === compactNavItem.id )
                        {
                            compactNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill futuristic navigation children using the default navigation
                this._futuristicNavigation.forEach((futuristicNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === futuristicNavItem.id )
                        {
                            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === horizontalNavItem.id )
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Return the response
                return [
                    200,
                    {
                        compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(this._defaultNavigation),
                        futuristic: cloneDeep(this._futuristicNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation)
                    }
                ];
            });
    }
}
