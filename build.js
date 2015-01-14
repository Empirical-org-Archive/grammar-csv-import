module.exports = function(
  categories,
  rules,
  ruleQs,
  classifications,
  instructions
) {
  var base = {
    categories: categories,
    rules: rules,
    ruleQuestions: ruleQs,
    classifications: classifications,
    instructions: instructions
  };

  console.log(JSON.stringify(base));
}
