# Barba Test Migration Report

This report maps migrated Barba-inspired scenarios to new `@ribajs/router` tests and summarizes current triage results.

## Source -> Migrated Test Mapping

| Barba reference | Router migrated test(s) | Notes |
| --- | --- | --- |
| `refs/barba/packages/core/__tests__/modules/store/store.resolve.page.test.ts` | `src/services/Transition/transition-store.spec.ts` | Added specificity, priority, self, and missing-namespace fallback checks. |
| `refs/barba/packages/core/__tests__/modules/store/store.addPriority.test.ts` | `src/services/Transition/transition-store.spec.ts` | Explicit priority precedence covered. |
| `refs/barba/packages/core/__tests__/modules/transitions/transitions.page.test.ts` | `src/services/Transition/transition-runner.spec.ts` | Sync and non-sync hook ordering verified. |
| `refs/barba/packages/core/__tests__/hooks/hooks.test.ts` | `src/services/hooks.spec.ts` | Hook registration order and unregistration behavior covered. |
| `refs/barba/packages/core/__tests__/modules/prevent/*.test.ts` | `src/services/Pjax/pjax.prevent.spec.ts` | Same URL, modifiers, target blank, download, ignore class, cross-origin. |
| `refs/barba/packages/core/__tests__/core/core.click.test.ts` | `src/services/Pjax/pjax.click.spec.ts` | Nested anchor click delegation and `rv-route` guard behavior covered. |
| `refs/barba/packages/core/__tests__/utils/dom.test.ts` | `src/services/Pjax/dom.spec.ts` | Container parsing and insertion behavior validated. |
| `refs/barba/packages/core/__e2e__/container.spec.js` | `src/services/Pjax/pjax.container.spec.ts` | Old/new coexistence and final replacement behavior for transitions. |
| `refs/barba/packages/core/__tests__/modules/cache.test.ts` | `src/services/Pjax/cache-integration.spec.ts` | Cache hit/miss and fallback behavior covered. |
| `refs/barba/packages/core/__tests__/core/core.prefetch.test.ts` + `refs/barba/packages/prefetch/__tests__/prefetch.init.test.ts` | `src/services/Pjax/prefetch.spec.ts` | Prefetch routing and error marking behavior covered. |

## Added Harness Utilities

- `src/services/__test__/helpers/with-url.ts`
- `src/services/__test__/helpers/dispatch-click.ts`
- `src/services/__test__/helpers/reset-singletons.ts`
- `src/services/__test__/stubs/fetch-mock.ts`
- `src/services/__test__/stubs/history-mock.ts`
- `src/services/__test__/fixtures/pages.ts`

## Regression Contract Tests

- `src/services/Transition/transition-regression.spec.ts`
  - Prev/next symmetry via trigger direction.
  - SVG-style fallback selection when `next.namespace` is unavailable.
- `src/services/Pjax/pjax-interaction-regression.spec.ts`
  - Nested child click in back-link anchor remains routable.

## Suite Status

Command:

`yarn vitest packages/router/src/services/**/*.spec.ts`

Result:

- 13 test files passed
- 35 tests passed
- 0 failing tests

## Triage

No failing cases were produced by the migrated router suite. Known visual issues in demos/docs are therefore currently categorized as:

1. **Demo behavior/config issues** (higher priority)
   - `demos/router-slide-transition`: visual direction and motion parity tuning.
   - `demos/router-svg-transition`: smooth morph fidelity and overlay click-through.
2. **Potential framework behavior mismatch** (medium priority)
   - Transition data availability timing (`next.namespace` during early resolve) is now guarded by tests, but UX parity may still require router-level sequencing refinements.
3. **Docs embed/runtime integration** (medium priority)
   - Nested example interaction in docs should be validated with browser-driven tests after visual fixes.

## Prioritized Next Fix List

1. Refine slide demo direction choreography to mirror Barba reference timings.
2. Improve SVG demo morph interpolation and pointer-event layering to restore smooth back navigation clicks.
3. Add browser E2E checks for embedded docs demos to prevent regressions that unit tests cannot detect.

