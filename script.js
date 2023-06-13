var playerTurn = true

var matriz = Array(3).fill(0).map(()=>Array(3).fill(0).map(()=>Array(3).fill(0).map(()=>Array(3).fill(0))))

var jogao = Array(3).fill(0).map(()=>Array(3).fill(0))

var qualQuadrante = [-1,3,-1,3]

var acabou = false


async function jogar(){

    if(this.innerHTML == ""){
        var X = parseInt(this.id[0])
        var Y = parseInt(this.id[1])
        var x = parseInt(this.id[2])
        var y = parseInt(this.id[3])

        if(jogao[X][Y] != 3 && jogao[X][Y] != 12 && jogao[X][Y] != 777){
            if(X>qualQuadrante[0]&&X<qualQuadrante[1]&&Y>qualQuadrante[2]&&Y<qualQuadrante[3]){

                var i = 0
                var j = 0
                while(i<3){
                    while(j<3){
                        if(jogao[i][j] != 3 && jogao[i][j] != 12 && jogao[i][j] != 777){
                            document.getElementById(`jogo${i}${j}`).style.background = "#EEEDED"
                        }
                        j++
                    }
                    i++
                    j = 0
                }

                if(playerTurn){
                    this.innerHTML = "<p>X</p>"
                    this.style.background = '#B7D0E7'
                    matriz[X][Y][x][y] = 1
                }
                else{
                    this.innerHTML = "<p>O</p>"
                    this.style.background = '#E7B7B7'
                    matriz[X][Y][x][y] = 4
                }
                playerTurn = !playerTurn

                if(checkVelha(X,Y)){
                    this.parentElement.style.background = "gray"
                }

                if(checkVictory(X,Y,x,y)){
                    await new Promise(r => setTimeout(r, 15));
                    if(playerTurn)
                    alert("Jogador 2 GANHOU!!")
                    else alert("Jogador 1 GANHOU!!")
                    return
                }

                

                if(jogao[x][y] == 3 || jogao[x][y] == 12 || jogao[x][y] == 777){
                    qualQuadrante = [-1,3,-1,3]
                    i = 0
                    j = 0
                    while(i<3){
                        while(j<3){
                            if(jogao[i][j] != 3 && jogao[i][j] != 12 &&  jogao[i][j] != 777){
                                document.getElementById(`jogo${i}${j}`).style.background = "green"
                            }
                            j++
                        }
                        i++
                        j = 0
                    }
                }   
                else{
                    qualQuadrante = [x-1,x+1,y-1,y+1]
                    var idNext = `jogo${x}${y}`
                    document.getElementById(idNext).style.background = "green"
                }
            }
        }
    }



}

function checkVictory(X,Y,x,y){
    var sub = matriz[X][Y]

    var idString = `${X}${Y}${x}${y}`

    //check column
    var i = 0
    var soma =0
    while(i < 3){
        soma += sub[x][i]
        i++
    }
    if(soma == 3||soma ==12){
        jogao[X][Y] = soma

        if(soma == 3){
            document.getElementById(idString).parentElement.style.background = "blue"
            
        }
        else{
            document.getElementById(idString).parentElement.style.background = "red"
            
        }

        return checkBigVictory(X,Y)
        
    }

    soma = 0
    i =0

    while(i < 3){
        soma += sub[i][y]
        i++
    }
    if(soma == 3||soma ==12){
        jogao[X][Y] = soma

        if(soma == 3){
            document.getElementById(idString).parentElement.style.background = "blue"
            
        }
        else{
            document.getElementById(idString).parentElement.style.background = "red"
            
        }
        return checkBigVictory(X,Y)
        
    }

    soma = 0
    i = 0
    var p = parseInt(x) + parseInt(y)
    if(x == y || p == 2){
        while(i < 3){
            soma += sub[i][i]
            i++
        }
        if(soma == 3||soma ==12){
            jogao[X][Y] = soma

            if(soma == 3){
                document.getElementById(idString).parentElement.style.background = "blue"
                
            }
            else{
                document.getElementById(idString).parentElement.style.background = "red"
                
            }
            return checkBigVictory(X,Y)
            
        }

        soma = 0
        i = 0
        var aux = 2

        while(i < 3){
            soma += sub[i][aux]
            i++
            aux--
        }
        if(soma == 3||soma ==12){

            jogao[X][Y] = soma

            if(soma == 3){
                document.getElementById(idString).parentElement.style.background = "blue"
                
            }
            else{
                document.getElementById(idString).parentElement.style.background = "red"
                
            }
            return checkBigVictory(X,Y)
            
        }


    }
}

function checkBigVictory(x,y){ //quadrante que quer checado

    //check column
    var i = 0
    var soma =0
    while(i < 3){
        soma += jogao[x][i]
        i++
    }
    if(soma == 9||soma ==36){
        if(soma ==9)
            return vitoria(3)
        else
        return vitoria(12)
        
    }

    soma = 0
    i =0

    // check line
    while(i < 3){
        soma += jogao[i][y]
        i++
    }
    if(soma == 9||soma ==36){
        if(soma ==9)
        return vitoria(3)
        else
        return vitoria(12)
    }

    soma = 0
    i = 0
    var p = parseInt(x) + parseInt(y)
    //check diagonals
    if(x == y || p ==2){
        while(i < 3){
            soma += jogao[i][i]
            i++
        }
        if(soma == 9||soma ==36){
            if(soma ==9)
            return vitoria(3)
        else
        return  vitoria(12)
            
        }

        soma = 0
        i = 0
        var aux = 2
        while(i < 3){
            soma += jogao[i][aux]
            i++
            aux--
        }
        if(soma == 9||soma ==36){
            if(soma ==9)
            return vitoria(3)
        else
        return vitoria(12)
            
        }


    }
}

function checkVelha(X,Y){ //quadrante que quer checado

    if(jogao[X][Y] != 777){
        if(jogao[X][Y] != 3 && jogao[X][Y] != 12){
            var i = 0
            var j = 0
        
            while(i < 3){
                j = 0
                while(j < 3){
                    if(matriz[X][Y][i][j] != 1 && matriz[X][Y][i][j] != 4){
                        return false
                    }
                    j++
                }
                i++
            }
            jogao[X][Y] = 777
            return true
        }
        else
            return false
    }
    else
        return true
    
}

function vitoria(player){
var i = 0
var j = 0
while(i<3){
    while(j<3){
        if(jogao[i][j] != player){
            document.getElementById(`jogo${i}${j}`).style.background = "#EEEDED"
        }
        j++
    }
    i++
    j = 0
}
return true
}