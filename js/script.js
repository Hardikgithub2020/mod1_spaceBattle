
var Energy = 1;// Defined energy level and increase by 0.2 at every level
var alien=[];
var ussSchwarzenegger=[];
var trade = 'no'; // Defined purchse
var lastLevel = 4;// Defined last level of game after that game over
var EnergyLevel =1;


class warriorShip{
    constructor(name,hull,firePower,accuracy){
        this.name = name;
        this.hull = hull*EnergyLevel; // Hull is a hitpoints , If Hull=0 Ship destroy
        this.firePower = firePower*EnergyLevel; // Abitiy to damage Hull of target  on one sucessfull heat 
        this.accuracy = accuracy*EnergyLevel; // accuracy is between 0 to 1
        // If the ship's accuracy is `0.8` - then if the number generated from `Math.random()` is less than or equal to `0.8` then the attack will be successful. If the value is greater than `0.8` then the attack has missed. 
        this.missile = 0;
        this.diamond = 0;
        this.stages= 0;// stages upgrade Hero power and give access to use missile and further level oonce completed a level
        this.life='live';
    }
    warriorAccuracy(){
        if(Math.random() < this.accuracy) {
            let content=`You hit the Alien by power of ${this.firePower} houl damage.`
            console.log(content);
            document.getElementById('update').innerHTML = content;
        return 1;
     } else{
         console.log('You missed target');
         return 0;
     }
    }
    distroyerAccuracy(){
        if(Math.random() < this.accuracy) { console.log(this.name + ' damage your '+this.firePower+' hull');
        return 1;
     } else{
         console.log(this.name + ' missed');
         return 0;
     }
    }
    purchase(){
        if(this.stages > 1 && this.missile<3 && this.diamond>5){
            console.log(`Missile : ${this.missile}.`);
            console.log(`Diamond : ${this.diamond}`);
            console.log("Spent 5 Diamond for 1 Missile"); 
           do{// const prompt = require('prompt-sync')(); // ----> Make it comment when you want to upload or check to check in chrome console
                
                trade = prompt(`Would you like to buy more missile(Yes/No)`,'yes/no');
                
                if(trade === null){
                    trade = 'repeat';
                }else if(trade.toLowerCase() ==='yes' ){
                        if( this.diamond>=5){
                            this.missile+=1;
                            this.diamond-=5;
                            console.log(`Missile : ${this.missile}.`);
                            console.log(`Diamond : ${this.diamond}`);
                            console.log("Spent 5 Diamond for 1 Missile");
                           
                        }else{
                            console.log("You don't have a enough diamond, go and earn by defeating alien. Enter 'no' to exit");
                        }
                    }
                
            } while( trade.toLowerCase() != "no");
        }
    }
}

class alienShip{
    constructor(name){
        this.name = name;
        this.hull = (Math.floor(Math.random() * 4) + 3) * EnergyLevel; // Hull is a hitpoints , If Hull=0 Ship destroy
        this.firePower = (Math.floor(Math.random() * 3) + 2) * EnergyLevel; // Abitiy to damage Hull of target  on one sucessfull heat 
        this.accuracy = ((Math.floor(Math.random() * 3) + 6) / 10) * EnergyLevel; // accuracy is between 0 to 1
        // If the ship's accuracy is `0.8` - then if the number generated from `Math.random()` is less than or equal to `0.8` then the attack will be successful. If the value is greater than `0.8` then the attack has missed. 
        this.life='live';
    }
    warriorAccuracy(){
    
        if(Math.random() < this.accuracy) {
            console.log('You hit the alien!');
            
     } else{
         console.log('You missed target');
         return 0;
     }
    }
    distroyerAccuracy(){
        let content = this.name + ' damaged your '+this.firePower+' hull'; 
        if(Math.random() < this.accuracy) { 
            console.log(content);
            document.getElementById('update').innerHTML=content;
        return 1;
     } else{
         console.log(this.name + ' missed');
         return 0;
     }
    }
}
const megaShip = [
   {
        name : 'weapon-pods-1',
        hull : 20,
        
    },
    {
        name : 'weapon-pods-2',
        hull : 20,
        
    },
    {
        name : 'weapon-pods-3',
        hull : 20,
        
    },
    {
        name:'weapon-pod-main',
        hull : 40,// Hull is a hitpoints , If Hull=0 Ship destroy
        firePower : 5,// Abitiy to damage Hull of target  on one sucessfull heat 
        accuracy : 1, // accuracy is between 0 to 1
         // If the ship's accuracy is `0.8` - then if the number generated from `Math.random()` is less than or equal to `0.8` then the attack will be successful. If the value is greater than `0.8` then the attack has missed. 
        
     },
    
];


