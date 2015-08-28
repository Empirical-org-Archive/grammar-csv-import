//var v1Activities = require(__dirname + './../v1/activities/activities.json');
var v1Cms = require(__dirname + './../v1/cms/cms.json');


var rules = v1Cms.rules;
var ruleQuestions = v1Cms.ruleQuestions;

var rulesWithNestedRuleQuestions = require('./mapRuleQuestionsToRules')(rules, ruleQuestions);



var ruleIdAndTitle = require('./ruleIdAndTitle')(rules);

require('../write')(ruleIdAndTitle, __dirname + '/ruleIdAndTitle.json');

var ruleQuestionMap = require('./mapRuleQuestionsToNewFormat')(rulesWithNestedRuleQuestions);

ruleQuestionMap = require('./mapInstructionsBackIntoRuleQuestions')(ruleQuestionMap);

require('../write')(ruleQuestionMap, __dirname + '/ruleQuestionsAndNewRuleId.json');

var rulesBuiltFromLevel0Concepts = require('./buildRulesFromLevel0Concepts')(rules, ruleQuestionMap);
console.log(rulesBuiltFromLevel0Concepts);

var conceptLevel0Rules = require('./buildConceptsFromRulesWithQuestions')(rules, ruleQuestionMap);

