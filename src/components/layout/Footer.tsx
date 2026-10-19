import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="py-8 text-center">
      <p className="text-accent text-sm italic">{site.footerText}</p>
    </footer>
  );
}