function battle (warrior,alien,level){
    if(warrior.stages > 1){
        warrior.purchase();
    }
    var exitforlevel = 'play';
    for(let alienCount = 0; alienCount < 6;alienCount++){
       let distroyer=alien[alienCount];
       
        let selection = 'play';
        console.log(`%c${distroyer.name} vs ${warrior.name}`,'color:blue;font-size:20px;');
        for(let turn=1;warrior.hull>0 && distroyer.hull>0;turn++){
            console.log(`You have ${warrior.hull} hull and attacking power is ${warrior.firePower}`);
            console.log(`${distroyer.name} has a ${distroyer.hull} hull and his attacking power is ${distroyer.firePower}`);
            if(turn%2 != 0){
                console.log('Your turn to attack');
                let missileshot ='no';
                if(warrior.missile>0){
                let fire= prompt("Shoot a missile !!  Missile hits 20 damage to Alien Houl. Enter 'YES' and click 'OK' to shoot --- OR --- Just click 'OK/Cancel' ");
                if(fire === null){
                    break;
                }
                if(fire.toLowerCase()=='yes'){

                    let namelistOfLivingAlien =[];
                    let targetIndexNo =[];
                    console.log("choose target")
                    for(let alienCheck = 0; alienCheck <6;alienCheck++){

                        if(alien[alienCheck].hull>0){

                            console.log(` ${alien[alienCheck].name} has ${alien[alienCheck].hull} hull --> Enter Target No ${alienCheck}`);
                            targetIndexNo.push(alienCheck);

                        }
                    }
                    do{   
                        var missileTargetString = prompt(`Enter target number of aliens`);
                        var missileTarget = Number(missileTargetString);

                        for(var targetCheck = 0; targetCheck < targetIndexNo.length;targetCheck++){
                            if(missileTarget == targetIndexNo[targetCheck]){

                                alien[missileTarget].hull-=20;
                                missileTarget = 'achieved';
                                console.log("Missile launched");
                                warrior.missile-=1;
                                missileshot = 'yes';
                                if(alien[targetIndexNo[targetCheck]].hull <= 0 && alien[targetIndexNo[targetCheck]].name != distroyer.name){
                                    console.log(`${alien[targetIndexNo[targetCheck]].name} is distroyed`);    
                                }
                            }
                        }
                    }while(missileTarget!='achieved');
                    
                }
                }
                if(missileshot === 'no'){
                    let attempt = warrior.warriorAccuracy();
                    if(attempt == 1){
                        distroyer.hull -= warrior.firePower;
                    }
                }
                if(distroyer.hull <= 0){
                    if(distroyer.name=== alien[alien.length-1].name){
                        console.log(" Great, All alien was distroyed and you save the earth");
                        selection = 'level complete';
                        //break;
                    }else{
                        console.log('%c'+distroyer.name + '  is distroyed ','font-size:15px;color:purple;');
                        console.log('Choose next step');
                        
                        while( selection.toLowerCase() != "continue"){

                            // const prompt = require('prompt-sync')(); // ----> Make it comment when you want to upload or check to check in chrome console
                            selection = prompt('Choose "Continue" to play further with next alien OR choose "Retreat" to quit a game :','Continue/Retreat');
                            // console.log(`Your selection is ${selection}`);
                            // selection = prompt("Please enter your name", "Harry Potter");
                            // if (person != null) {
                            //   document.getElementById("demo").innerHTML =
                            //   "Hello " + person + "! How are you today?";
                            if(selection == null){
                                selection = 'repeat';
                            }
                            if(selection.toLowerCase() ==='retreat' ){
                                console.log('You quit a game');
                                break;
                            }else if(selection.toLowerCase() === 'continue'){
                                    console.log("Let's defeat next one");
                                }else{
                                    console.log('Choose any one from Continue or retreat');
                                }
                        }
                    }
                }       
                }else{
                    
                    let emotionloose=Math.floor(Math.random()*3);
                    let livingEnemy = 0;
                        for(let z=0; z <6;z++)
                        {if(alien[z].hull>0){
                            livingEnemy++;
                            }
                        };
                    if(emotionloose > livingEnemy){
                        emotionloose = livingEnemy;
                    }
                    if(emotionloose > 1 && level >2){
                        alert("alien loose their emotion");
                    }
                    console.log(`${distroyer.name} turns to attack`);
                    let attempt = distroyer.distroyerAccuracy();
                    if(attempt == 1){
                        warrior.hull -= distroyer.firePower;
                    }
                    let attacker=1;
                    let counter =0;
                   
                    while(emotionloose > attacker && level > 2 && counter <6){ 
                     
                            if(alien[counter].name != distroyer.name && alien[counter].hull>0){
                                let attempt = alien[counter].distroyerAccuracy();
                                if(attempt == 1){
                                warrior.hull -= alien[counter].firePower;
                                attacker ++;
                            }
                            
                        }
                        counter++;
                    }
                    if(warrior.hull <= 0){
                            console.log("Game over"+ warrior.name +" dead");
                            selection = 'retreat';
                            break;
                        }    
            }
        }
        let dead=0;
        for(let z=0; z <6;z++)
        {if(alien[z].hull<=0){
            dead++;
            }
        };
        
        if(selection.toLowerCase()==="retreat"){
            return 'retreat';
            exitforlevel = 'retreat';
            break;
            
        }else if(selection.toLowerCase()==='level complete' || dead == 6){
            return 'level complete';
            exitforlevel = 'level complete';
            break;
        }
        
        
        // else{
        //     return 'level complete';
        //  } 
    } 
    if(exitforlevel == "retreat"){
        return 'retreat';
       
        //selection = 'retreat';
        
        
    }else if(exitforlevel == 'level complete'){
        return 'level complete';
        
        //selection = 'level complete';
        
    }
}
// level variable is a level number to upgrade alien power 
function gamelevel(level){ 
    if(level>(ussSchwarzenegger.stages+1)){
     alert("ACCESS DENIED !");
    }else{
        let status='play';
        EnergyLevel = Energy + 0.2*(level-1);// If you want to make alien stong just remove -1 from Energy level
        //Here we generate alien ship according to level
        for(let shipCount=0;shipCount<6;shipCount++){
            // alien.push(new alienShip(`Alien-${(shipCount+1)}`));
            alien[shipCount] = new alienShip(`Alien-${(shipCount+1)}`);
        }   
       
        // battle function is fight one-o-one and return with retreat or level complete
        status = battle(ussSchwarzenegger,alien,level);
       
        if(status.toLowerCase()=="retreat"){
            
            status= 'retreat';

        } else if(status.toLowerCase()=="level complete"){

            // reward for completing a level
            ussSchwarzenegger.missile +=1;
            ussSchwarzenegger.diamond +=3;

            // reward checking and upgrade the stages
            if(ussSchwarzenegger.missile>3){
                    ussSchwarzenegger.missile =3;// Limit you can not hold more then 3 missile.
            }

            if(ussSchwarzenegger.stages<level){
                    ussSchwarzenegger.stages = level;// upgrade level if player played first time
            }

            if(level==lastLevel){

                console.log("%c CONGRATULATION, YOU COMPLETED ALL LEVEL","color:red;background:yellow;font-size:20px;");
                console.log("%c LET DEFEAT MEGASHIP","color:red;background:yellow;font-size:20px;")
                alert("You can destroy Mega-ship after destroying its three weapon pod");
                status= 'play';

            } else {

                console.log(`%cYou completed your level-${level} and earned 1 missile and 3 Diamond`,'color:brown;font-size:30px;' );
                status = 'play';
            }   
        }
        
        if(status=='retreat'){
            return 'retreat';
           
        }else{return 'play';}
    }
};
// Player Refresh function refresh a player Houl,firePower and accuracy according to his upgrade when level begin
function playerRefresh(){
    let missile = ussSchwarzenegger.missile;
    let diamond = ussSchwarzenegger.diamond;
    let stage = ussSchwarzenegger.stages;
    EnergyLevel=Energy+(0.2*ussSchwarzenegger.stages);
    ussSchwarzenegger = new warriorShip('Hero',20,5,0.7);
    ussSchwarzenegger.missile = missile;
    ussSchwarzenegger.diamond = diamond;
    ussSchwarzenegger.stages = stage;
};

