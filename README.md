# UI Library

A storefront for browsing the `@ui-library/ui` component library before a project installs it.

---

Build **UI Library**, a web app developers use to browse a UI library before they import it. It is a shop window, not a checkout. There is no cart, no payment, no account, and no auth.

UI Library shows what a project will get if it installs this library. The things a project actually installs are separate from this website. This website only contains and showcases them.

## Three pieces, and they must not merge

1. **UI Library** — this web app. Its own layout, type, and color. It is the storefront.
2. **Components** — the products on the shelf. A project imports these from `@ui-library/ui`. The token architecture applies only to these.
3. **Settings** — also a product on the shelf, also importable, from `@ui-library/ui/settings`. One settings object changes every component inside a project. Settings do not change UI Library’s own chrome.

Do not style the storefront with the component tokens. Do not style a library component with the storefront’s CSS. Do not wrap the storefront in the settings scope.

## What “import” means

A consuming project installs the components and the settings runtime, then keeps its own settings values:

```tsx
import { Badge, Button, Checkbox, Input, Link, Switch, Textarea } from '@ui-library/ui';
import '@ui-library/ui/tokens.css';
import { ThemeScope, type ThemeSettings } from '@ui-library/ui/settings';

const projectSettings: ThemeSettings = {
  /* this project's values, stored by that project */
};

export function App() {
  return (
    <ThemeScope settings={projectSettings}>
      <Button intent="positive">Save</Button>
      <Input label="Email" />
      <Textarea label="Notes" />
      <Checkbox label="Notify me" />
      <Switch label="Enabled" />
      <Badge intent="neutral">Draft</Badge>
      <Link href="#docs">Docs</Link>
    </ThemeScope>
  );
}
```

`tokens.css` holds the defaults. `ThemeSettings` holds only the overrides for that project. `ThemeScope` writes those overrides as CSS variables on one element. Every library component inside that element reads those variables. A second project imports the same components and the same scope, passes a different `ThemeSettings` object, and looks different. Neither project’s settings are hardcoded inside the components.

UI Library may demonstrate this. The demonstration happens inside a preview frame. UI Library’s header, nav, and page background stay on the storefront’s own styles.

If you cannot install `@ui-library/ui` from GitHub, build showcase fixtures that match the API below. Put those fixtures in one folder named `showcase`. Do not describe them as the package. The install snippets on the site still show `@ui-library/ui` and `@ui-library/ui/settings`.

## Architecture that every component follows

Token layers stay in this order: **primitive → semantic → component**. A component reads its own `--{component}-*` variables. In `tokens.css`, those default to semantic variables (`var(--color-…)`, `var(--font-…)`, `var(--radius-…)`). A component file does not read a primitive variable, and it does not hardcode a hex color, a font stack, or a pixel radius.

Components do not accept color, font, radius, padding, or border props. They do not accept a `style` prop for those properties.

`ThemeScope` is the only writer. When a settings field changes, it writes the semantic variable and every component alias in the mapping table below. That is how one settings object updates Button, Input, Textarea, Checkbox, Switch, Badge, and Link together.

Intents are roles, not hues. `positive` means confirm, save, continue. `negative` means delete, reject, destructive. `neutral` means resting, draft, not an action. Never call these green, red, or gray in names or copy.

The shelf is exactly these seven components. Do not add cards, nav bars, dialogs, selects, tables, tabs, or a login form to the library. Those can exist as storefront chrome, built as normal app code, outside `showcase`.

## Component contract

### Button — `/catalog/button`

```tsx
<Button intent="positive" variant="primary">Save</Button>
<Button intent="negative" variant="primary">Delete</Button>
<Button intent="positive" variant="secondary">Cancel</Button>
<Button intent="positive" disabled>Save</Button>
```

- `intent`: `"positive"` | `"negative"`. Default `"positive"`.
- `variant`: `"primary"` | `"secondary"`. Default `"primary"`.
- `disabled`: native button disabled.
- Hover is a state of the primary button, shown by switching its background variable.

Preview states, labeled Confirm, Delete, Cancel, and Save: positive primary, negative primary, positive secondary, positive disabled.

Reads: `--button-font-family`, `--button-font-size`, `--button-padding-block`, `--button-padding-inline`, `--button-radius`, `--button-color-on-fill`, `--button-positive-background-active`, `--button-positive-background-hover`, `--button-positive-background-disabled`, `--button-negative-background-active`, `--button-negative-background-hover`, `--button-negative-background-disabled`, `--button-background-secondary`, `--button-color-secondary`, `--button-border-color-secondary`.

