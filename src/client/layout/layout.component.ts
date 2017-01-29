import {Component, OnInit} from "@angular/core";
import "../../public/menu.png";
import "../../public/menu-active.png";

@Component({
    selector: '.layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    menuIconSrc: string;
    
    private ICON = 'menu.png';
    private ICON_ACTIVE = 'menu-active.png';
    
    ngOnInit(): void {
        this.menuIconSrc = this.ICON;
    }
    
    toggleMenu(): void {
        this.menuIconSrc = (this.menuIconSrc == this.ICON) ? this.ICON_ACTIVE : this.ICON;
    }
}