function spacebattle(){
            ussSchwarzenegger = new warriorShip('Hero',20,5,0.7);// define here for initial startup for missile, diamond, and stages
        
            for(let level=1;level<=lastLevel;level++){
            playerRefresh();
            console.log(`%cSpacebattle - Level -${level},  Begins`,'color:red;font-size:30px;');
            console.log(`diamond: ${ussSchwarzenegger.diamond}, Missile : ${ussSchwarzenegger.missile}, Stages: ${ussSchwarzenegger.stages}`  );
            // we call function gamelevel below by selction so  we know player want to play further or not
            let selection='play';
            selection = gamelevel(level); // This function gives return value retreat(Means exit a game) or play (Means last level completed and go for next)
            if(selection === 'retreat'){
                break;
            }else{ // Here selection=play, and now want to check user want to go for next level or quit the game
                while( selection.toLowerCase() != "continue"){
                    // const prompt = require('prompt-sync')(); // ----> Make it comment when you want to upload or want to check in chrom console
                    selection = prompt('Choose "Continue" to play next level OR choose "Retreat" to quit a game :','Continue/Retreat');
                    if(selection == null){
                        selection = 'repeat';
                        console.log('Choose any one from Continue or retreat');
                    }
                    else if(selection.toLowerCase() ==='retreat' ){
                        console.log('You quit a game');
                        break;
                    }
                }
            } 
            // Run for mega-ship when all level compltete 
            if(selection == 'continue' && level == lastLevel){
                playerRefresh();
                ussSchwarzenegger.purchase();
                console.log(`You have Diamond: ${ussSchwarzenegger.diamond}, Missile : ${ussSchwarzenegger.missile}, and Your Hull: ${ussSchwarzenegger.hull}`  );
                for(let pod=0; pod < megaShip.length;pod++){
                    while(megaShip[pod].hull>0){
                        console.log(`You have ${ussSchwarzenegger.hull} hull and attacking power is ${ussSchwarzenegger.firePower}`);
                        console.log(`Destroy ${megaShip[pod].name}, HULL: ${megaShip[pod].hull}`);
                        console.log('Your turn to attack');
                        let missileshot ='no';

                        if(ussSchwarzenegger.missile>0){
                        let fire= prompt("Shoot a missile !!  Missile hits 20 damage to  weapon pod of Megaship. Enter 'YES' and click 'OK' to shoot --- OR --- Just click 'OK/Cancel' ");
                        if(fire === null){
                            break;
                        }
                        if(fire.toLowerCase()=='yes'){
                            
                            megaShip[pod].hull-=20;
                            console.log("Missile launched");
                            ussSchwarzenegger.missile-=1;
                            missileshot = 'yes';            
                            
                        }
                        }

                        if(missileshot === 'no'){
                            let attempt = ussSchwarzenegger.warriorAccuracy();
                            if(attempt == 1){
                                megaShip[pod].hull -= ussSchwarzenegger.firePower;
                            }
                        }

                        if(megaShip[pod].name=== alien[alien.length-1].name){
                            console.log("%c Bravo ---> Megaship Crashed  ",'color:purple;font-size:20px;');
                            console.log("%C Game Over",'color:purple;font-size:20px;');
                            //break;
                        }else{
                        if(megaShip[pod].hull <= 0){
                                console.log('%c'+megaShip[pod].name + 'of MEGASHIP is distroyed ','font-size:15px;color:purple;');
                            }
                        }
                        console.log(`Mega ship hit you by ${megaShip[megaShip.length-1].firePower} `);       
                        ussSchwarzenegger.hull -= megaShip[(megaShip.length-1)].firePower;
                        if(ussSchwarzenegger.hull <= 0){
                            console.log("Game over"+ ussSchwarzenegger.name +" dead");
                            selection = 'retreat';
                            break;
                        }     
                                      
                    }
                }
            }
        }
}






                 



    


