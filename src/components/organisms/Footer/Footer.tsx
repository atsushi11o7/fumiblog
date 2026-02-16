import { Copyright } from '@/components/molecules/Copyright';
import { SocialLinks, type SocialLink } from '@/components/molecules/SocialLinks';

export interface FooterProps {
  /**
   * Site name for copyright
   */
  siteName?: string;
  /**
   * Year for copyright (defaults to current year)
   */
  year?: number;
  /**
   * Social media links
   */
  socialLinks?: SocialLink[];
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function Footer({
  siteName = 'FumiBlog',
  year,
  socialLinks,
  className = '',
}: FooterProps) {
  return (
    <footer className={`tt border-t border-border px-6 ${className}`.trim()}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1024px] mx-auto w-full">
        <Copyright siteName={siteName} year={year} />
        <SocialLinks links={socialLinks} />
      </div>
    </footer>
  );
}
