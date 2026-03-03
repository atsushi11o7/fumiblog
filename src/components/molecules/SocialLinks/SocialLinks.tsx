import Link from 'next/link';
import { SiX, SiGithub, SiInstagram } from 'react-icons/si';

export interface SocialLink {
  /**
   * Platform name
   */
  platform: 'x' | 'github' | 'instagram';
  /**
   * Link URL
   */
  href: string;
  /**
   * Aria label
   */
  ariaLabel?: string;
}

export interface SocialLinksProps {
  /**
   * SNSリンクの配列
   */
  links?: SocialLink[];
  /**
   * Additional CSS classes
   */
  className?: string;
}

const iconMap = {
  x: SiX,
  github: SiGithub,
  instagram: SiInstagram,
};

const defaultLinks: SocialLink[] = [
  { platform: 'x', href: 'https://x.com', ariaLabel: 'X' },
  { platform: 'github', href: 'https://github.com', ariaLabel: 'GitHub' },
  { platform: 'instagram', href: 'https://instagram.com', ariaLabel: 'Instagram' },
];

export function SocialLinks({ links = defaultLinks, className = '' }: SocialLinksProps) {
  return (
    <div className={`flex gap-4 ${className}`.trim()}>
      {links.map((link) => {
        const IconComponent = iconMap[link.platform];
        return (
          <Link
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="tt text-base text-secondary no-underline hover:text-foreground"
            aria-label={link.ariaLabel || link.platform}
          >
            <IconComponent />
          </Link>
        );
      })}
    </div>
  );
}
