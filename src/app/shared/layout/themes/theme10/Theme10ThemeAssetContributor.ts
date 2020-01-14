import { IThemeAssetContributor } from '../ThemeAssetContributor';
import { AppConsts } from '@shared/AppConsts';

export class Theme10ThemeAssetContributor implements IThemeAssetContributor {
    getAssetUrls(): string[] {
        return [AppConsts.appBaseUrl + '/assets/fonts/fonts-asap-condensed.min.css'];
    }
}
