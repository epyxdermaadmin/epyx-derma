import Link from "next/link";
import { brand, navigation } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div>
            <div className="brand-lockup">
              <span className="brand-lockup__mark" aria-hidden="true" />
              <span className="brand-lockup__text">
                <strong>{brand.name}</strong>
                <span>{brand.tagline}</span>
              </span>
            </div>
            <p>
              A dedicated skin-first digital brand for premium clinical,
              cosmetic, laser, and hair-restoration care.
            </p>
          </div>

          <div>
            <strong>Explore</strong>
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Connect</strong>
            <ul>
              <li>
                <a href={brand.phoneLink}>{brand.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </li>
              <li>{brand.address}</li>
              <li>{brand.hours}</li>
            </ul>
          </div>

          <div>
            <strong>Future ops</strong>
            <ul>
              <li>
                <Link href="/epyxdermaadmin">Admin route</Link>
              </li>
              <li>MongoDB bootstrap ready</li>
              <li>WhatsApp campaign architecture planned</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__legal">
          Copyright {new Date().getFullYear()} {brand.name}. Dermatology-only
          brand site starter with production-ready frontend foundations.
        </div>
      </div>
    </footer>
  );
}
