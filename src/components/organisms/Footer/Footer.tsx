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
    <footer className={`tt border-t border-border ${className}`.trim()} style={{ padding: '24px' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Copyright siteName={siteName} year={year} />
        <SocialLinks links={socialLinks} />
      </div>
    </footer>
  );
}
