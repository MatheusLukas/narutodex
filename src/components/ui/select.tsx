"use client";

import { forwardRef } from "react";

import { Portal } from "@ark-ui/react/portal";
import { Select as SelectPrimitive } from "@ark-ui/react/select";
import { tv } from "mizuhara/utils";
import { Check, ChevronDown } from "lucide-react";

export const SelectStyles = {
  Trigger: tv({
    base: [
      "group flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background transition",
      "placeholder:text-muted-foreground",
      "focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-[invalid=true]:ring-destructive aria-[invalid=true]:border-destructive",
    ],
  }),
  Content: tv({
    base: [
      [
        "relative z-50 min-w-32 overflow-hidden rounded-md border border-border bg-background text-popover-foreground shadow-md outline-none",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
      ],
    ],
    variants: {
      popper: {
        true: [
          "max-h-[var(--radix-select-content-available-height)]",
          "data-[side=bottom]:translate-y-1",
          "data-[side=left]:-translate-x-1",
          "data-[side=right]:translate-x-1",
          "data-[side=top]:-translate-y-1",
        ],
      },
    },
  }),
  Viewport: tv({
    base: ["p-1"],
    variants: {
      popper: {
        true: [
          "h-[var(--radix-popper-available-height)] w-full min-w-[var(--radix-popper-anchor-width)]",
        ],
      },
    },
  }),
  Label: tv({
    base: [
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    ],
  }),
  Item: tv({
    base: [
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    ],
  }),
  Separator: tv({
    base: ["-mx-1 my-1 h-px bg-muted"],
  }),
};

export const SelectRoot = SelectPrimitive.Root;

export const SelectGroup = SelectPrimitive.ItemGroup;

SelectGroup.displayName = "Select.Group";

export type SelectTriggerProps = Omit<
  React.ComponentProps<typeof SelectPrimitive.Trigger>,
  "children"
> & {
  placeholder: string;
};

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, placeholder, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={SelectStyles.Trigger({ className })}
    {...props}
  >
    <SelectPrimitive.ValueText placeholder={placeholder} />
    <SelectPrimitive.Indicator asChild>
      <ChevronDown className="size-4 opacity-50 transition-transform duration-200 group-aria-expanded:rotate-180" />
    </SelectPrimitive.Indicator>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "Select.Trigger";

export const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <SelectPrimitive.Positioner>
      <SelectPrimitive.Content
        ref={ref}
        className={SelectStyles.Content({
          className,
        })}
        {...props}
      >
        <div className="p-1">{children}</div>
      </SelectPrimitive.Content>
    </SelectPrimitive.Positioner>
  </Portal>
));
SelectContent.displayName = "Select.Content";

export const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={SelectStyles.Label({ className })}
    {...props}
  />
));
SelectLabel.displayName = "Select.Label";

export type SelectItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  "children"
> & {
  children: React.ReactNode;
};

export const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={SelectStyles.Item({ className })}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center invisible data-[state=checked]:visible">
      <Check className="size-4" />
    </SelectPrimitive.ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "Select.Item";

export const Select = Object.assign(SelectRoot, {
  Control: SelectPrimitive.Control,
  Group: SelectGroup,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
});
