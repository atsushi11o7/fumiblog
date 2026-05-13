import Image from 'next/image';
import { Github, Twitter } from 'lucide-react';

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'twitter';
}

export interface ProfileCardProps {
  name: string;
  handle?: string;
  bio: string;
  avatarSrc: string;
  links?: SocialLink[];
  className?: string;
}

const icons = {
  github: Github,
  twitter: Twitter,
};

export function ProfileCard({
  name,
  handle,
  bio,
  avatarSrc,
  links = [],
  className = '',
}: ProfileCardProps) {
  return (
    <div className={`bg-card border border-border rounded-md p-4 ${className}`.trim()}>
      <h3 className="mono text-[10px] uppercase tracking-widest text-syntax-comment mb-3">
        {'// profile'}
      </h3>
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={avatarSrc}
          alt={name}
          width={48}
          height={48}
          className="rounded-md object-cover border border-border"
          style={{ width: 48, height: 48 }}
        />
        <div>
          <p className="font-bold text-sm text-foreground leading-tight">{name}</p>
          {handle && (
            <p className="mono text-xs text-muted leading-tight mt-0.5">{handle}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-secondary mb-4 leading-relaxed">{bio}</p>

      {links.length > 0 && (
        <div className="flex gap-2">
          {links.map((link) => {
            const Icon = icons[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mono flex-1 inline-flex items-center justify-center gap-1.5 border border-border rounded-sm py-1.5 text-[11px] uppercase tracking-widest text-secondary hover:text-cat-accent hover:border-cat-accent transition-colors no-underline"
              >
                <Icon size={12} />
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
