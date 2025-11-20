export function LogoTitle({ variant }: { variant: "white" | "purple" }) {
    return (
      <span
        className={
          variant === "white"
            ? "text-white text-xl font-bold"
            : "text-purple-600 text-xl font-bold"
        }
      >
        ShopNest Admin
      </span>
    );
  }
  
  