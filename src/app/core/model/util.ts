export class imprimirPantalla {
    private mostrar: boolean = true;

    constructor(mensage: any) {
        if (this.mostrar) {
            console.log(mensage);
        }
    }
}
