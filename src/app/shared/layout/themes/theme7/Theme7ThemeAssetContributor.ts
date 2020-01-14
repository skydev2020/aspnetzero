import { IThemeAssetContributor } from '../ThemeAssetContributor';
import { AppConsts } from '@shared/AppConsts';

export class Theme7ThemeAssetContributor implements IThemeAssetContributor {
    getAssetUrls(): string[] {
        return [AppConsts.appBaseUrl + '/assets/fonts/fonts-montserrat.min.css'];
    }
}