Settings shown on this page: every color field, font family, body size, radius.

### Input — `/catalog/input`

```tsx
<Input label="Email" />
```

`label` is required. One empty labeled text field in the preview.

Reads: `--input-font-family`, `--input-font-size`, `--input-label-font-size`, `--input-gap`, `--input-padding-block`, `--input-padding-inline`, `--input-radius`, `--input-color`, `--input-border-color`, `--input-background`.

Settings shown on this page: `textDefault`, `surfaceRaised`, `surfaceBorder`, font family, body size, radius.

### Textarea — `/catalog/textarea`

```tsx
<Textarea label="Notes" />
```

`label` is required. Default to three rows. One empty field in the preview.

Reads: `--textarea-font-family`, `--textarea-font-size`, `--textarea-label-font-size`, `--textarea-gap`, `--textarea-padding-block`, `--textarea-padding-inline`, `--textarea-radius`, `--textarea-color`, `--textarea-border-color`, `--textarea-background`.

Settings shown on this page: `textDefault`, `surfaceRaised`, `surfaceBorder`, font family, body size, radius.

### Checkbox — `/catalog/checkbox`

```tsx
<Checkbox label="Notify me" />
<Checkbox label="Notify me" defaultChecked />
<Checkbox label="Notify me" disabled />
```

`label` is required. Preview those three states: unchecked, checked, disabled. The checked fill uses the positive action color. The check mark uses the on-action text color.

Reads: `--checkbox-font-family`, `--checkbox-font-size`, `--checkbox-label-color`, `--checkbox-gap`, `--checkbox-radius`, `--checkbox-background`, `--checkbox-background-checked`, `--checkbox-background-checked-hover`, `--checkbox-background-disabled`, `--checkbox-border-color`, `--checkbox-mark-color`.

Settings shown on this page: `positiveActive`, `positiveHover`, `positiveDisabled`, `textDefault`, `textOnAction`, `surfaceRaised`, `surfaceBorder`, font family, body size, radius.

### Switch — `/catalog/switch`

```tsx
<Switch label="Enabled" />
<Switch label="Enabled" defaultChecked />
<Switch label="Enabled" disabled />
```

`label` is required. Preview those three states: off, on, disabled. The on fill uses the positive action color. The thumb uses the on-action text color.

Reads: `--switch-font-family`, `--switch-font-size`, `--switch-label-color`, `--switch-gap`, `--switch-radius`, `--switch-background`, `--switch-background-checked`, `--switch-background-checked-hover`, `--switch-background-disabled`, `--switch-border-color`, `--switch-thumb-color`.

Settings shown on this page: `positiveActive`, `positiveHover`, `positiveDisabled`, `textDefault`, `textOnAction`, `surfaceRaised`, `surfaceBorder`, font family, body size, radius.

### Badge — `/catalog/badge`

```tsx
<Badge intent="positive">New</Badge>
<Badge intent="negative">Failed</Badge>
<Badge intent="neutral">Draft</Badge>
```

- `intent`: `"positive"` | `"negative"` | `"neutral"`. Default `"neutral"`.
- `children`: the badge text.

Preview all three intents.

Reads: `--badge-font-family`, `--badge-font-size`, `--badge-radius`, `--badge-padding-block`, `--badge-padding-inline`, `--badge-positive-background`, `--badge-positive-color`, `--badge-negative-background`, `--badge-negative-color`, `--badge-neutral-background`, `--badge-neutral-color`, `--badge-neutral-border-color`.

Settings shown on this page: `positiveActive`, `negativeActive`, `textDefault`, `textOnAction`, `surfaceRaised`, `surfaceBorder`, font family, body size, radius.

### Link — `/catalog/link`

```tsx
<Link href="#docs">Docs</Link>
```

`href` is required. `children` is the link text. The preview anchor must not navigate away from UI Library. Use `href="#docs"` and prevent the default click.

Reads: `--link-font-family`, `--link-font-size`, `--link-color`.

Settings shown on this page: `textDefault`, font family, body size.

## Settings contract

Export this type from `@ui-library/ui/settings`. All fields are optional. Omitted fields keep the `tokens.css` default.

