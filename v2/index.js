//var v1Activities = require(__dirname + './../v1/activities/activities.json');
var v1Cms = require(__dirname + './../v1/cms/cms.json');


var rules = v1Cms.rules;
var ruleQuestions = v1Cms.ruleQuestions;

var rulesWithRuleQuestions = require('./mapRuleQuestionsToRules')(rules, ruleQuestions);
rulesWithRuleQuestions = require('./mapRuleQuestionsToNewFormat')(rulesWithRuleQuestions);
var conceptsWithQuestions = require('./buildConceptsFromRulesWithQuestions')(rulesWithRuleQuestions);
conceptsWithQuestions = require('./formatQuestionsToNewFormat')(conceptsWithQuestions);
conceptsWithQuestions = require('./addFirebaseIds')(conceptsWithQuestions);
require('./../print')(conceptsWithQuestions);
