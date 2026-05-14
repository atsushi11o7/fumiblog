import { Copyright } from '@/components/molecules/Copyright';
import { SocialLinks, type SocialLink } from '@/components/molecules/SocialLinks';

export interface FooterProps {
  siteName?: string;
  year?: number;
  socialLinks?: SocialLink[];
  className?: string;
}

export function Footer({
  siteName = 'fumiblog',
  year,
  socialLinks,
  className = '',
}: FooterProps) {
  const buildSha = process.env.NEXT_PUBLIC_GIT_SHA ?? 'dev';

  return (
    <footer className={`border-t border-border px-6 py-8 ${className}`.trim()}>
      <div className="flex flex-col items-center text-center gap-4 md:flex-row md:justify-between md:items-center md:text-left max-w-5xl mx-auto w-full">
        <div className="flex flex-col items-center gap-1 md:flex-row md:flex-wrap md:items-center md:gap-x-4 md:gap-y-1">
          <Copyright siteName={siteName} year={year} />
          <span className="mono text-[11px] text-syntax-comment">
            <span className="text-cat-accent" aria-hidden="true">▶</span>
            {` build ${buildSha}`}
          </span>
        </div>
        <SocialLinks links={socialLinks} />
      </div>
    </footer>
  );
}
