export const ICONS: Record<string, string> = {
  HOME: 'home',
  MONEY: 'attach_money',
} as const;

type IconKey = keyof typeof ICONS;

export function getIcon(icon?: string | null): string {
  if (icon && icon in ICONS) {
    return ICONS[icon as IconKey];
  }

  return ICONS['MONEY'];
}
