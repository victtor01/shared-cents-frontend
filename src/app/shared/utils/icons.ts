export const ICONS = {
  HOME: 'home',
  MONEY: 'attach_money',
} satisfies Record<string, string>;

type IconKey = keyof typeof ICONS;

export function getIcon(icon?: string | null): string {
  if (icon && icon in ICONS) {
    return ICONS[icon as IconKey];
  }

  return ICONS['MONEY'];
}
