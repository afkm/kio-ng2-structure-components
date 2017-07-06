import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
var KioStructureModule = (function () {
    function KioStructureModule() {
    }
    KioStructureModule.forRoot = function () {
        return {
            ngModule: KioStructureModule,
            providers: []
        };
    };
    KioStructureModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    //declarations: [],
                    //providers: [ ],
                    //entryComponents: [],
                    exports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    KioStructureModule.ctorParameters = function () { return []; };
    return KioStructureModule;
}());
export { KioStructureModule };
//# sourceMappingURL=module.js.map