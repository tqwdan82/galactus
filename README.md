# galactus
A JavaScript library that allows you use and manage a rule engine. You can define you rule check rules using JSON and use the Rule Builder to build the rule for you. Once created you can process your data input based on the rule you created.

## Getting Started

Download RulesEngine.js and RuleBuilder.js and include the script to your script directory/location

### Steps to Setting Up
1. Include the RulesEngine.js and RuleBuilder.js JavaScript library in your page.
```
<script type="text/javascript" src="./galactus-mini/RulesEngine.js"></script>
<script type="text/javascript" src="./galactus-mini/RuleBuilder.js"></script>
```

2. Define your rule
The rule is defined like a tree.
```
var ruleConfig = { 
        value:1000,
        node:'GREATER_THAN',
        paths:[{
            value:1500,
            node:'LESS_THAN_EQUAL',
            paths:[
                {
                    value:1100,
                    node:'EQUAL',
                    paths:[]
                },
                {
                    value:1200,
                    node:'EQUAL',
                    paths:[]
                }
            ]
        }],
        elseOut:{
            value:99,
            node:'EQUAL',
            paths:[]
        }
    };
```

3. Call the rule's process() method with your data as an input
```
ruleFlow.process(parseInt(document.getElementById("amount").value)
```

3. Define your own rule component and use them
```
//define the component with a JSON config
var ltEqualConfig = {
    id:'LESS_THAN_EQUAL',
    processor:function(fIns){
        var a = fIns[0];
        var b = fIns[1];
        return a <= b;
    }
}

//create and add to nodeList based on the config
nodeList = [
    buildNode(equalConfig)
]
//OR
nodeList.push(buildNode(equalConfig))
```

## Sample
Look in the sample directory for a simple example

## Built With

* [Visual Code] - IDE
* [NodeJs HTTP Server] - Webserver

## Authors

* **TQW** - *Initial work* - [tqwdan82](https://github.com/tqwdan82)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project, if any.

## Note
The RulesEngine.js is an obfuscated code.

## License

This project is free to use.
