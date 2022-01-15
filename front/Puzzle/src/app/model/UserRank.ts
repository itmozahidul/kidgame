export class UserRank{
    name:string;
    time:string;
    date:string;

    constructor(){
        this.name="";
        this.time="";
        this.date="--/--/--";
    }

    set(name:string,time:string,date:string){
        this.name=name;
        this.time=time;
        this.date=date;
    }
    
}