import { Copyright } from '@/components/molecules/Copyright';
import { SocialLinks, type SocialLink } from '@/components/molecules/SocialLinks';
import { LAYOUT } from '@/constants/layout';

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
    <footer className={`tt border-t border-border ${className}`.trim()} style={{ padding: LAYOUT.PADDING_X }}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4" style={{ maxWidth: LAYOUT.MAX_WIDTH, margin: '0 auto', width: '100%' }}>
        <Copyright siteName={siteName} year={year} />
        <SocialLinks links={socialLinks} />
      </div>
    </footer>
  );
}
