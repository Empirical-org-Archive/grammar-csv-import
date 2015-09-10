//var v1Activities = require(__dirname + './../v1/activities/activities.json');
var v1Cms = require(__dirname + './../v1/cms/cms.json');

function handleParsedConcepts(err, concepts) {
  if (err) {
    throw new Error(err);
  }

  var rules = v1Cms.rules;
  var ruleQuestions = v1Cms.ruleQuestions;

  var conceptsWithQuestions = require('./buildNewQuillConcepts')(rules, ruleQuestions, concepts);

  //At this point, all of the v2 mapping should be finished
  //Below this line, we add Firebase generated IDs, and figure out
  //the LMS information (matching string to title and assigning
  //standard, standard_level, concept_level_{0,1,2} data
  conceptsWithQuestions = require('./addFirebaseIds')(conceptsWithQuestions);
  //Because this is an async operation, do this one last.
  return;
  require('./addLmsIds')(conceptsWithQuestions).then(function (cwq) {
    require('./../write.js')(cwq, __dirname + '/concepts.json');
  });
}

require('./parseConceptLevels')(handleParsedConcepts);

