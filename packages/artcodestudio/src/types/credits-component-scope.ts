import type { ArtCodeCreditsComponent } from '../components/credits/credits.component'

export interface CreditsComponentScope {
  popupVisible: boolean;
  toggle: ArtCodeCreditsComponent['toggle'];
  align: 'bottom' | 'top' | 'left' | 'right';
  iconSrc: string;
}