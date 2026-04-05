import Link from "next/link";
import { brand, navigation } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/#story" className="brand-lockup" aria-label={`${brand.name} home`}>
          <span className="brand-lockup__mark" aria-hidden="true" />
          <span className="brand-lockup__text">
            <strong>{brand.name}</strong>
            <span>{brand.tagline}</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <div className="site-nav__links">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/#contact" className="site-nav__cta">
            Book now
          </Link>
        </nav>
      </div>
    </header>
  );
}
