import { IThemeAssetContributor } from '../ThemeAssetContributor';
import { AppConsts } from '@shared/AppConsts';

export class Theme3ThemeAssetContributor implements IThemeAssetContributor {
    getAssetUrls(): string[] {
        return [AppConsts.appBaseUrl + '/assets/fonts/fonts-montserrat.min.css'];
    }
}
