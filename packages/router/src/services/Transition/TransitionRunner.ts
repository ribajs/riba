import type {
  Transition,
  TransitionData,
  TransitionDefinition,
} from "../../types/index.js";
import { routerHooks } from "../Hooks.js";

type TransitionRunContext = {
  data: TransitionData;
  transition?: TransitionDefinition;
  finalize: () => Promise<void>;
};

const runTransitionHook = async (
  hookName:
    | "beforeOnce"
    | "once"
    | "afterOnce"
    | "before"
    | "beforeLeave"
    | "leave"
    | "afterLeave"
    | "beforeEnter"
    | "enter"
    | "afterEnter"
    | "after",
  data: TransitionData,
  transition?: TransitionDefinition,
) => {
  await routerHooks.do(hookName, data, transition);
  const callback = transition?.[hookName];
  if (typeof callback === "function") {
    await callback(data);
  }
};

export class TransitionRunner {
  public async runLegacy(
    transition: Transition,
    oldContainer: HTMLElement,
    newContainerPromise: Promise<HTMLElement>,
  ) {
    await transition.init(oldContainer, newContainerPromise);
  }

  public async runOnce({
    data,
    transition,
  }: Omit<TransitionRunContext, "finalize">) {
    await runTransitionHook("beforeOnce", data, transition);
    await runTransitionHook("once", data, transition);
    await runTransitionHook("afterOnce", data, transition);
  }

  public async runPage({ data, transition, finalize }: TransitionRunContext) {
    await runTransitionHook("before", data, transition);

    if (transition?.sync) {
      await runTransitionHook("beforeLeave", data, transition);
      await runTransitionHook("beforeEnter", data, transition);
      await Promise.all([
        runTransitionHook("leave", data, transition),
        runTransitionHook("enter", data, transition),
      ]);
      await runTransitionHook("afterLeave", data, transition);
      await runTransitionHook("afterEnter", data, transition);
    } else {
      await runTransitionHook("beforeLeave", data, transition);
      await runTransitionHook("leave", data, transition);
      await runTransitionHook("afterLeave", data, transition);
      await runTransitionHook("beforeEnter", data, transition);
      await runTransitionHook("enter", data, transition);
      await runTransitionHook("afterEnter", data, transition);
    }

    await finalize();
    await runTransitionHook("after", data, transition);
  }
}
