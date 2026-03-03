// Constants for icon dimensions and positions
const ICON_SIZE = 20;
const LINE_HEIGHT = 2;
const LINE_GAP = 6;
const TOP_LINE_Y = 3;
const MIDDLE_LINE_Y = 9;
const BOTTOM_LINE_Y = 15;

export interface AnimatedMenuIconProps {
  /**
   * Whether the menu is open (X) or closed (hamburger)
   */
  isOpen: boolean;
  /**
   * Icon color (defaults to currentColor)
   */
  color?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function AnimatedMenuIcon({
  isOpen,
  color = 'currentColor',
  className = '',
}: AnimatedMenuIconProps) {
  return (
    <div className={className} style={{ position: 'relative', width: `${ICON_SIZE}px`, height: `${ICON_SIZE}px` }}>
      {/* Top line */}
      <span
        className="tt"
        style={{
          position: 'absolute',
          top: `${TOP_LINE_Y}px`,
          left: 0,
          width: '100%',
          height: `${LINE_HEIGHT}px`,
          backgroundColor: color,
          transformOrigin: 'center',
          transform: isOpen ? `translateY(${LINE_GAP}px) rotate(45deg)` : 'translateY(0) rotate(0)',
        }}
      />

      {/* Middle line */}
      <span
        className="tt"
        style={{
          position: 'absolute',
          top: `${MIDDLE_LINE_Y}px`,
          left: 0,
          width: '100%',
          height: `${LINE_HEIGHT}px`,
          backgroundColor: color,
          opacity: isOpen ? 0 : 1,
        }}
      />

      {/* Bottom line */}
      <span
        className="tt"
        style={{
          position: 'absolute',
          top: `${BOTTOM_LINE_Y}px`,
          left: 0,
          width: '100%',
          height: `${LINE_HEIGHT}px`,
          backgroundColor: color,
          transformOrigin: 'center',
          transform: isOpen ? `translateY(-${LINE_GAP}px) rotate(-45deg)` : 'translateY(0) rotate(0)',
        }}
      />
    </div>
  );
}
