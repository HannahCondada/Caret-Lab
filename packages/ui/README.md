# @caret-lab/ui

Components and scoped theme settings for Caret Library. The storefront website is not part of this package.

## Install from another repository

This package is not on the public npm registry yet. After this repository is pushed, install that subdirectory from the other project:

```sh
pnpm add github:HannahCondada/Caret-Lab#path:/packages/ui
```

That reads `packages/ui` from [Caret-Lab](https://github.com/HannahCondada/Caret-Lab) and installs it as `@caret-lab/ui`. The other project needs React 19.

On the same machine, before anything is pushed, point pnpm at the folder:

```sh
pnpm add C:\Users\Hannah\Documents\GitHub\token-catalogue\packages\ui
```

## Use it

```tsx
import { Badge, Button, Input } from "@caret-lab/ui";
import "@caret-lab/ui/tokens.css";
import { ThemeScope, type ThemeSettings } from "@caret-lab/ui/settings";

const projectSettings: ThemeSettings = {
  /* values stored by this project */
};

export function App() {
  return (
    <ThemeScope settings={projectSettings}>
      <Button intent="positive">Save</Button>
      <Input label="Email" />
      <Badge intent="neutral">Draft</Badge>
    </ThemeScope>
  );
}
```

Import `tokens.css` once, at the application entry. Keep `ThemeSettings` in the consuming project and pass them to one `ThemeScope`.

## Publish to npm later

When the `@caret-lab` scope exists on npmjs.com:

```sh
cd packages/ui
pnpm publish --access public
```

After that, the other project can switch to `pnpm add @caret-lab/ui`.
