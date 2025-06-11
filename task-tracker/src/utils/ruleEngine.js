export function evaluateRules(task, rules) {
  let taskActions = [];

  for (let rule of rules) {
    const taskValue = task[rule.field]?.toLowerCase?.();
    const compareValue = rule.value.toLowerCase();

    if (rule.condition === "contains" && taskValue?.includes(compareValue)) {
      taskActions.push(rule.action);
    }

    if (rule.condition === "equals" && taskValue === compareValue) {
      taskActions.push(rule.action);
    }
  }

  return taskActions;
}
