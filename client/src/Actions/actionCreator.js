import { exampleCreated, exampleDeleted} from "./actionTypes";

const exampleCreatedAction = (example) => ({
  type: exampleCreated,
  data: example
});

const exampleDeletedAction = (example) => ({
  type: exampleDeleted,
  data: example
});

export { exampleCreatedAction, exampleDeletedAction};



