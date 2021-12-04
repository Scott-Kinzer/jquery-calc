// Write your code here

function createCalculator() {
    let calcArr = [];
    let operations = ["+", "-", "/", "*"];

  
        let $container = $('<div class="container"></div>');
        let $wrapper = $('<div class="wrapper-calc"></div>');
        let $calc = $('<div class= "calc"></div>');
        let $table = $('<div class="table"></div>');
        
        $($table).text("0");
        $($table).append($calc);

        $($wrapper).append($table);
        
        for (let i = 0; i < 10; i++) {
            let $item = $(`<div class="item">${i}</div>`);
            $($wrapper).append($item);
            $($item).css("color", "yellow");

            $($item).click(function () {
                
                    calcArr.push(i);
                    displayOnTable();
        
                console.log(calcArr)
            })
        }

        $(document.body).append($container);
        $($container).append($wrapper);

        let $clearButton = $(`<div class="item">C</div>`);
        $($wrapper).append($clearButton);

        let $calculate = $(`<div class="item">=</div>`);
        $($wrapper).append($calculate);

        $($calculate).click(() => {
            if (!(calcArr.every((item) => typeof item === 'number'))) {
                calcData();
               
                if (calcArr.length !== 0) {
                     displayOnTable();
                }
            } 
        })


        for (let item of operations) {
            let $item = $(`<div class="item">${item}</div>`);
            $($wrapper).append($item);
            $($item).click(function () {
                
                if (calcArr.length > 0) {
                    
                    console.log(calcArr.every((item) => item === 'number'))
                    if (calcArr.every((item) => typeof item === 'number')) {
                        calcArr.push(item);
                        displayOnTable()
                    } else {
                        calcData();
                        calcArr.push(item);
                        displayOnTable();
                    }
                 }
            })
        }
        let $logTable = $('<div class="logTable"></div>');
        
        $($container).append($logTable);

        function displayOnTable() {
            $($table).text(calcArr.join(""));
        }
        

        function calcData() {
            let operation = calcArr.find(item => typeof item !== 'number');
            let devideEl = calcArr.join("").split(operation);
            let result;
            console.log(devideEl);
            switch (operation) {
                case "+":
                     result = +devideEl[0] + +devideEl[1];
                     break;
                case "-":
                     result = +devideEl[0] - +devideEl[1];
                     break;
                case "/":
                     result = +devideEl[0] / +devideEl[1];
                     break;
                case "*":
                     result = +devideEl[0] * +devideEl[1];
                     break;

            }

            calcArr = [];
          
            if (result == Infinity) {

                $($table).text("ERROR");

            } else  {
                calcArr.push(result);
                displayOnTable();
                logHistory(result, devideEl[0], devideEl[1], operation)
            }
        }

        function logHistory(result, value1, value2, operation) {
            let $wrapItem = $(`<div  class="wrap-item" ></div>`);
            $($logTable).append($wrapItem);

                let $logItem = $(`<div class="log-item"> ${value1} ${operation} ${value2} = ${Math.floor(result)}</div>`);

                let str =  result.toString().concat(' ', value1.toString(), value2.toString());
                if (str.split("48").length > 1) {
                    $($logItem).addClass( "underline" );

                }
                let $circleItem = $(`<div class="circle"></div>`);
                let $closeItem = $(`<div class="close"> X</div>`);

                $($circleItem).click(function(){

                    $(this).toggleClass("active");

                })

                $($closeItem).click(function() {
                    $($wrapItem).remove();
                })

                
                
                $($wrapItem).append($logItem);
                $($wrapItem).append($closeItem);
                $($wrapItem ).prepend($circleItem);
           
        }

       

        $($clearButton).click(() => {
            clearData()
        })

        function clearData() {
            $($table).text("0");
            calcArr = [];
        }
  
        


}

createCalculator();