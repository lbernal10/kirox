import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'app-terminos-politicas',
    templateUrl  : './terminos-politicas.component.html',
    styleUrls: ['./terminos-politicas.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TerminosPoliticasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
