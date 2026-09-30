# Sprint 2: Redux and drag-and-drop

## Scope

Move application business state from `App` into Redux Toolkit, load ingredients
and create orders through `createAsyncThunk`, and implement ingredient
drag-and-drop with `react-dnd`.

## State and API

The store contains four slices:

- `ingredients`: `items`, loading status and error. `fetchIngredients` requests
  `GET /ingredients` and records success or failure.
- `burgerConstructor`: `bun` and `ingredients`. Adding a filling creates a
  `constructorId` with `nanoid`; buns replace the current bun. Fillings can be
  removed by that id and moved by source and target indexes.
- `ingredientDetails`: the ingredient selected for its modal, cleared when the
  modal closes.
- `order`: order number, request status and error. `createOrder` posts
  `[bun._id, ...ingredients ids, bun._id]` to `POST /orders` and saves the
  returned number.

`DndProvider` with the HTML5 backend wraps the application. Ingredient cards
are drag sources. The constructor accepts cards; its fillings are both drag
sources and drop targets for reordering. Dropping outside the constructor has
no state effect.

## UI behaviour

The constructor displays empty-state drop targets until a bun or filling is
added. The order button requires a bun, since an order must start and end with
the same bun. The order modal shows request progress, the returned number, or
an API error.

The ingredients scroll container compares its top edge to each section heading
with `getBoundingClientRect()` on scroll. The nearest heading selects the
active tab. Tab clicks retain smooth scrolling.

Memoized selectors derive per-ingredient counters and the burger total. A bun
has count two; every filling instance increases its matching counter by one.

## Verification

Add unit coverage for reducers and selectors and integration coverage for the
main interaction paths where practical. Before hand-off, run linting, tests and
the Vite production build, exercise the app locally, push `sprint2`, and open a
PR to `main`.
