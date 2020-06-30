new Vue({
    el: '#app',
    data:{
        playerHealth: 100,
        opponentHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth  =100;
            this.opponentHealth = 100;
            this.turns.length = 0;
        },
        attack:function(){
           var damage = this.calDamage(10,3);
           this.opponentHealth -= damage;
           this.turns.unshift({
               isPlayer: true,
               text: 'Player hits opponent for ' + damage
           })
            if(this.checkWin()){
                return;
            }
            this.opponentAttack();
        },
        special:function(){ 
            var damage = this.calDamage(20,10);
            this.opponentHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits opponent hard for ' + damage
            })
            if(this.checkWin()){
                return 
            }
           this.opponentAttack();

        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth +=10;
            }else{
                this.playerHealth= 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player gets heal for 10 '
            })
            this.opponentAttack();
        },
        giveUp:function(){

            this.gameIsRunning = false;
        },

        calDamage: function(max,min){
            return Math.max(Math.floor(Math.random() * max) + 1,min);
        },
        opponentAttack: function(){
            var damage = this.calDamage(12,5);
            this.playerHealth -=  damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Opponent hits player for ' + damage 

            })
            this.checkWin();
         },
        checkWin: function(){
            if(this.opponentHealth <=0){
                if(confirm('You won! Start a new game ?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if(confirm('You lost! Start a new game ?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;

            }
            return false;
        }
    }
});