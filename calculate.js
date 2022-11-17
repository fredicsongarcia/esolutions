(() => {
    var fs = require('fs')
    fs.readFile('./map.txt', 'UTF-8', (err, file) => {
        let data = file.split(/\r?\n|\r|\n/g)

        let dataMatriz = []
        let startPosition = []
        data.forEach((rowVal, row) => {
            let arrayRow = rowVal.trim().split(' ')
            arrayRow.forEach((columnVal, col) => {
                dataMatriz[row] = dataMatriz[row] || [];
                dataMatriz[row][col] = columnVal
                if (Number(columnVal) === 0) {
                    startPosition.push({ row, col })
                }
            })
        })

        let row = [-1, 0, 0, 1];
        let col = [0, -1, 1, 0];
        let M = dataMatriz.length;
        let N = dataMatriz[0].length;

        const findRoute = (matriz, x, y, prevValue) => {
            
            if ((x >= 0 && x < matriz.length) && (y >= 0 && y < matriz[0].length) && (Number(matriz[x][y]) > Number(prevValue))) {
                
                let max_length = 0;
                let steepest = 0;
                let step = []
                for (let k = 0; k < row.length; k++) {                
                    let len = findRoute(dataMatriz, x + row[k], y + col[k], matriz[x][y]); 
                    max_length = Math.max(max_length, 1 + len.max_length);
                    steepest = Math.max(Number(matriz[x][y]),Number(len.steepest),steepest)
                    step = [matriz[x][y],...len.step].length > step.length ? [matriz[x][y],...len.step]:step;
                }
                return {
                    max_length:max_length,
                    steepest:steepest,
                    step:step
                };
            }
            else {
                return{
                    max_length:0,
                    steepest:0,
                    step:[]
                };;
            }

        }

        let max_length = 0;
        let steepest = 0;
        let step = []
        for (let x = 0; x < M; x++) {
            for (let y = 0; y < N; y++) {
                if (dataMatriz[x][y] == 0) {
                    for (let k = 0; k < row.length; k++) {
                        let len = findRoute(dataMatriz, x + row[k], y + col[k], 0); 
                        max_length = Math.max(max_length, 1 + len.max_length);
                        steepest = Math.max(Number(dataMatriz[x][y]),Number(len.steepest),steepest)
                        step = [dataMatriz[x][y],...len.step].length > step.length ? [dataMatriz[x][y],...len.step]:step;
                    }
                }
            }
        }

        console.log(max_length,' result length route')
        console.log(steepest,'result steepest')
        console.log(step,'result steps')
    })



})();
