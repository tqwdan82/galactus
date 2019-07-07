var nodeList = [];

function ruleBuilder(ruleConfig){

    var startNode =  new StartNode(ruleBreakDown(ruleConfig));
    return startNode;

}

function ruleBreakDown(rule, epn, efn){
    if(typeof epn === 'undefined'
        || epn == null){
        epn = new EndPassNode();
    }
    if(typeof efn === 'undefined'
        || efn == null){
        efn = new EndFailNode();
    }

    var currentNode = null;
    var currentNodeconditions = [];
    var elseNode = efn;

    if(typeof rule.elseOut !== 'undefined'
        || rule.elseOut != null){
        
        var elseConditions = [new Condition(epn, rule.elseOut.value, rule.elseOut.dataRef)];
        for(var e = 0; e < nodeList.length; e++){
            var node = nodeList[e];
            var tempNode = new node(elseConditions, null ,efn);
            if(tempNode.id === rule.elseOut.node){
                elseNode = tempNode;
                break;
            }
        };
    }

    if(typeof rule.paths !== 'undefined'
        && rule.paths.length > 0){ 
        for(var p = 0; p < rule.paths.length; p++){
            var childRule = rule.paths[p];
            var childNode = ruleBreakDown(childRule, epn, efn);
            currentNodeconditions.push(new Condition(childNode, rule.value, rule.dataRef));
        }
    }else{
        currentNodeconditions.push(new Condition(epn, rule.value, rule.dataRef));
    }

    for(var n = 0; n < nodeList.length; n++){
        var node = nodeList[n];
        var tempNode = new node(currentNodeconditions, elseNode ,efn);
        if(tempNode.id === rule.node){
            currentNode = tempNode;
            break;
        }
    };
    return currentNode;
}