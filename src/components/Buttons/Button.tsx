import BaseButton, {
  ButtonProps as BaseButtonProps,
} from "@mui/material/Button";

type ButtonColorProps = BaseButtonProps["color"] | "neutral";

interface ButtonProps extends Omit<BaseButtonProps, "color"> {
  color?: ButtonColorProps;
}

export default function Button({
  children,
  color,
  ...otherProps
}: ButtonProps) {
  return (
    <BaseButton
      color={color !== "neutral" ? color : undefined}
      sx={
        color === "neutral"
          ? {
              backgroundColor: "#D8DCD6",
            }
          : undefined
      }
      {...otherProps}
    >
      {children}
    </BaseButton>
  );
}