```ts
type ThemeSettings = {
  colors?: {
    positiveActive?: string;
    positiveHover?: string;
    positiveDisabled?: string;
    negativeActive?: string;
    negativeHover?: string;
    negativeDisabled?: string;
    textDefault?: string;
    textOnAction?: string;
    surfaceRaised?: string;
    surfaceBorder?: string;
  };
  typography?: {
    fontFamily?: 'sans' | 'serif' | 'mono';
    bodySize?: 'sm' | 'md' | 'lg';
  };
  radius?: 'none' | 'sm' | 'md';
};
```

`ThemeScope` maps those fields to these variables and no others:

| Settings field | CSS variables written |
| --- | --- |
| `colors.positiveActive` | `--color-action-positive-active`, `--button-positive-background-active`, `--checkbox-background-checked`, `--switch-background-checked`, `--badge-positive-background` |
| `colors.positiveHover` | `--color-action-positive-hover`, `--button-positive-background-hover`, `--checkbox-background-checked-hover`, `--switch-background-checked-hover` |
| `colors.positiveDisabled` | `--color-action-positive-disabled`, `--button-positive-background-disabled`, `--checkbox-background-disabled`, `--switch-background-disabled` |
| `colors.negativeActive` | `--color-action-negative-active`, `--button-negative-background-active`, `--badge-negative-background` |
| `colors.negativeHover` | `--color-action-negative-hover`, `--button-negative-background-hover` |
| `colors.negativeDisabled` | `--color-action-negative-disabled`, `--button-negative-background-disabled` |
| `colors.textDefault` | `--color-text-default`, `--button-color-secondary`, `--input-color`, `--textarea-color`, `--checkbox-label-color`, `--switch-label-color`, `--badge-neutral-color`, `--link-color` |
| `colors.textOnAction` | `--color-text-on-action`, `--button-color-on-fill`, `--checkbox-mark-color`, `--switch-thumb-color`, `--badge-positive-color`, `--badge-negative-color` |
| `colors.surfaceRaised` | `--color-surface-raised`, `--input-background`, `--textarea-background`, `--checkbox-background`, `--switch-background`, `--badge-neutral-background` |
| `colors.surfaceBorder` | `--color-surface-border`, `--button-border-color-secondary`, `--input-border-color`, `--textarea-border-color`, `--checkbox-border-color`, `--switch-border-color`, `--badge-neutral-border-color` |
| `typography.fontFamily` | `--font-family-sans`, `--button-font-family`, `--input-font-family`, `--textarea-font-family`, `--checkbox-font-family`, `--switch-font-family`, `--badge-font-family`, `--link-font-family` |
| `typography.bodySize` | `--font-size-md`, `--font-size-sm`, `--button-font-size`, `--input-font-size`, `--input-label-font-size`, `--textarea-font-size`, `--textarea-label-font-size`, `--checkbox-font-size`, `--switch-font-size`, `--badge-font-size`, `--link-font-size` |
| `radius` | `--radius-sm`, `--button-radius`, `--input-radius`, `--textarea-radius`, `--checkbox-radius`, `--switch-radius`, `--badge-radius` |

Family values: `sans` → system sans, `serif` → Georgia, `mono` → monospace. Size values: `sm` → 14px, `md` → 16px, `lg` → 20px. When body size is `sm`, label sizes stay 14px. When body size is `md`, label sizes are 14px. When body size is `lg`, label sizes are 16px. Radius values: `none` → 0, `sm` → 6px, `md` → 10px.

Hex colors only, `#rgb` or `#rrggbb`. Ignore any other key. Do not generate a palette from one brand color. Do not write variables onto `document.documentElement`. Write them on the `ThemeScope` element only.

Padding, gap, and label size are component variables with defaults in `tokens.css`. They are not settings fields. Do not add a spacing control.

## Pages

Build these routes and no others.

### `/` Home

One screen that says what this is: a place to see the UI library, then import it into a project. Three links: Components, Settings, Install. No hero carousel, no testimonials, no pricing table.

### `/catalog` Catalog

A list of eight importable items:

| Item | What the developer is looking at | Where it goes | Import line |
| --- | --- | --- | --- |
| Button | Action control | `/catalog/button` | `import { Button } from '@ui-library/ui'` |
| Input | Labeled text field | `/catalog/input` | `import { Input } from '@ui-library/ui'` |
| Textarea | Labeled multiline field | `/catalog/textarea` | `import { Textarea } from '@ui-library/ui'` |
| Checkbox | Labeled check | `/catalog/checkbox` | `import { Checkbox } from '@ui-library/ui'` |
| Switch | Labeled on/off | `/catalog/switch` | `import { Switch } from '@ui-library/ui'` |
| Badge | Status label | `/catalog/badge` | `import { Badge } from '@ui-library/ui'` |
| Link | Text link | `/catalog/link` | `import { Link } from '@ui-library/ui'` |
| Settings | The import that changes all of the above | `/catalog/settings` | `import { ThemeScope } from '@ui-library/ui/settings'` |

