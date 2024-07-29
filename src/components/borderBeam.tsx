import { cn } from "@/lib/utils";

type BorderBeamProps = React.ComponentPropsWithoutRef<"div"> & {
  /**
   * The size of the beam
   * @default 300
   * @type number
   */
  size?: number;

  /**
   * The duration of the animation
   * @default 15
   * @type number
   */
  duration?: number;

  /**
   * The anchor point of the beam
   * @default 90
   * @type number
   */
  anchor?: number;

  /**
   * The width of the beam
   * @default 1.5
   * @type number
   */
  borderWidth?: number;

  /**
   * The starting color of the beam
   * @default "#ffaa40"
   * @type string
   */
  colorFrom?: string;

  /**
   * The ending color of the beam
   * @default "#9c40ff"
   * @type string
   */
  colorTo?: string;

  /**
   * The delay before the animation starts
   * @default 0
   * @type number
   */
  delay?: number;
};

export function BorderBeam(props: BorderBeamProps) {
  const {
    size = 300,
    duration = 15,
    anchor = 90,
    borderWidth = 1.5,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
    delay = 0,
  } = props;

  return (
    <div
      {...props}
      className={cn(
        "absolute inset-[0] rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect]",
        "[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam",
        "after:[animation-delay:var(--delay)]",
        "after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]",
        "after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        props.className
      )}
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `${-duration + delay}s`,
        } as React.CSSProperties
      }
    />
  );
}
