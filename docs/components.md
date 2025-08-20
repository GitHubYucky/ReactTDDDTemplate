# CommonComponent

ボタンとかインプットとかの共通コンポーネントを用意してます

# Components

- Button
- Input
- Listbox

# How to Use

## Button

```tsx
import { Button } from "@/components/button/button";

<Button type="submit" disabled={disabled}>
  Search
</Button>;
```

## Input

```tsx
import { Input } from "@/components/input/input";
<Input
  type="text"
  placeholder="Search CoffeeTitle..."
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  disabled={disabled}
/>;
```

## Listbox

```tsx
<ListBox
  value={type}
  onChange={(e) => setType(e.target.value as "hot" | "iced")}
  disabled={disabled}
  className="w-full" // 横幅は親の200pxにフィット
>
  <option value="hot">hot</option>
  <option value="iced">iced</option>
</ListBox>
```
