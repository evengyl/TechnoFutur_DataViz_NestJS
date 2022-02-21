export class Users
{
    id : number
    firstName : string
    lastName : string
    age : number

    /**
     * Cette méthode, assigne un id a l'instance crée en se basant sur 
     * la taille du tableau de users courant
     * @param nbCurrentUser Longueur du tableau de users courant
     */
    assignId?(nbCurrentUser : number) : void{
        this.id = nbCurrentUser + 1
    }
}