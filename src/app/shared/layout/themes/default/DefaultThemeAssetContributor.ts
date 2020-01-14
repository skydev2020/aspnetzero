import { IThemeAssetContributor } from '../ThemeAssetContributor';
import { ThemeHelper } from '@app/shared/layout/themes/ThemeHelper';
import * as rtlDetect from 'rtl-detect';
import { AppConsts } from '@shared/AppConsts';

export class DefaultThemeAssetContributor implements IThemeAssetContributor {
    getAssetUrls(): string[] {
        let asideSkin = ThemeHelper.getAsideSkin();
        let headerSkin = ThemeHelper.getHeaderSkin();
        const isRtl = rtlDetect.isRtlLang(abp.localization.currentLanguage.name);

        return [
            AppConsts.appBaseUrl + '/assets/metronic/themes/default/css/skins/header/base/' + headerSkin + (isRtl ? '.rtl' : '') + '.min.css',
            AppConsts.appBaseUrl + '/assets/metronic/themes/default/css/skins/brand/' + asideSkin + (isRtl ? '.rtl' : '') + '.min.css',
            AppConsts.appBaseUrl + '/assets/metronic/themes/default/css/skins/aside/' + asideSkin + (isRtl ? '.rtl' : '') + '.min.css'
        ];
    }
}
