export class Todos{
    name : string
    userId : number
    desc : string
    dateCreated : Date
    dateUpdated : Date

    /**
     * Cette méthode, assigne un id a l'instance crée en se basant sur 
     * la taille du tableau de todos courant
     * @param nbCurrentTodos Longueur du tableau de todos courant
     */
     assignId?(nbCurrentTodos : number) : void{
        this.userId = nbCurrentTodos + 1
    }
}