Each item shows its name, one sentence, and that import line.

### Component pages

Button, Input, Textarea, Checkbox, Switch, Badge, and Link share one layout.

- Title and one sentence from the catalog.
- An **isolated preview frame** with the states listed under that component. The frame’s background comes from `--color-surface-raised` after settings are applied. The storefront must not set that background.
- A **Settings for this preview** group, on the page, outside the painted component. Editing it updates only the frame, live, through `ThemeScope`. Show only the settings fields listed for that component.
- An **Import** block with `tokens.css`, the component import, and the settings import under it.
- A **Props** list using only that component’s contract.
- A **Reads** list of the CSS variables copied from that component’s contract.

### `/catalog/settings`

This page is the product page for the importable settings, not a global theme for UI Library.

- Explain in one short paragraph: settings are imported into the developer’s project, stored by that project, and applied with `ThemeScope` around that project’s tree. One object restyles every component in the shelf.
- Show the `ThemeSettings` type and the `ThemeScope` usage snippet from the top of this prompt.
- Show one preview frame wrapped in `ThemeScope` containing all seven components: positive primary Button “Save”, Input “Email”, Textarea “Notes”, checked Checkbox “Notify me”, on Switch “Enabled”, Badge “New” with `intent="positive"`, Link “Docs”.
- The full settings form: every color field, font family, body size, and radius. Changing them restyles that frame only. Positive color must move Button, Checkbox, Switch, and Badge together. Text color must move Input, Textarea, labels, neutral Badge, and Link together. Radius must move every component that reads a radius variable. Link does not change shape.
- List the mapping table of settings field → CSS variables. This is the guarantee the developer is importing.

### `/install`

Exact steps, in this order:

1. Show the install command `pnpm add @ui-library/ui`. This is the package name the catalog displays. Do not show a GitHub repo name, a company name, or a second package name.
2. Import `@ui-library/ui/tokens.css` once at the app entry.
3. Import the components you use from `@ui-library/ui`: `Badge`, `Button`, `Checkbox`, `Input`, `Link`, `Switch`, `Textarea`.
4. Import `ThemeScope` and `ThemeSettings` from `@ui-library/ui/settings`.
5. Keep the settings object in the consuming project. Pass it to one `ThemeScope` around that project’s UI.

State that UI Library itself is not installed. The website is the showcase. The package is what gets installed.

## Storefront behavior

- Desktop: a top bar with the name **UI Library** and links to Catalog, Settings, and Install. Content below.
- Narrow screens: the same destinations remain reachable. Do not drop the preview or the settings controls.
- Preview frames stay mounted while the settings controls on that page change. Changing a control must not remount the frame and lose the other overrides.
- Each component page starts from defaults when opened. Do not leak one page’s preview overrides into the storefront or into another page.
- Light and dark, if you add them, change the storefront only. They must not flip the preview’s component colors. The preview changes only when settings controls change.

## Storefront look

Design the storefront yourself. It should read as a catalog a developer can scan: name, what it is, what they will import, then the live piece.

Keep the preview frame visually quiet so the component is what they are judging. Settings controls are a working form: label, current value, and the result in the frame. They are not a second marketing page.

Do not use the words green, red, Prism, Design Lab, or Caret. The product name is UI Library. The package name is `@ui-library/ui`.

## Done when

- The catalog lists Button, Input, Textarea, Checkbox, Switch, Badge, Link, and Settings, plus Home and Install.
- Each component is shown as an import from `@ui-library/ui`, with props and CSS variables limited to its contract.
- The storefront’s header does not change color when a preview setting changes.
- On the Settings page, one settings change updates every component in the frame that reads that variable, and nothing outside the frame.
- Import snippets match the contract in this prompt.
- No library component exists beyond those seven.
- No settings field exists beyond the `ThemeSettings` type in this prompt.
- There is no cart, price, login, or account.

## Development

This repository uses [Bun](https://bun.sh).

```sh
bun install
bun run dev
```

Production build:

```sh
bun run build
```
