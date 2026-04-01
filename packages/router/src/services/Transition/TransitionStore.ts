import type {
  TransitionData,
  TransitionDefinition,
  TransitionRules,
} from "../../types/index.js";

type ResolveOptions = {
  once?: boolean;
  self?: boolean;
};

const asArray = (value?: string | string[]) => {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export class TransitionStore {
  protected transitions: TransitionDefinition[] = [];

  constructor(transitions: TransitionDefinition[] = []) {
    this.transitions = transitions.slice();
  }

  public setTransitions(transitions: TransitionDefinition[] = []) {
    this.transitions = transitions.slice();
  }

  public add(transition: TransitionDefinition) {
    this.transitions.push(transition);
  }

  public getAll() {
    return this.transitions.slice();
  }

  public resolve(
    data: TransitionData,
    options: ResolveOptions = {},
  ): TransitionDefinition | undefined {
    const once = options.once === true;
    const self = options.self === true;

    const candidates = this.transitions.filter((transition) => {
      if (once) {
        return typeof transition.once === "function";
      }
      return (
        typeof transition.leave === "function" ||
        typeof transition.enter === "function"
      );
    });

    const normalized = candidates
      .filter((transition) => {
        if (self) {
          return transition.name === "self";
        }
        return transition.name !== "self";
      })
      .map((transition, index) => {
        const score = this.getScore(transition, data);
        return {
          transition,
          score,
          index,
        };
      })
      .filter((entry) => entry.score.valid);

    normalized.sort((a, b) => {
      // Explicit priority first.
      const priorityA = a.transition.priority ?? 0;
      const priorityB = b.transition.priority ?? 0;
      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }

      // Then rule specificity.
      if (a.score.value !== b.score.value) {
        return b.score.value - a.score.value;
      }

      // Then declaration order.
      return a.index - b.index;
    });

    return normalized[0]?.transition;
  }

  protected getScore(transition: TransitionDefinition, data: TransitionData) {
    const fromResult = transition.from
      ? this.matchRules(transition.from, data, "from")
      : { valid: true, value: 0 };
    const toResult = transition.to
      ? this.matchRules(transition.to, data, "to")
      : { valid: true, value: 0 };
    const directResult =
      !transition.from && !transition.to
        ? this.matchRules(transition, data, "from")
        : { valid: true, value: 0 };

    const valid = fromResult.valid && toResult.valid && directResult.valid;
    const bothDirectionsScore = transition.from && transition.to ? 300 : 0;
    const singleDirectionScore = transition.to
      ? 200
      : transition.from
        ? 100
        : 0;
    const value =
      bothDirectionsScore +
      singleDirectionScore +
      fromResult.value +
      toResult.value +
      directResult.value;

    return { valid, value };
  }

  protected matchRules(
    rules: TransitionRules,
    data: TransitionData,
    pageTarget: "from" | "to",
  ) {
    const page = pageTarget === "to" ? data.next : data.current;
    let valid = true;
    let value = 0;

    if (rules.custom) {
      const customMatches = rules.custom(data);
      if (!customMatches) {
        valid = false;
      } else {
        value += 100;
      }
    }

    const routeRules = asArray(rules.route);
    if (routeRules.length > 0) {
      const routeName = page.route?.name;
      if (!routeName || !routeRules.includes(routeName)) {
        valid = false;
      } else {
        value += 10;
      }
    }

    const namespaceRules = asArray(rules.namespace);
    if (namespaceRules.length > 0) {
      if (!page.namespace || !namespaceRules.includes(page.namespace)) {
        valid = false;
      } else {
        value += 1;
      }
    }

    return { valid, value };
  }
}
